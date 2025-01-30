'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardFooter } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { FillInBlank } from '@/types'
import { motion } from 'framer-motion'
import { CheckCheck, Heart, X } from 'lucide-react'
import Link from 'next/link'
import Celebration from '../celebration'
import { useState } from 'react'


type FillInBlankProps = {
	questions: FillInBlank[]
	onViewed: (itemId: number) => void
	slug: string
}

export default function FillInBlankQuiz({
	questions,
	onViewed,
	slug,
}: FillInBlankProps) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
	const [isChecked, setIsChecked] = useState(false)
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
	const [hearts, setHearts] = useState(5)
	const [progress, setProgress] = useState(0)
	const [showCongratulations, setShowCongratulations] = useState(false)

	const currentQuestion = questions[currentIndex]

	const handleCheckAnswer = () => {
		if (selectedAnswer) {
			const correct = selectedAnswer === currentQuestion.correctAnswer
			setIsCorrect(correct)
			setIsChecked(true)

			if (!correct) {
				setHearts(prev => Math.max(prev - 1, 0))
			}
		}
	}


	const handleNextQuestion = () => {
		onViewed(currentQuestion.id)
		setSelectedAnswer(null)
		setIsChecked(false)
		setIsCorrect(null)

		if (currentIndex < questions.length - 1) {
			setCurrentIndex(prev => {
				const nextIndex = prev + 1
				setProgress(() => (nextIndex / questions.length) * 100)
				return nextIndex
			})
		} else {
			setProgress(100)
			setShowCongratulations(true)
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>{showCongratulations ? (
			<Celebration onOpen={showCongratulations} slug={slug} />
		) : (
			<Card className='p-0 border-none shadow-none rounded-none'>
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

				<div className='relative w-full lg:max-w-3xl mx-auto md:pt-16 p-4'>
					<h2 className='text-xl sm:text-3xl font-bold mb-4 text-gray-800 dark:text-white'>
						Fill in the blank
					</h2>
					<p className='text-lg sm:text-2xl mb-6 text-gray-800 dark:text-white'>
						{currentQuestion.question.split('___').map((part, index) => (
							<span key={index}>
								{part}
								{index < currentQuestion.question.split('___').length - 1 && (
									<span className='underline decoration-dashed'>
										{selectedAnswer || '___'}
									</span>
								)}
							</span>
						))}
					</p>
					<div className='grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-5'>
						{currentQuestion.options.map((option, index) => (
							<Button
								key={index}
								onClick={() => setSelectedAnswer(option)}
								className={
									selectedAnswer === option
										? 'border-blue-400 text-blue-400 bg-blue-50 hover:bg-blue-50'
										: 'bg-white hover:bg-gray-50 text-gray-800 border-gray-300'
								}
							>
								{option}
							</Button>
						))}
					</div>
				</div>

				<CardFooter
					className={`absolute bottom-0 left-0 right-0 py-3 px-3 xl:px-0 md:pb-0 md:h-24 border-t ${
						isCorrect ? 'bg-green-500/20' : 'bg-primary/20'
					}`}
				>
					<div
						className={`w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center ${
							isChecked ? 'justify-between' : 'justify-end'
						}`}
					>
						{isChecked && (
							<Alert className='w-full flex items-center border-none bg-transparent'>
								<AlertTitle
									className={`p-2 rounded-full ${
										isCorrect ? 'bg-green-600' : 'bg-pink-600'
									}`}
								>
									{isCorrect ? (
										<CheckCheck className='h-10 w-10 text-white' />
									) : (
										<X className='h-10 w-10 text-white' />
									)}
								</AlertTitle>
								<AlertDescription
									className={`text-lg font-bold ml-1 ${
										isCorrect ? 'text-green-600' : 'text-pink-600'
									}`}
								>
									{isCorrect ? 'Correct!' : 'Incorrect!'}
								</AlertDescription>
							</Alert>
						)}
						<Button
							onClick={isChecked ? handleNextQuestion : handleCheckAnswer}
							className='text-lg font-semibold w-full md:w-auto'
							disabled={!selectedAnswer && !isChecked}
							variant={isChecked ? 'secondary' : 'primary'}
						>
							{isChecked ? 'Continue' : 'Check'}
						</Button>
					</div>
				</CardFooter>
			</Card>
		)}
			
		</motion.div>
	)
}
