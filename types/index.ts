export interface Tag {
	id: number
	name: string
}

export type FillInBlank = {
	id: number
	type: 'fillInBlank'
	question: string
	correctAnswer: string
	options: string[]
	viewed: boolean
}

export type FinishQuiz = {
	id: number
	type: 'finishQuiz'
	en: string
	uz: string
	viewed: boolean
}

export type WordPair = {
	type: 'wordPair'
	id: number
	value: string
	pair: string
	viewed: boolean
}

export type ImageSelection = {
	type: 'imageSelection'
	id: number
	word: string
	question: string
	options: {
		id: string
		image: string
		label: string
	}[]
	correct: string
	viewed: boolean
}

export type Flashcards = {
	type: 'flashcard'
	id: number
	front_side: string
	back_side: string
	description: string
	synonyms: string[]
	tags: Tag
	image: string
	viewed: boolean
}

export type Item =
	| FillInBlank
	| FinishQuiz
	| WordPair
	| ImageSelection
	| Flashcards

export interface Unit {
	id: number
	title: string
	slug: string
	type: 'start' | 'trophy' | 'star' | 'character' | 'chest'
	isCompleted: boolean
	isLocked: boolean
	item: Item[] // Updated to use the new `Item` type
}

export interface Section {
	id: number
	title: string
	theme: string
	slug: string
	units: Unit[] // Contains an array of `Unit`
}
