'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import useTTS from '@/hooks/useTTS'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCheck, Heart, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ImageSelection } from '@/types'
import CelebrationDialog from '../celebration-dialog'

type WordImageProps = {
	quizData: ImageSelection[]
	onViewed: (itemId: number) => void
	slug: string
}

export default function WordImage({
	quizData,
	onViewed,
	slug,
}: WordImageProps) {
	const { handleNormalSpeech } = useTTS()
	const [currentStep, setCurrentStep] = useState(0)
	const [selected, setSelected] = useState<string | null>(null)
	const [progress, setProgress] = useState(0)
	const [result, setResult] = useState<{
		message: string
		isCorrect: boolean
	} | null>(null)
	const [hearts, setHearts] = useState(5)
	const [isChecked, setIsChecked] = useState(false)
	const [showCongratulations, setShowCongratulations] = useState(false)
	const audioRef = useRef<HTMLAudioElement | null>(null)

	const handleSelectAndSpeak = (
		event: React.MouseEvent<HTMLButtonElement>,
		id: string,
		label: string
	) => {
		setSelected(id)
		setResult(null)
		setIsChecked(false)
		handleNormalSpeech(event, label)
	}

	const handleCheck = useCallback(() => {
		if (selected) {
			const isCorrect = selected === quizData[currentStep].correct

			if (!audioRef.current) {
				audioRef.current = new Audio()
			}

			const audioSrc = isCorrect ? '/sounds/success.mp3' : '/sounds/lose.mp3'
			audioRef.current.src = audioSrc
			audioRef.current.volume = 1.0
			audioRef.current.pause()
			audioRef.current.currentTime = 0
			audioRef.current.play()

			setResult({
				message: isCorrect ? 'Amazing!' : 'Incorrect. Try again.',
				isCorrect,
			})
			setIsChecked(true)

			if (!isCorrect) {
				setHearts(prev => Math.max(0, prev - 1))
			}
		}
	}, [selected, quizData, currentStep]) // Dependencies of handleCheck

	const handleContinue = useCallback(() => {
		if (result?.isCorrect) {
			setProgress(prev =>
				Math.min(100, Math.round((prev + 100 / quizData.length) * 100) / 100)
			)

			onViewed(quizData[currentStep].id)

			if (currentStep < quizData.length - 1) {
				setCurrentStep(prev => prev + 1)
				setResult(null)
			} else {
				setResult({
					message: "Congratulations! You've completed the quiz.",
					isCorrect: true,
				})
				setShowCongratulations(true)
			}
		} else if (hearts <= 1) {
			setResult({
				message: "You've run out of hearts! Starting over.",
				isCorrect: false,
			})
			resetQuiz()
		}
		setSelected(null)
		setIsChecked(false)
	}, [result, hearts, quizData, currentStep, onViewed])

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				if (!isChecked) {
					handleCheck()
				} else {
					handleContinue()
				}
			}
		}

		// Add keydown event listener
		window.addEventListener('keydown', handleKeyPress)

		// Remove keydown event listener
		return () => {
			window.removeEventListener('keydown', handleKeyPress)
		}
	}, [
		isChecked,
		selected,
		quizData,
		currentStep,
		hearts,
		result,
		handleCheck,
		handleContinue,
	])

	const resetQuiz = () => {
		setCurrentStep(0)
		setProgress(0)
		setHearts(5)
		setSelected(null)
		setResult(null)
		setIsChecked(false)
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className='w-full h-full'
		>
			<CelebrationDialog
				isOpen={showCongratulations}
				onClose={() => setShowCongratulations(false)}
			/>

			<Card className='w-full min-h-[645px] overflow-hidden flex flex-col justify-between p-0 rounded-none shadow-none border-none'>
				<div className='flex flex-row items-center gap-2 w-full px-3 xl:px-0 lg:max-w-5xl mx-auto'>
					<div className='flex items-center gap-2'>
						<Link
							href={`/dashboard/vocabulary/${slug}`}
							aria-label='Go back to vocabulary page'
						>
							<X className='h-6 w-6 text-gray-200 hover:text-primary hover:text-gray-400 transition-all' />
						</Link>
					</div>

					<Progress
						value={progress}
						className={cn('h-3 bg-pink-100', {
							'bg-pink-200': progress > 0,
						})}
						aria-label={`Quiz progress: ${progress}%`}
					/>

					<div className='flex items-center justify-end space-x-1'>
						<Heart
							className='h-4 w-4 fill-primary text-primary'
							aria-hidden='true'
						/>
						{hearts > 0 && <span className='text-primary'>{hearts}</span>}
					</div>
				</div>

				<CardContent className='p-3 md:p-6'>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						className='space-y-6'
					>
						<div className='max-w-2xl mx-auto space-y-4'>
							<Badge
								variant='secondary'
								className='text-xs font-semibold bg-pink-200 text-pink-700'
							>
								NEW WORD
							</Badge>

							<h1 className='text-wrap text-2xl md:text-3xl font-bold text-gray-800 dark:text-white'>
								{quizData[currentStep].question} {' <<'}
								{quizData[currentStep].word}
								{'>>'}
							</h1>

							<div
								className='grid md:grid-cols-3 gap-4'
								role='group'
								aria-label='Answer options'
							>
								<AnimatePresence mode='wait'>
									{quizData[currentStep].options.map(option => (
										<motion.div
											key={option.id}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -20 }}
											transition={{ duration: 0.2 }}
										>
											<Button
												variant='outline'
												className={cn(
													'w-full h-auto aspect-square p-4 flex flex-col border-2 hover:bg-pink-50 dark:bg-black/40 items-center justify-center gap-2 transition-all duration-200 rounded-lg',
													{
														'border-pink-500 border-b-4 text-pink-500':
															selected === option.id && !result?.isCorrect,
														'border-gray-200 border-b-4 text-gray-700':
															selected !== option.id && !result?.isCorrect,
														'border-green-500 border-b-4 text-green-500':
															selected === option.id && result?.isCorrect,
													}
												)}
												onClick={e =>
													handleSelectAndSpeak(e, option.id, option.label)
												}
												aria-label={`Select ${option.label}`}
												aria-pressed={selected === option.id}
											>
												<div className='relative w-full aspect-square'>
													<Image
														src={option.image}
														alt={option.label}
														fill
														sizes='(max-width: 768px) 50vw, 25vw'
														className='rounded-md object-cover'
													/>
												</div>
												<span className='text-base font-medium'>
													{option.label.toLowerCase()}
												</span>
											</Button>
										</motion.div>
									))}
								</AnimatePresence>
							</div>
						</div>
					</motion.div>
				</CardContent>

				<CardFooter
					className={`p-0 pb-3 px-3 xl:px-0 md:pb-0 md:h-24 ${
						result?.isCorrect ? 'bg-green-500/20' : 'bg-primary/20'
					} ${isChecked ? '' : 'bg-transparent'}`}
				>
					<div
						className={`w-full lg:max-w-5xl mx-auto flex flex-col md:flex-row items-center ${
							result?.isCorrect ? 'justify-between' : 'justify-end'
						}`}
					>
						{result && (
							<Alert className='w-full flex items-center border-none bg-transparent'>
								<AlertTitle
									className={`mb-0 p-2 flex items-center justify-center rounded-full ${
										result.isCorrect ? 'bg-green-600' : 'bg-pink-600'
									}`}
								>
									{result.isCorrect ? (
										<CheckCheck className='h-10 w-10 text-white' />
									) : (
										<X className='h-10 w-10 text-white' />
									)}
								</AlertTitle>
								<AlertDescription
									className={`text-lg font-bold ml-1 ${
										result.isCorrect ? 'text-green-600' : 'text-pink-600'
									}`}
								>
									{result.message}
								</AlertDescription>
							</Alert>
						)}
						<Button
							disabled={!selected && !isChecked}
							variant={result?.isCorrect ? 'secondary' : 'primary'}
							className='w-full md:max-w-28 text-lg text-white font-semibold transition-colors duration-200'
							onClick={isChecked ? handleContinue : handleCheck}
						>
							{isChecked ? 'Continue' : 'Check'}
						</Button>
					</div>
				</CardFooter>
			</Card>
		</motion.div>
	)
}
