'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ToastTitle } from '@/components/ui/toast'

// Shuffle function
const shuffleArray = <T,>(array: T[]): T[] => {
	return [...array].sort(() => Math.random() - 0.5)
}

const MatchingPairs: React.FC = () => {
	const [selected, setSelected] = useState<{ id: number; value: string }[]>([])
	const [matchedPairs, setMatchedPairs] = useState<string[][]>([])
	const [feedback, setFeedback] = useState('')
	const [englishWords, setEnglishWords] = useState<
		{ id: number; value: string }[]
	>([])
	const [uzbekWords, setUzbekWords] = useState<{ id: number; value: string }[]>(
		[]
	)
	const [progress, setProgress] = useState(0) // Progress state
	const [hearts, setHearts] = useState(5) // Initial hearts count
	const [gameOver, setGameOver] = useState(false) // Game over state

	// Words list (English - Uzbek)
	const words = [
		{ id: 1, value: 'and', pair: 'va' },
		{ id: 2, value: 'man', pair: 'erkak' },
		{ id: 3, value: 'girl', pair: 'qiz' },
		{ id: 4, value: 'boy', pair: 'o‘g‘il bola' },
		{ id: 5, value: 'cat', pair: 'mushuk' },
	]

	// Initialize words after first render
	useEffect(() => {
		setEnglishWords(
			shuffleArray(words.map(w => ({ id: w.id, value: w.value })))
		)
		setUzbekWords(
			shuffleArray(words.map(w => ({ id: w.id + 100, value: w.pair })))
		)
	}, [])

	const handleSelect = (id: number, value: string) => {
		if (selected.some(s => s.id === id)) return // Prevent re-selecting the same button
		const newSelection = [...selected, { id, value }]
		setSelected(newSelection)

		if (newSelection.length === 2) {
			const [first, second] = newSelection
			if (
				words.some(
					w =>
						(w.value === first.value && w.pair === second.value) ||
						(w.value === second.value && w.pair === first.value)
				)
			) {
				// Correct pair
				setMatchedPairs(prev => [...prev, [first.value, second.value]])
				setFeedback('Excellent!')
				setProgress((matchedPairs.length + 1) / words.length) // Update progress
				setTimeout(() => setFeedback(''), 1000)
			} else {
				// Incorrect pair
				setFeedback('Try again!')
				setHearts(prev => {
					const updatedHearts = prev - 1
					if (updatedHearts === 0) setGameOver(true) // Trigger game over
					return updatedHearts
				})
				setTimeout(() => setFeedback(''), 1000)
			}
			setSelected([])
		}
	}

	const resetGame = () => {
		setSelected([])
		setMatchedPairs([])
		setFeedback('')
		setProgress(0)
		setHearts(5)
		setGameOver(false)
		setEnglishWords(
			shuffleArray(words.map(w => ({ id: w.id, value: w.value })))
		)
		setUzbekWords(
			shuffleArray(words.map(w => ({ id: w.id + 100, value: w.pair })))
		)
	}

	return (
		<div className='w-[800px] mx-auto text-center mt-12'>
			{gameOver ? (
				<div className='flex flex-col items-center justify-center h-screen'>
					<h1 className='text-4xl font-bold text-red-600 mb-8'>Game Over</h1>
					<Button
						className='px-8 py-4 text-lg font-bold text-white bg-blue-500 rounded-lg'
						onClick={resetGame}
					>
						Restart Game
					</Button>
				</div>
			) : (
				<>
					{/* Progress Bar */}
					<div className='relative h-4 mb-8 bg-gray-300 rounded-full'>
						<div
							className='absolute top-0 left-0 h-4 bg-green-500 rounded-full transition-all'
							style={{ width: `${progress * 100}%` }}
						></div>
					</div>
					<h1 className='text-3xl text-black font-bold'>
						Tap the matching pairs
					</h1>
					{/* Hearts Display */}
					<div className='flex justify-center items-center mb-4'>
						<div className='flex items-center space-x-2 text-red-600'>
							{/* Heart Icon */}
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='currentColor'
								className='w-8 h-8'
							>
								<path
									fillRule='evenodd'
									d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
									clipRule='evenodd'
								/>
							</svg>
							{/* Remaining Lives */}
							<span className='text-xl font-bold'>{hearts}</span>
						</div>
					</div>

					{/* Word Buttons */}
					<div className='grid grid-cols-2 gap-6 mb-10'>
						{/* English Words */}
						<Card className='p-4'>
							<h3 className='mb-4 text-xl font-bold text-black'>English</h3>
							<div className='grid grid-cols-1 gap-4'>
								{englishWords.map(({ id, value }) => (
									<Button
										key={id}
										className={`w-full p-5 text-base rounded-lg transition-all text-black ${
											selected.some(s => s.id === id)
												? 'bg-blue-100'
												: matchedPairs.flat().includes(value)
												? 'bg-gray-200'
												: 'bg-white'
										}`}
										onClick={() => handleSelect(id, value)}
										disabled={matchedPairs.flat().includes(value)}
									>
										{value}
									</Button>
								))}
							</div>
						</Card>

						{/* Uzbek Words */}
						<Card className='p-4'>
							<h3 className='mb-4 text-xl font-bold text-black'>Uzbek</h3>
							<div className='grid grid-cols-1 gap-4'>
								{uzbekWords.map(({ id, value }) => (
									<Button
										key={id}
										className={`w-full p-5 text-base rounded-lg transition-all text-black ${
											selected.some(s => s.id === id)
												? 'bg-blue-100'
												: matchedPairs.flat().includes(value)
												? 'bg-gray-200'
												: 'bg-white'
										}`}
										onClick={() => handleSelect(id, value)}
										disabled={matchedPairs.flat().includes(value)}
									>
										{value}
									</Button>
								))}
							</div>
						</Card>
					</div>
					{/* Feedback */}
					{feedback && (
						<div
							className={`${
								feedback === 'Try again!'
									? 'bg-red-100 text-red-600'
									: 'bg-green-100 text-green-600'
							} p-3 rounded-md mb-4 font-semibold`}
						>
							{feedback}
						</div>
					)}

					<div
						className={` flex justify-evenly items-center message absolute z-10 bottom-0 left-0 w-full h-40 text-3xl ${
							matchedPairs.length === words.length
								? 'bg-green-100 text-green-800'
								: ' '
						}`}
					>
						{matchedPairs.length === words.length ? (
							<p className=' text-left'>
								✅ Well done! Your answer is correct.
							</p>
						) : (
							<p></p>
						)}
						<Button
							className={`w-48 h-16  z-20 p-4 text-lg rounded-md transition-all ${
								matchedPairs.length === words.length
									? 'bg-blue-500 text-white hover:text-white hover:bg-blue-500'
									: ' hidden'
							}`}
							// onClick={() => {
							//     if (matchedPairs.length === words.length) {
							//         setSelected([])
							//         setMatchedPairs([])
							//     }
							// }}
							onClick={resetGame}
							disabled={matchedPairs.length !== words.length}
						>
							CONTINUE
						</Button>
					</div>
				</>
			)}
		</div>
	)
}

export default MatchingPairs
