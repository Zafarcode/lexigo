import { create } from 'zustand'
import { GameState } from '@/components/vocabulary/game-images/game-image'


const useGameStore = create<GameState>(set => ({
	rendomElement: [],
	isTimeUpDialogOpen: false,
	currentIndex: 0,
	isAnySelected: false,
	shuffledImages: [],
	showDialog: false,
	correctAnswers: 0,
	progressValue: 0,
	setIsTimeUpDialogOpen: isOpen => set({ isTimeUpDialogOpen: isOpen }),
	setRendomElement: rendomElement => set({ rendomElement }),
	setCurrentIndex: currentIndex => set({ currentIndex }),
	setIsAnySelected: isAnySelected => set({ isAnySelected }),
	setShuffledImages: shuffledImages => set({ shuffledImages }),
	setShowDialog: showDialog => set({ showDialog }),
	setCorrectAnswers: correctAnswers => set({ correctAnswers }),
	setProgressValue: progressValue => set({ progressValue }),
}))

export default useGameStore
