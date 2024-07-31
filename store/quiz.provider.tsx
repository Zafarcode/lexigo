import { create } from 'zustand'

type Question = {
	id: number
	question: string
	choices: string[]
	answer: number // Index of the correct answer
}

type QuizState = {
	questions: Question[]
	currentQuestionIndex: number
	score: number
	setQuestions: (questions: Question[]) => void
	nextQuestion: () => void
	submitAnswer: (choiceIndex: number) => void
	resetQuiz: () => void
}

export const useQuizStore = create<QuizState>(set => ({
	questions: [],
	currentQuestionIndex: 0,
	score: 0,
	setQuestions: questions => set({ questions }),
	nextQuestion: () =>
		set(state => ({
			currentQuestionIndex: state.currentQuestionIndex + 1,
		})),
	submitAnswer: choiceIndex =>
		set(state => {
			const currentQuestion = state.questions[state.currentQuestionIndex]
			const isCorrect = currentQuestion.answer === choiceIndex
			return {
				score: state.score + (isCorrect ? 1 : 0),
				currentQuestionIndex: state.currentQuestionIndex + 1,
			}
		}),
	resetQuiz: () =>
		set({
			currentQuestionIndex: 0,
			score: 0,
		}),
}))
