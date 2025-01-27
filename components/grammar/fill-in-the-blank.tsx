'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle } from 'lucide-react'

interface Question {
	id: number
	question: string
	answer: string
	options: string[]
}

export default function FillInTheBlankGame({
	questions,
}: {
	questions: Question[]
}) {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [selectedOption, setSelectedOption] = useState('')
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
	const [gameCompleted, setGameCompleted] = useState(false)
	const [isOpen, setIsOpen] = useState('active')
	const audioRef = useRef<HTMLAudioElement | null>(null)

	const handleOptionChange = (value: string) => {
		setSelectedOption(value)
	}

	const checkAnswer = useCallback(() => {
		const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase()
		const isAnswerCorrect = selectedOption.toLowerCase() === correctAnswer
		setIsCorrect(isAnswerCorrect)

		// Play audio feedback
		if (!audioRef.current) {
			audioRef.current = new Audio()
		}
		const audioSrc = isAnswerCorrect
			? '/sounds/success.mp3'
			: '/sounds/lose.mp3'
		audioRef.current.src = audioSrc
		audioRef.current.volume = 1.0
		audioRef.current.pause()
		audioRef.current.currentTime = 0
		audioRef.current.play()
	}, [questions, currentQuestionIndex, selectedOption])

	const goToNextQuestion = useCallback(() => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(prev => prev + 1)
			setSelectedOption('')
			setIsCorrect(null)
		} else {
			setGameCompleted(true)
		}
	}, [currentQuestionIndex, questions.length])

	const renderQuestionWithUnderline = () => {
		const { question } = questions[currentQuestionIndex]
		return (
			<>
				{question.split('__')[0]}
				<span
					className={`underline decoration-clone font-semibold ${
						selectedOption ? 'decoration-gray-800' : 'decoration-transparent'
					}`}
				>
					{selectedOption || '____'}
				</span>
				{question.split('___')[1]}
			</>
		)
	}

	// Add keyboard shortcuts
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				if (isCorrect === null && selectedOption) {
					checkAnswer()
				} else if (isCorrect) {
					goToNextQuestion()
				}
			}
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [checkAnswer, goToNextQuestion, isCorrect, selectedOption])

	return (
		<div className='w-full md:py-8 py-4'>
			<Accordion
				type='single'
				collapsible
				value={isOpen}
				onValueChange={setIsOpen}
				className='border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg overflow-hidden bg-white dark:bg-gray-900'
			>
				<AccordionItem value='active' className='border-b-0'>
					<AccordionTrigger className='px-6 py-4 text-lg font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'>
						Grammar Test
					</AccordionTrigger>
					<AccordionContent>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
							className='px-6 py-4'
						>
							{gameCompleted ? (
								<motion.div
									initial={{ scale: 0.9, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									transition={{ duration: 0.5, type: 'spring' }}
									className='text-center py-8'
								>
									<h3 className='text-2xl font-bold text-green-600 dark:text-green-400 mb-4'>
										🎉 You completed the game!
									</h3>
									<p className='text-gray-600 dark:text-gray-400'>
										Great job on finishing all the questions!
									</p>
								</motion.div>
							) : (
								<>
									<h3 className='text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200'>
										{renderQuestionWithUnderline()}
									</h3>

									<RadioGroup
										value={selectedOption}
										onValueChange={handleOptionChange}
										className='space-y-3'
									>
										{questions[currentQuestionIndex].options.map(option => (
											<motion.div
												key={option}
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ duration: 0.3 }}
											>
												<label
													htmlFor={option}
													className='flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer'
												>
													<RadioGroupItem
														value={option}
														id={option}
														className='border-2 border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
													/>
													<span className='text-gray-700 dark:text-gray-300'>
														{option}
													</span>
												</label>
											</motion.div>
										))}
									</RadioGroup>

									<div className='mt-8 flex items-center justify-between'>
										<AnimatePresence>
											{isCorrect !== null && (
												<motion.p
													initial={{ opacity: 0, x: -20 }}
													animate={{ opacity: 1, x: 0 }}
													exit={{ opacity: 0, x: -20 }}
													transition={{ duration: 0.3 }}
													className={`text-sm font-medium flex items-center ${
														isCorrect ? 'text-green-500' : 'text-red-500'
													}`}
												>
													{isCorrect ? (
														<CheckCircle className='w-5 h-5 mr-2' />
													) : (
														<XCircle className='w-5 h-5 mr-2' />
													)}
													{isCorrect ? 'Correct!' : 'Incorrect, try again.'}
												</motion.p>
											)}
										</AnimatePresence>

										<div className='space-x-3'>
											<Button
												variant={isCorrect ? 'default' : 'primary'}
												disabled={!selectedOption}
												onClick={checkAnswer}
												className={`${isCorrect ? 'hidden' : 'inline-flex'}`}
											>
												Check Answer
											</Button>

											{isCorrect && (
												<Button
													variant='default'
													onClick={goToNextQuestion}
													className='bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700'
												>
													{currentQuestionIndex === questions.length - 1
														? 'Finish'
														: 'Continue'}
												</Button>
											)}
										</div>
									</div>
								</>
							)}
						</motion.div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	)
}
