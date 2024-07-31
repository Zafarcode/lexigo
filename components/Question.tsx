import { useQuizStore } from '@/store/quiz.provider'
import React from 'react'

const Question: React.FC = () => {
	const { questions, currentQuestionIndex, submitAnswer } = useQuizStore()
	const question = questions[currentQuestionIndex]

	if (!question) {
		return <div>Loading...</div>
	}

	const handleSubmit = (choiceIndex: number) => {
		submitAnswer(choiceIndex)
	}

	return (
		<div>
			<h2>{question.question}</h2>
			<ul>
				{question.choices.map((choice, index) => (
					<li key={index} onClick={() => handleSubmit(index)}>
						{choice}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Question
