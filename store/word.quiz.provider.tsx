import { create } from 'zustand'

interface Pair {
	id: number
	word: string
	match: string
}

interface Selected {
	id: number
	type: 'word' | 'match'
}

interface QuizState {
	pairs: Pair[]
	selected: Selected[]
	correctPairs: Set<number>
	setPairs: (pairs: Pair[]) => void
	selectPair: (id: number, type: 'word' | 'match') => void
	resetSelection: () => void
	addCorrectPair: (id: number) => void
}

export const useQuizStore = create<QuizState>(set => ({
	pairs: [],
	selected: [],
	correctPairs: new Set<number>(),
	setPairs: pairs => set({ pairs }),
	selectPair: (id, type) =>
		set(state => ({
			selected: [...state.selected, { id, type }],
		})),
	resetSelection: () => set({ selected: [] }),
	addCorrectPair: id =>
		set(state => {
			const newCorrectPairs = new Set(state.correctPairs)
			newCorrectPairs.add(id)
			return { correctPairs: newCorrectPairs }
		}),
}))
