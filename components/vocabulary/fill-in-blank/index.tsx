'use client'

import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { motion } from 'framer-motion'
import { Heart, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface Question {
	question: string
	correctAnswer: string
	options: string[]
}

const questions: Question[] = [
	{
		question: 'I ___ to the park every morning.',
		correctAnswer: 'go',
		options: ['go', 'goes', 'going'],
	},
	{
		question: 'She ___ a book right now.',
		correctAnswer: 'is reading',
		options: ['reads', 'is reading', 'read'],
	},
	{
		question: 'They ___ to the cinema yesterday.',
		correctAnswer: 'went',
		options: ['go', 'went', 'going'],
	},
	{
		question: 'We ___ a new project at work.',
		correctAnswer: 'started',
		options: ['start', 'starts', 'started'],
	},
	{
		question: 'My brother ___ very fast.',
		correctAnswer: 'runs',
		options: ['run', 'runs', 'running'],
	},
	{
		question: 'I ___ to music every day.',
		correctAnswer: 'listen',
		options: ['listens', 'listen', 'listening'],
	},
	{
		question: 'He ___ in New York.',
		correctAnswer: 'lives',
		options: ['live', 'lives', 'living'],
	},
	{
		question: 'She ___ like coffee.',
		correctAnswer: 'does',
		options: ['does', 'do', 'did'],
	},
	{
		question: 'We ___ the meeting at 3 PM.',
		correctAnswer: 'will start',
		options: ['will starts', 'will start', 'start'],
	},
	{
		question: 'I ___ home at 7 PM.',
		correctAnswer: 'arrive',
		options: ['arrives', 'arrived', 'arrive'],
	},
]

export default function Fillinblank() {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [selectedOption, setSelectedOption] = useState<string | null>(null)
	const [status, setStatus] = useState<'correct' | 'incorrect' | null>(null)
	const [score, setScore] = useState(5)
	const [gameOver, setGameOver] = useState(false)
	const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
	const [progress, setProgress] = useState(0)

	const currentQuestion = questions[currentQuestionIndex]

	const handleCheckAnswer = () => {
		if (selectedOption) {
			const isCorrect = selectedOption === currentQuestion.correctAnswer
			setStatus(isCorrect ? 'correct' : 'incorrect')
			if (isCorrect) {
				setCorrectAnswersCount(prev => prev + 1)
			} else {
				setScore(prev => {
					const newScore = Math.max(prev - 1, 0)
					if (newScore === 0) setGameOver(true)
					return newScore
				})
			}
		}
	}

	const handleNextQuestion = () => {
		setSelectedOption(null)
		setStatus(null)
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(prev => {
				const nextIndex = prev + 1
				setProgress(((nextIndex + 1) / questions.length) * 100)
				return nextIndex
			})
		} else {
			setGameOver(true)
		}
	}

	const handleRestartQuiz = () => {
		setCurrentQuestionIndex(0)
		setScore(5)
		setSelectedOption(null)
		setStatus(null)
		setGameOver(false)
		setCorrectAnswersCount(0)
		setProgress(0)
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className='min-h-screen flex items-center justify-center px-4 sm:px-6'
		>
			<div className='w-full max-w-4xl'>
				<CardContent className='p-6'>
					<div className='flex items-center gap-2 mb-6'>
						<Link href='/dashboard/vocabulary'>
							<X className='h-6 w-6 text-gray-200 hover:text-primary' />
						</Link>
						<Progress value={progress} className='h-3 bg-pink-100 flex-1' />
						<div className='flex items-center space-x-1'>
							<Heart className='h-4 w-4 text-primary' />
							<span>{score}</span>
						</div>
					</div>
					{gameOver ? (
						<div className='text-center mt-16'>
							<h2 className='text-xl sm:text-3xl font-bold'>Game Over</h2>
							<p className='text-lg mt-4'>
								Final Score:{' '}
								<span className='font-bold text-blue-600'>{score}</span>
							</p>
							<p className='text-md mt-2'>
								Correct Answers:{' '}
								<span className='font-bold text-blue-600'>
									{correctAnswersCount}
								</span>
								/{questions.length}
							</p>
							<Button
								onClick={handleRestartQuiz}
								className='mt-6 w-40 py-2 rounded-lg bg-purple-600 text-white'
							>
								Restart Quiz
							</Button>
						</div>
					) : (
						<div className='relative w-full max-w-4xl border-2 rounded-lg shadow-md p-6 mt-16'>
							<h2 className='text-xl sm:text-3xl font-bold mb-6'>
								Fill in the blank
							</h2>
							<p className='text-lg sm:text-2xl mb-6 mt-12'>
								{currentQuestion.question.split('___').map((part, index) => (
									<span key={index}>
										{part}
										{index <
											currentQuestion.question.split('___').length - 1 && (
												<span className='underline decoration-dashed'>
													{selectedOption || '___'}
												</span>
											)}
									</span>
								))}
							</p>
							<div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
								{currentQuestion.options.map((option, index) => (
									<Button
										key={index}
										onClick={() => setSelectedOption(option)}
										className={`  ${selectedOption === option
											? 'border-blue-400 text-blue-400 bg-blue-50 hover:bg-blue-50'
											: 'bg-white hover:bg-gray-50 text-gray-800 border-gray-300'
											}`}
									>
										{option}
									</Button>
								))}
							</div>
						</div>
					)}
				</CardContent>

				<div className='flex flex-col sm:flex-row items-center p-4 sm:p-6 max-w-4xl justify-between bottom-0 left-0 w-full text-lg sm:text-xl rounded-lg'>
					<div className='flex mb-4 sm:mb-0'>
						{!gameOver && status === 'correct' ? (
							<p className='text-green-600'>✅ Well done!</p>
						) : !gameOver && status === 'incorrect' ? (
							<p className='text-red-600'>
								<X /> Correct Answer: {currentQuestion.correctAnswer}
							</p>
						) : null}
					</div>
					{!gameOver && (
						<Button
							onClick={status === null ? handleCheckAnswer : handleNextQuestion}
							className={`w-full md:max-w-28 text-lg text-white font-semibold transition-colors duration-200 border-b-4 ${status
								? status === 'correct'
									? 'bg-green-500 hover:bg-green-600 border-green-700'
									: 'bg-red-500 hover:bg-red-600 border-red-700'
								: 'bg-pink-500 hover:bg-pink-600 border-pink-700'
								}`}
						>
							{status === null ? 'CHECK' : 'NEXT'}
						</Button>
					)}
				</div>
			</div>
		</motion.div>
	)
}
