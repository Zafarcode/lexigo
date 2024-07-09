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
	time: number
	isTimeUpDialogOpen: boolean
	progress: number
	progressVisible: boolean
	text: string
	startGame: string
	btnText: string
	score: number
	shuffledIndices: number[]
	currentIndex: number
	rendomElement: null | rendomElementType
	selectedImageId: number | null
	musicIconVisible: boolean
	isDisabled: boolean
	current: { id: number; isCorrect: boolean } | null
	isCardSelected: boolean
	isDialogOpen: boolean
	timerRunning: boolean
	setTime: (time: number) => void
	setIsTimeUpDialogOpen: (isOpen: boolean) => void
	setProgress: (progress: number) => void
	setProgressVisible: (visible: boolean) => void
	setText: (text: string) => void
	setStartGame: (game: string) => void
	setBtnText: (text: string) => void
	setScore: (score: number) => void
	setShuffledIndices: (indices: number[]) => void
	setCurrentIndex: (index: number) => void
	setRendomElement: (element: rendomElementType | null) => void
	setSelectedImageId: (id: number | null) => void
	setMusicIconVisible: (visible: boolean) => void
	setIsDisabled: (disabled: boolean) => void
	setCurrent: (current: { id: number; isCorrect: boolean }) => void
	setIsCardSelected: (selected: boolean) => void
	setIsDialogOpen: (open: boolean) => void
	setTimerRunning: (running: boolean) => void
}

const useGameStore = create<GameState>(set => ({
	time: 180,
	isTimeUpDialogOpen: false,
	progress: 0,
	progressVisible: false,
	text: '',
	startGame: 'Start Game',
	btnText: 'Start',
	score: 0,
	shuffledIndices: [],
	currentIndex: 0,
	rendomElement: null,
	selectedImageId: null,
	musicIconVisible: false,
	isDisabled: true,
	current: null,
	isCardSelected: false,
	isDialogOpen: false,
	timerRunning: false,
	setTime: time => set({ time }),
	setIsTimeUpDialogOpen: isOpen => set({ isTimeUpDialogOpen: isOpen }),
	setProgress: progress => set({ progress }),
	setProgressVisible: visible => set({ progressVisible: visible }),
	setText: text => set({ text }),
	setStartGame: game => set({ startGame: game }),
	setBtnText: text => set({ btnText: text }),
	setScore: score => set({ score }),
	setShuffledIndices: indices => set({ shuffledIndices: indices }),
	setCurrentIndex: index => set({ currentIndex: index }),
	setRendomElement: element => set({ rendomElement: element }),
	setSelectedImageId: id => set({ selectedImageId: id }),
	setMusicIconVisible: visible => set({ musicIconVisible: visible }),
	setIsDisabled: disabled => set({ isDisabled: disabled }),
	setCurrent: current => set({ current }),
	setIsCardSelected: selected => set({ isCardSelected: selected }),
	setIsDialogOpen: open => set({ isDialogOpen: open }),
	setTimerRunning: running => set({ timerRunning: running }),
}))

export default useGameStore
