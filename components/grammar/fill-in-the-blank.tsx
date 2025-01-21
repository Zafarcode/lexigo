'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

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

	const handleOptionChange = (value: string) => {
		setSelectedOption(value)
	}

	const checkAnswer = () => {
		const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase()
		setIsCorrect(selectedOption.toLowerCase() === correctAnswer)
	}

	const goToNextQuestion = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(prev => prev + 1)
			setSelectedOption('')
			setIsCorrect(null)
		} else {
			setGameCompleted(true)
		}
	}

	return (
		<div className='max-w-xl px-8 py-6'>
			<Accordion
				type='single'
				collapsible
				value={isOpen}
				onValueChange={setIsOpen}
				className='border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-900'
			>
				<AccordionItem value='active' className='px-4'>
					<AccordionTrigger className='text-lg font-medium text-gray-800 dark:text-gray-200'>
						Grammer Test
					</AccordionTrigger>
					<AccordionContent className='text-gray-700 dark:text-gray-300'>
						{gameCompleted ? (
							<p className='text-xl text-center font-semibold text-green-600'>
								🎉 You completed the game!
							</p>
						) : (
							<>
								<h3 className='text-lg font-semibold'>
									{questions[currentQuestionIndex].question}
								</h3>

								{/* Select options */}
								<RadioGroup
									value={selectedOption}
									onValueChange={handleOptionChange}
									className='mt-2 space-y-2'
								>
									{questions[currentQuestionIndex].options.map(option => (
										<div key={option} className='flex items-center space-x-2'>
											<RadioGroupItem
												value={option}
												id={option}
												className='border-gray-400 dark:border-gray-600'
											/>
											<label
												htmlFor={option}
												className='cursor-pointer text-gray-800 dark:text-gray-300'
											>
												{option}
											</label>
										</div>
									))}
								</RadioGroup>

								{/* Buttons */}
								<div
									className={`flex items-center justify-between mt-4 ${
										isCorrect ? 'justify-between' : 'justify-end'
									}`}
								>
									{isCorrect !== null && (
										<p
											className={`text-sm font-medium ${
												isCorrect ? 'text-green-500' : 'text-red-500'
											}`}
										>
											{isCorrect
												? '✔ To‘g‘ri!'
												: '❌ Noto‘g‘ri, qaytadan urinib ko‘ring.'}
										</p>
									)}

									<Button
										variant='primary'
										disabled={!selectedOption}
										onClick={checkAnswer}
										className={`${isCorrect ? 'hidden' : 'block'}`}
									>
										Tekshirish
									</Button>

									{isCorrect && (
										<Button variant='secondary' onClick={goToNextQuestion}>
											{currentQuestionIndex === questions.length - 1
												? 'Finish'
												: 'Continue'}
										</Button>
									)}
								</div>
							</>
						)}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	)
}
