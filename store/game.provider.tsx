import { create } from 'zustand'

type rendomElementType = {
	id: number
	isCorrect: boolean
	images: {
		isCorrect: boolean
		id: number
		img: string
		title: string
	}[]
}
interface GameState {
	rendomElement: rendomElementType[]
	time: number
	isTimeUpDialogOpen: boolean
	setTime: (time: number) => void
	setIsTimeUpDialogOpen: (isOpen: boolean) => void
	setRendomElement: (rendomElement: rendomElementType[]) => void
}

const useGameStore = create<GameState>(set => ({
	rendomElement: [],
	time: 180,
	isTimeUpDialogOpen: false,
	setTime: time => set({ time }),
	setIsTimeUpDialogOpen: isOpen => set({ isTimeUpDialogOpen: isOpen }),
	setRendomElement: rendomElement => set({ rendomElement }),
}))

export default useGameStore
