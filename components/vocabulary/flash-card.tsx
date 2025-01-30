'use client'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import useTTS from '@/hooks/useTTS'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Snail, Volume2, X } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import Celebration from './celebration'

type FlashcardProps = {
	cardData: {
		id: number
		front_side: string
		back_side: string
		viewed: boolean
	}[]
	onViewed: (itemId: number) => void
	slug: string
}

const Flashcard = ({
	cardData,
	onViewed,
	slug,
}: FlashcardProps) => {
	const { handleNormalSpeech, handleSlowSpeech } = useTTS()
	const [isFlipped, setIsFlipped] = useState(false)
	const [isAnimating, setIsAnimating] = useState(false)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [progress, setProgress] = useState(0)

	const [showConfetti, setShowConfetti] = useState(false)
	const [showCongratulations, setShowCongratulations] = useState(false)
	const soundRef = useRef<HTMLAudioElement | null>(null)

	const total = cardData.length
	const currentCard = cardData[currentIndex]
	const [cardBack, setCardBack] = useState(currentCard.back_side)

	
	
	// Delay changing the card back by 150ms to allow the flip animation to complete
	useEffect(() => {
		setTimeout(() => {
			setCardBack(currentCard.back_side)
		}, 150)

		// Mark the current card as viewed
		if (!currentCard.viewed) {
			onViewed(currentCard.id)
		}

		// Update progress
		const viewedCount = cardData.filter(card => card.viewed).length
		setProgress((viewedCount / total) * 100)
	}, [currentCard, onViewed, cardData, total])


	useEffect(() => {
		if (progress === 100 && !showConfetti) {
			setShowConfetti(true)

			if (!soundRef.current) {
				soundRef.current = new Audio('/sounds/congratulations.mp3')
				soundRef.current.volume = 1.0
			}

			soundRef.current.play()
		}
	}, [progress, showConfetti])

	// Flip card
	const handleFlip = useCallback(() => {
		if (!isAnimating) {
			setIsAnimating(true)
			setIsFlipped(prev => !prev)
		}
	}, [isAnimating])

	// Next card
	const handleNext = useCallback(() => {
		if (currentIndex === total - 2 || currentIndex > total - 2) {
			setCurrentIndex(total - 1)
			setProgress(100)
		} else if (currentIndex < total - 1) {
			setCurrentIndex(prev => prev + 1)
			setProgress(prev => prev + 100 / (total - 1))
		}
		if (currentIndex !== total - 1) {
			setIsFlipped(false)
	} else {
		setShowCongratulations(true)
	}
	}, [currentIndex, total])

	// Previous card
	const handleBack = useCallback(() => {
		if (currentIndex === 1 || currentIndex < 1) {
			setCurrentIndex(0)
			setProgress(0)
		} else if (currentIndex > 0) {
			setCurrentIndex(prev => prev - 1)
			setProgress(prev => prev - 100 / (total - 1))
		}
		if (currentIndex !== 0) {
			setIsFlipped(false)
		}
	}, [currentIndex, total])

	// Keyboard shortcuts
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			switch (event.key) {
				case 'ArrowRight':
					handleNext()
					break
				case 'ArrowLeft':
					handleBack()
					break
				case ' ':
					event.preventDefault()
					handleFlip()
					break
				default:
					break
			}
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [currentIndex, handleBack, handleFlip, handleNext])

	return (
		<div className='flex flex-col items-center justify-center space-y-4'>
			{showConfetti && <Confetti />}

			<div
				className='flip-card w-full h-[328px] max-w-[816px] sm:h-[428px]'
				onClick={handleFlip}
			>
				{/* Flashcard */}
				<motion.div
					className='flip-card-inner w-[100%] h-[100%] cursor-pointer'
					initial={false}
					animate={{ rotateX: isFlipped ? 180 : 360 }}
					transition={{
						duration: 0.1,
						type: 'tween',
						animationDirection: 'normal',
					}}
					onAnimationComplete={() => setIsAnimating(false)}
				>
					<div className='flip-card-front w-[100%] h-[100%] bg-zinc-800 rounded-lg p-4 flex justify-center items-center'>
						<div className='absolute top-4 right-4 flex gap-4'>
		<>
			{showCongratulations ? (
				<Celebration onOpen={showCongratulations} slug={slug} />
			) : (
				<div className='flex flex-col items-center justify-center space-y-4'>
					{/* Progress Bar */}
					<div className='flex flex-row items-center gap-2 w-full lg:px-3 xl:px-0 lg:max-w-5xl mx-auto'>
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
					</div>

					<div
						className='flip-card w-full h-[328px] max-[426px]:h-72 max-w-[300px] md:max-w-[500px] lg:max-w-[816px] lg:h-[428px]'
						onClick={handleFlip}
					>
						{/* Flashcard */}
						<motion.div
							className='flip-card-inner w-[100%] h-[100%] cursor-pointer'
							initial={false}
							animate={{ rotateX: isFlipped ? 180 : 360 }}
							transition={{
								duration: 0.1,
								type: 'tween',
								animationDirection: 'normal',
							}}
							onAnimationComplete={() => setIsAnimating(false)}
						>
							<div className='flip-card-front w-[100%] h-[100%] bg-zinc-800 rounded-lg p-4 flex justify-center items-center'>
								<div className='absolute top-4 right-4 flex gap-4'>
									<Button
										size='icon'
										onClick={evt =>
											handleNormalSpeech(evt, currentCard.front_side)
										}
									>
										<Volume2 />
									</Button>
									<Button
										size='icon'
										onClick={evt =>
											handleSlowSpeech(evt, currentCard.front_side)
										}
									>
										<Snail />
									</Button>
								</div>
								<div className='text-3xl sm:text-4xl text-white'>
									{currentCard.front_side}
								</div>
							</div>
							<div className='flip-card-back w-[100%] h-[100%] bg-zinc-800 rounded-lg p-4 flex justify-center items-center'>
								<div className='text-3xl text-center sm:text-4xl text-white'>
									{cardBack}
								</div>
							</div>
						</motion.div>
					</div>

					{/* Flashcard Controls */}
					<div className='w-full h-full flex justify-center items-center font-semibold'>
						<div className='relative flex justify-center items-center gap-28'>
							{/* Back */}
							<Button
								variant='default'
								size='lg'
								onClick={() => handleBack()}
								disabled={currentIndex === 0}
								className='bg-slate-900 hover:bg-slate-800 text-neutral-400 hover:text-neutral-100 px-4 size-14 rounded-full custom-transition disabled:opacity-50'
							>
								<ArrowLeft className='size-6' />
							</Button>
							<div className='absolute'>
								{currentIndex + 1} / {cardData.length}
							</div>
							{/* Next */}
							<Button
								variant='ghost'
								size='lg'
								onClick={() => handleNext()}
								// disabled={currentIndex === total - 1}
								className='bg-slate-900 hover:bg-slate-800 text-neutral-400 hover:text-neutral-100 px-4 size-14 rounded-full custom-transition disabled:opacity-50'
							>
								<ArrowRight className='size-6' />
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Flashcard
