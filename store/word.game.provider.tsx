import { create } from 'zustand'

interface Word {
	word: string
	translation: string
}

interface Result {
	word: Word
	translation: Word
	isCorrect: boolean
}
interface GameState {
	name: string
	level: string
	time: number,
	shuffledWords: Word[]
	shuffledTranslations: Word[]
	selectedWord: Word | null
	selectedTranslation: Word | null
	results: Result[]
	isOver: boolean
	setShuffledWords: (words: Word[]) => void
	setShuffledTranslations: (words: Word[]) => void
	setSelectedWord: (word: Word | null) => void
	setSelectedTranslation: (word: Word | null) => void
	setResults: (
		results: Result[] | ((prevResults: Result[]) => Result[])
	) => void
	setIsOver: (isOver: boolean) => void
	setTime: (time: number) => void
	setLevel: (level: string) => void
	setName: (name: string) => void
}

const useWordGameStore = create<GameState>(set => ({
	name: 'Guest',
	time: 0,
	level: '',
	shuffledWords: [],
	shuffledTranslations: [],
	selectedWord: null,
	selectedTranslation: null,
	results: [],
	isOver: false,
	setShuffledWords: words => set(state => ({ ...state, shuffledWords: words })),
	setShuffledTranslations: words =>
		set(state => ({ ...state, shuffledTranslations: words })),
	setSelectedWord: word => set(state => ({ ...state, selectedWord: word })),
	setSelectedTranslation: word =>
		set(state => ({ ...state, selectedTranslation: word })),
	setResults: results =>
		set(state => ({
			results: typeof results === 'function' ? results(state.results) : results,
		})),
	setIsOver: isOver => set(state => ({ ...state, isOver: isOver })),
	setTime: time => set(state => ({ ...state, time: time })),
	setLevel: level => set(state => ({ ...state, level: level })),
	setName: name => set(state => ({ ...state, name: name })),
}))

export default useWordGameStore
