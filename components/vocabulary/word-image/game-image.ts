export interface ImageT {
    id: number;
    img: string;
    title: string;
    isCorrect: boolean;
}

export interface GameDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onRestart: () => void;
    correctAnswers: number; // New prop for correct answers
}

export interface elementT {
    id: number;
    title: string;
    isCorrect: boolean;
    img: string;
}

interface rendomElementType{
	id: number
	isCorrect: boolean
	images: ImageT[]
}
export interface GameState {
	rendomElement: rendomElementType[]
	isTimeUpDialogOpen: boolean,
	currentIndex: number,
	isAnySelected: boolean,
	shuffledImages: ImageT[], 
	showDialog: boolean,
	correctAnswers: number, 
	progressValue: number
	setIsTimeUpDialogOpen: (isOpen: boolean) => void
	setRendomElement: (rendomElement: rendomElementType[]) => void
	setCurrentIndex: (currentIndex: number) => void,
	setIsAnySelected: (isAnySelected: boolean) => void
	setShuffledImages: (shuffledImages: ImageT[]) => void
	setShowDialog: (showDialog: boolean) => void
	setCorrectAnswers: ( correctAnswers: number) => void
	setProgressValue: (progressValue: number) => void
}

