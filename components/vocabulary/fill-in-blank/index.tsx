'use client'

import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { FillInBlank } from '@/types'
import { Heart, Import, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { congratulationIconsData } from '@/constants/congratulationIcons'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type FillInBlankProps = {
	questions: FillInBlank[]
	onViewed: (itemId: number) => void
	slug: string
}

export default function Fillinblank({
	questions,
	onViewed,
	slug,
}: FillInBlankProps) {
	const router = useRouter()

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [selectedOption, setSelectedOption] = useState<string | null>(null)
	const [status, setStatus] = useState<'correct' | 'incorrect' | null>(null)
	const [score, setScore] = useState(5)
	const [gameOver, setGameOver] = useState(false)
	const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
	const [progress, setProgress] = useState(0)
	const [showCongratulations, setShowCongratulations] = useState(false)

	// Audio refs
	const successAudioRef = useRef<HTMLAudioElement | null>(null)
	const loseAudioRef = useRef<HTMLAudioElement | null>(null)
	const optionClickAudioRef = useRef<HTMLAudioElement | null>(null)
	const buttonClickAudioRef = useRef<HTMLAudioElement | null>(null)

	const currentQuestion = questions[currentQuestionIndex]

	// Initialize audio
	useEffect(() => {
		successAudioRef.current = new Audio('/sounds/success.mp3')
		loseAudioRef.current = new Audio('/sounds/lose.mp3')
		optionClickAudioRef.current = new Audio('/sounds/click.mp3')
		buttonClickAudioRef.current = new Audio('/sounds/button.mp3')

		return () => {
			successAudioRef.current = null
			loseAudioRef.current = null
			optionClickAudioRef.current = null
			buttonClickAudioRef.current = null
		}
	}, [])

	const handleOptionClick = (option: string) => {
		setSelectedOption(option)
		optionClickAudioRef.current?.play()
	}

	const handleCheckAnswer = () => {
		buttonClickAudioRef.current?.play()

		if (selectedOption) {
			const isCorrect = selectedOption === currentQuestion.correctAnswer
			setStatus(isCorrect ? 'correct' : 'incorrect')

			if (isCorrect) {
				successAudioRef.current?.play()
				setCorrectAnswersCount(prev => prev + 1)
			} else {
				loseAudioRef.current?.play()
				setScore(prev => {
					const newScore = Math.max(prev - 1, 0)
					if (newScore === 0) setGameOver(true)
					return newScore
				})
			}
		}
	}

	const handleNextQuestion = () => {
		buttonClickAudioRef.current?.play()

		setSelectedOption(null)
		onViewed(currentQuestion.id)
		setStatus(null)

		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(prev => {
				const nextIndex = prev + 1
				setProgress(((nextIndex + 1) / questions.length) * 100)
				setShowCongratulations(true)
				return nextIndex
			})
		} else {
			setGameOver(true)
		}
	}

	const handleStart = () => {
		buttonClickAudioRef.current?.play()

		setCurrentQuestionIndex(0)
		setScore(5)
		setSelectedOption(null)
		setStatus(null)
		setGameOver(false)
		setCorrectAnswersCount(0)
		setProgress(0)
	}

	const setGameState = (state: 'end') => {
		if (state === 'end') {
			setGameOver(true)
			router.push(`/dashboard/vocabulary/${slug}`)
		}
	}

	function getRandomIcon() {
		const randomIndex = Math.floor(
			Math.random() * congratulationIconsData.length
		)
		return congratulationIconsData[randomIndex].svgIcon
	}

	const randomIcon = getRandomIcon()

	return (
		<div className='min-w-full p-0 m-0 flex'>
			

			<div className='min-w-full p-0 m-0 flex justify-betwen  flex-col'>
				<CardContent className='w-full flex justify-center items-center flex-col'>
					<div className='flex items-center w-full'>
						<Link href={`/dashboard/vocabulary/${slug}`}>
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
							<Image
								src={randomIcon}
								alt='Random Icon'
								width={300}
								height={400}
							/>
						</div>
					) : (
						<div className='relative items-center w-full lg:max-w-3xl rounded-lg p-8 mt-12'>
							<h2 className='text-xl sm:text-3xl font-bold mb-6'>
								Fill in the blank
							</h2>

							<p className='text-lg sm:text-2xl mb-10 mt-8'>
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

							<div className='grid items-center sm:w-[80%] grid-cols-1 sm:grid-cols-3 sm:mt-12 gap-5'>
								{currentQuestion.options.map((option, index) => (
									<Button
										key={index}
										onClick={() => handleOptionClick(option)}
										className={`${
											selectedOption === option
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

				<div
					className={`w-full h-28 absolute bottom-0 left-0 flex justify-center items-center border-t-2 border-t-gray-300 ${
						status === 'correct'
							? 'bg-green-200'
							: status === 'incorrect'
							? 'bg-pink-200'
							: gameOver
							? 'border-t-2 border-gray-300'
							: 'bg-white dark:bg-zinc-950'
					}`}
				>
					<div className='w-[90%] sm:w-[70%] flex justify-between items-center'>
						{/* Left Side: Icon and Text */}
						{(status === 'correct' || status === 'incorrect') && !gameOver && (
							<div className='flex justify-center items-center gap-3 sm:gap-5'>
								<div className='w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-full bg-white flex justify-center items-center p-2'>
									{status === 'correct' ? (
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='48'
											height='48'
											viewBox='0 0 48 48'
										>
											<path
												fill='rgba(88,204,2,255)'
												d='M40.6 12.1L17 35.7 7.4 26.1 4.6 29 17 41.3 43.4 14.9z'
											></path>
										</svg>
									) : (
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='48'
											height='48'
											viewBox='0 0 48 48'
										>
											<path
												fill='#ec4899'
												d='M21.5 4.5H26.501V43.5H21.5z'
												transform='rotate(45.001 24 24)'
											></path>
											<path
												fill='#ec4899'
												d='M21.5 4.5H26.5V43.501H21.5z'
												transform='rotate(135.008 24 24)'
											></path>
										</svg>
									)}
								</div>
								<span
									className={`text-base xl:text-xl sm:text-2xl font-bold ${
										status === 'correct' ? 'text-green-500' : 'text-pink-500'
									}`}
								>
									{status === 'correct'
										? 'Great!'
										: `Starting over. Correct Answer: ${currentQuestion.correctAnswer}`}
								</span>
							</div>
						)}

						{/* Buttons */}
						{gameOver ? (
							<>
								<Button
									variant='secondary'
									onClick={handleStart}
									className='bg-blue-400 hover:bg-blue-400 text-white px-4 py-2 border-blue-600'
								>
									Train some more
								</Button>
								<Button
									variant='secondary'
									onClick={() => setGameState('end')}
									className='bg-green-500 text-white px-4 py-2'
								>
									Finish
								</Button>
							</>
						) : (
							<Button
								variant='secondary'
								onClick={
									status === null ? handleCheckAnswer : handleNextQuestion
								}
								className={`ml-auto block bg-${
									status === 'correct'
										? 'green'
										: status === 'incorrect'
										? 'pink'
										: 'blue'
								}-500 hover:bg-${
									status === 'correct'
										? 'green'
										: status === 'incorrect'
										? 'pink'
										: 'blue'
								}-600 text-white px-4 py-2 border-${
									status === 'correct'
										? 'green'
										: status === 'incorrect'
										? 'pink'
										: 'blue'
								}-700`}
							>
								{status === null ? 'CHECK' : 'CONTINUE'}
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
