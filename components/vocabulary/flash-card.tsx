'use client'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import useTTS from '@/hooks/useTTS'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Snail, Volume2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

type FlashcardProps = {
	cardData: {
		id: number
		front_side: string
		back_side: string
		viewed: boolean
	}[]
	onViewed: (itemId: number) => void
}

const Flashcard = ({
	cardData,
	onViewed,
}: FlashcardProps) => {
	const { handleNormalSpeech, handleSlowSpeech } = useTTS()
	const [isFlipped, setIsFlipped] = useState(false)
	const [isAnimating, setIsAnimating] = useState(false)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [progress, setProgress] = useState(0)

	const [showConfetti, setShowConfetti] = useState(false)
	const [showCongratulations, setShowCongratulations] = useState(false)

	const total = cardData.length
	const currentCard = cardData[currentIndex]
	const [cardBack, setCardBack] = useState(currentCard.back_side)
	
	// Delay changing the card back by 150ms to allow the flip animation to complete
	useEffect(() => {
		setTimeout(() => {
			setCardBack(currentCard.back_side)
		}, 150)

		// Mark the current card as viewed
		if (!currentCard.viewed) {
			onViewed(currentCard.id)
		}

		// Update progress
		const viewedCount = cardData.filter(card => card.viewed).length
		setProgress((viewedCount / total) * 100)
	}, [currentCard, onViewed, cardData, total])

	useEffect(() => {
		if (progress === 100 && !showConfetti) {
			setShowConfetti(true)
			setShowCongratulations(true)
		}
	}, [progress, showConfetti])

	// Flip card
	const handleFlip = useCallback(() => {
		if (!isAnimating) {
			setIsAnimating(true)
			setIsFlipped(prev => !prev)
		}
	}, [isAnimating])

	// Next card
	const handleNext = useCallback(() => {
		if (currentIndex === total - 2 || currentIndex > total - 2) {
			setCurrentIndex(total - 1)
			setProgress(100)
		} else if (currentIndex < total - 1) {
			setCurrentIndex(prev => prev + 1)
			setProgress(prev => prev + 100 / (total - 1))
		}
		if (currentIndex !== total - 1) {
			setIsFlipped(false)
		}
	}, [currentIndex, total])

	// Previous card
	const handleBack = useCallback(() => {
		if (currentIndex === 1 || currentIndex < 1) {
			setCurrentIndex(0)
			setProgress(0)
		} else if (currentIndex > 0) {
			setCurrentIndex(prev => prev - 1)
			setProgress(prev => prev - 100 / (total - 1))
		}
		if (currentIndex !== 0) {
			setIsFlipped(false)
		}
	}, [currentIndex, total])

	// Keyboard shortcuts
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			switch (event.key) {
				case 'ArrowRight':
					handleNext()
					break
				case 'ArrowLeft':
					handleBack()
					break
				case ' ':
					event.preventDefault()
					handleFlip()
					break
				default:
					break
			}
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [currentIndex, handleBack, handleFlip, handleNext])

	return (
		<div className='flex flex-col items-center justify-center space-y-4'>
			{showConfetti && <Confetti />}
			<Dialog open={showCongratulations} onOpenChange={setShowCongratulations}>
				<DialogContent className='max-w-lg p-8 bg-gradient-to-br from-gray-100 via-white to-gray-50 rounded-xl shadow-2xl text-center space-y-6'>
					<DialogHeader>
						<DialogTitle className='text-4xl font-extrabold text-gray-800'>
							🎉 Congratulations!
						</DialogTitle>
						<DialogDescription className='text-lg text-gray-600'>
							You’ve successfully completed all the words in this unit. Keep up
							the great work!
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>

			<div
				className='flip-card w-full h-[328px] max-w-[816px] sm:h-[428px]'
				onClick={handleFlip}
			>
				{/* Flashcard */}
				<motion.div
					className='flip-card-inner w-[100%] h-[100%] cursor-pointer'
					initial={false}
					animate={{ rotateX: isFlipped ? 180 : 360 }}
					transition={{
						duration: 0.1,
						type: 'tween',
						animationDirection: 'normal',
					}}
					onAnimationComplete={() => setIsAnimating(false)}
				>
					<div className='flip-card-front w-[100%] h-[100%] bg-zinc-800 rounded-lg p-4 flex justify-center items-center'>
						<div className='absolute top-4 right-4 flex gap-4'>
							<Button
								size='icon'
								onClick={evt => handleNormalSpeech(evt, currentCard.front_side)}
							>
								<Volume2 />
							</Button>
							<Button
								size='icon'
								onClick={evt => handleSlowSpeech(evt, currentCard.front_side)}
							>
								<Snail />
							</Button>
						</div>
						<div className='text-3xl sm:text-4xl text-white'>
							{currentCard.front_side}
						</div>
					</div>
					<div className='flip-card-back w-[100%] h-[100%] bg-zinc-800 rounded-lg p-4 flex justify-center items-center'>
						<div className='text-3xl sm:text-4xl text-white'>{cardBack}</div>
					</div>
				</motion.div>
			</div>

			{/* Flashcard Controls */}
			<div className='w-full h-full flex justify-center items-center font-semibold'>
				<div className='relative flex justify-center items-center gap-28'>
					{/* Back */}
					<Button
						variant='default'
						size='lg'
						onClick={() => handleBack()}
						disabled={currentIndex === 0}
						className='bg-slate-900 hover:bg-slate-800 text-neutral-400 hover:text-neutral-100 px-4 size-14 rounded-full custom-transition disabled:opacity-50'
					>
						<ArrowLeft className='size-6' />
					</Button>
					<div className='absolute'>
						{currentIndex + 1} / {cardData.length}
					</div>
					{/* Next */}
					<Button
						variant='ghost'
						size='lg'
						onClick={() => handleNext()}
						disabled={currentIndex === total - 1}
						className='bg-slate-900 hover:bg-slate-800 text-neutral-400 hover:text-neutral-100 px-4 size-14 rounded-full custom-transition disabled:opacity-50'
					>
						<ArrowRight className='size-6' />
					</Button>
				</div>
			</div>

			{/* Progress Bar */}
			<Progress className='custom-transition h-2' value={progress} />
		</div>
	)
}

export default Flashcard
