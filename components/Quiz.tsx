import { useQuizStore } from '@/store/quiz.provider'
import React, { useEffect } from 'react'
import Question from './Question'

const Quiz: React.FC = () => {
	const { setQuestions, currentQuestionIndex, questions, resetQuiz, score } =
		useQuizStore()

	useEffect(() => {
		// Example questions data
		const quizQuestions = [
			{
				id: 1,
				question: 'What is the capital of France?',
				choices: ['Paris', 'London', 'Berlin', 'Madrid'],
				answer: 0,
			},
			{
				id: 2,
				question: 'What is 2 + 2?',
				choices: ['3', '4', '5', '6'],
				answer: 1,
			},
			// Add more questions here
		]
		setQuestions(quizQuestions)
	}, [setQuestions])

	if (currentQuestionIndex >= questions.length) {
		return (
			<div>
				<h2>Your score: {score}</h2>
				<button onClick={resetQuiz}>Restart Quiz</button>
			</div>
		)
	}

	return <Question />
}

export default Quiz
