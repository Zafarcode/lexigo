import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import GameDialog from '@/components/vocabulary/game-images/game-dialog'
import ImageCard from '@/components/vocabulary/game-images/image-card'
import useGameStore from '@/store/game.provider'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ImageT } from './game-image'
import rendomElement from './rendomElemen.json'

const shuffleArray = (array: ImageT[]) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
	return array
}

const GameBody = () => {
	const {
		currentIndex,
		setCurrentIndex,
		isAnySelected,
		setIsAnySelected,
		shuffledImages,
		setShuffledImages,
		showDialog,
		setShowDialog,
		correctAnswers,
		setCorrectAnswers,
	} = useGameStore()
	const [usedIndexes, setUsedIndexes] = useState(new Set<number>())

	const [progressValue, setProgressValue] = useState(0) // Track progress value

	useEffect(() => {
		const shuffled = shuffleArray([
			...(rendomElement[currentIndex]?.images || []),
		])
		setShuffledImages(shuffled)
	}, [currentIndex, setShuffledImages])

	const handleNextClick = () => {
		setIsAnySelected(false)

		if (usedIndexes.size >= rendomElement.length) {
			setShowDialog(true)
			return
		}

		let newIndex
		do {
			newIndex = Math.floor(Math.random() * rendomElement.length)
		} while (usedIndexes.has(newIndex)) // Keep finding a new index until an unused one is found

		setUsedIndexes(prev => {
			const updatedSet = new Set(prev)
			updatedSet.add(newIndex) // Add the new index to the used set
			setProgressValue((updatedSet.size / rendomElement.length) * 100) // Update progress value
			return updatedSet
		})

		setCurrentIndex(newIndex)
	}

	const handleCorrectSelection = () => {
		setIsAnySelected(true)
		setCorrectAnswers(correctAnswers + 1)
	}

	const currentElement = rendomElement[currentIndex]
	const elementName = currentElement?.name
	const handleSpeak = () => {
		if ('speechSynthesis' in window) {
			const speech = new SpeechSynthesisUtterance(elementName)
			speech.lang = 'en-US'
			window.speechSynthesis.speak(speech)
		}
	}
	return (
		<>
			<div className='container'>
				<Progress value={progressValue} max={100} color='green' />
			</div>

			<div className='relative my-3'>
				<div className='flex justify-center items-center gap-3'>
					{
						<Image
							className='cursor-pointer'
							src={'/assets/icons/music-therapy.png'}
							width={30}
							height={30}
							alt='music-therapy'
							onClick={handleSpeak}
						/>
					}
					<h2
						className='text-2xl md:text-3xl font-sans font-medium cursor-pointer my-3'
						onClick={handleSpeak}
					>
						{elementName}
					</h2>
				</div>
			</div>

			<div className='grid md:grid-cols-2 grid-cols-2 gap-2 md:gap-5 md:w-[70%] w-full mx-auto'>
				{shuffledImages.map((image, imageIndex) => (
					<ImageCard
						key={`${currentIndex}-${imageIndex}`}
						element={image}
						index={imageIndex}
						isDisabled={isAnySelected}
						onSelected={
							image.isCorrect
								? handleCorrectSelection
								: () => setIsAnySelected(true)
						}
					/>
				))}
			</div>

			<div className='flex justify-center md:w-[70%] w-full mx-auto mb-6'>
				<Button
					onClick={handleNextClick}
					className='w-full md:w-1/2 mt-5 font-sans'
					disabled={!isAnySelected}
				>
					Next
				</Button>
			</div>

			<GameDialog
				isOpen={showDialog}
				onClose={() => setShowDialog(false)}
				onRestart={() => {
					setUsedIndexes(new Set())
					setCurrentIndex(0)
					setCorrectAnswers(0)
					setProgressValue(0)
					setShowDialog(false)
				}}
				correctAnswers={correctAnswers}
			/>
		</>
	)
}

export default GameBody
