'use client'
import { useEffect, useState, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { Heart, X } from 'lucide-react'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { FinishQuiz as FinishQuizType } from '@/types'
import CelebrationDialog from '../celebration-dialog'

type FinishQuizProps = {
	options: FinishQuizType[]
	onViewed: (itemId: number) => void
	slug: string
}

const FinishQuiz = ({ options, onViewed, slug }: FinishQuizProps) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [lossCount, setLossCount] = useState(5)
	const [progress, setProgress] = useState(0)
	const [gameState, setGameState] = useState<'playing' | 'continue'>('playing')
	const [inputSpaces, setInputSpaces] = useState<string[]>([])
	const [clickedLetters, setClickedLetters] = useState<Record<string, boolean>>(
		{}
	)
	const [showCongratulations, setShowCongratulations] = useState(false)

	const currentWord = options[currentIndex]?.en || ''
	const currentHint = options[currentIndex]?.uz || ''

	const initializeWord = useCallback(() => {
		setInputSpaces(Array(currentWord.length).fill('_'))
		setClickedLetters({})
	}, [currentWord])

	const handleWin = useCallback(() => {
		const isLastWord = currentIndex === options.length - 1
		onViewed(options[currentIndex].id)
		if (!isLastWord) {
			setCurrentIndex(prev => prev + 1)
			setProgress(((currentIndex + 1) / options.length) * 100)
			setGameState('continue')
		} else {
			setProgress(100)
			setShowCongratulations(true)
			setTimeout(() => setShowCongratulations(false), 5000)
		}
	}, [currentIndex, options, onViewed])

	const handleLoss = useCallback(() => {
		setLossCount(5)
		setCurrentIndex(0)
		setProgress(0)
		setGameState('playing')
	}, [])

	const handleLetterClick = useCallback(
		(letter: string) => {
			if (clickedLetters[letter]) return

			setClickedLetters(prev => ({ ...prev, [letter]: true }))

			const charArray = currentWord.toUpperCase().split('')

			if (charArray.includes(letter)) {
				setInputSpaces(prev =>
					prev.map((char, index) =>
						charArray[index] === letter ? letter : char
					)
				)

				if (
					charArray.every(
						(char, index) => inputSpaces[index] === char || char === letter
					)
				) {
					handleWin()
				}
			} else {
				setLossCount(prev => {
					const newLossCount = prev - 1
					if (newLossCount === 0) {
						handleLoss()
					}
					return newLossCount
				})
			}
		},
		[clickedLetters, currentWord, inputSpaces, handleWin, handleLoss]
	)

	useEffect(() => {
		if (gameState === 'playing') {
			initializeWord()
		}
	}, [gameState, initializeWord])

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			const letter = event.key.toUpperCase()
			if (/[A-Z]/.test(letter) && letter.length === 1) {
				handleLetterClick(letter)
			}
			if (event.key === 'Enter' && gameState === 'continue') {
				setGameState('playing')
			}
		},
		[handleLetterClick, gameState]
	)

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [handleKeyDown])

	return (
		<div className='w-full lg:max-w-5xl mx-auto flex flex-col items-center gap-5 p-3 sm:p-5'>
			<CelebrationDialog isOpen={showCongratulations} onClose={() => 	setShowCongratulations(false)} />
			<div className='w-full flex justify-between items-center gap-2'>
				<Link href={`/dashboard/vocabulary/${slug}`}>
					<X className='h-6 w-6 text-gray-200 hover:text-primary' />
				</Link>
				<Progress value={progress} className='h-3 bg-pink-100' />
				<div className='flex items-center text-sm'>
					<Heart className='h-4 w-4 text-primary mr-1' />
					<span>{lossCount}</span>
				</div>
			</div>

			<Card className='w-full h-[calc(50vh)] sm:h-[350px] min-[320px]:h-[250px] p-0 md:p-4 text-center rounded-2xl border-none flex flex-col justify-center items-center'>
				{gameState === 'playing' && (
					<>
						<p className='mb-4 text-sm sm:text-lg'>
							<span className='font-bold'>Hint:</span> {currentHint}
						</p>
						<p className='flex gap-2 text-base sm:text-lg'>
							{inputSpaces.map((char, idx) => (
								<span key={idx}>{char}</span>
							))}
						</p>
						<ul className='mt-6 grid grid-cols-10 gap-1 md:gap-3'>
							{['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'].map((row, rowIndex) => (
								<li
									key={rowIndex}
									className='flex justify-center col-span-full sm:gap-2'
								>
									{row.split('').map(letter => (
										<Button
											key={letter}
											onClick={() => handleLetterClick(letter)}
											disabled={!!clickedLetters[letter]}
											className={`rounded-md px-2 py-1 text-xs sm:text-sm ${
												clickedLetters[letter]
													? currentWord.toUpperCase().includes(letter)
														? 'bg-green-500 text-white'
														: 'bg-red-500 text-white'
													: ''
											}`}
										>
											{letter}
										</Button>
									))}
								</li>
							))}
						</ul>
					</>
				)}
				{gameState === 'continue' && (
					<Button
						onClick={() => setGameState('playing')}
						className='bg-green-500 hover:bg-green-400 text-white px-4 py-2'
					>
						Continue
					</Button>
				)}
			</Card>
		</div>
	)
}

export default FinishQuiz

