'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Heart, X } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

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
	const [progress, setProgress] = useState(0)
	const [hearts, setHearts] = useState(5)
	const [gameOver, setGameOver] = useState(false)

	const words = [
		{ id: 1, value: 'apple', pair: 'olma' },
		{ id: 2, value: 'dog', pair: 'it' },
		{ id: 3, value: 'tree', pair: 'daraxt' },
		{ id: 4, value: 'house', pair: 'uy' },
		{ id: 5, value: 'car', pair: 'mashina' },
	]

	useEffect(() => {
		setEnglishWords(
			shuffleArray(words.map(w => ({ id: w.id, value: w.value })))
		)
		setUzbekWords(
			shuffleArray(words.map(w => ({ id: w.id + 100, value: w.pair })))
		)
	}, [])

	const handleSelect = (id: number, value: string) => {
		if (selected.some(s => s.id === id)) return
		const newSelection = [...selected, { id, value }]
		setSelected(newSelection)

		if (newSelection.length === 2) {
			const [first, second] = newSelection
			const isMatch = words.some(
				w =>
					(w.value === first.value && w.pair === second.value) ||
					(w.value === second.value && w.pair === first.value)
			)

			if (isMatch) {
				setMatchedPairs(prev => [...prev, [first.value, second.value]])
				setFeedback('Excellent!')
				setProgress(((matchedPairs.length + 1) / words.length) * 100)
			} else {
				setFeedback('Try again!')
				setHearts(prev => {
					const updatedHearts = prev - 1
					if (updatedHearts === 0) setGameOver(true)
					return updatedHearts
				})
			}
			setTimeout(() => setFeedback(''), 1000)
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
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className='min-h-screen flex items-center justify-center px-4 sm:px-6'
		>
			<div className='w-full max-w-4xl'>
				<CardContent className='p-6'>
					{gameOver ? (
						<div className='flex flex-col items-center justify-center h-screen'>
							<h1 className='text-3xl sm:text-4xl font-bold text-pink-600 mb-8'>
								Game Over
							</h1>
							<Button variant='secondary' onClick={resetGame}>
								Restart Game
							</Button>
						</div>
					) : (
						<>
							<div className='flex items-center gap-2 mb-6'>
								<Link href='/dashboard/vocabulary'>
									<X className='h-6 w-6 text-gray-200 hover:text-primary' />
								</Link>
								<Progress value={progress} className='h-3 bg-pink-100 flex-1' />
								<div className='flex items-center space-x-1'>
									<Heart className='h-4 w-4 text-primary' />
									<span>{hearts}</span>
								</div>
							</div>
							<Badge
								variant='secondary'
								className='text-xs mb-6 font-semibold bg-pink-200 text-pink-700'
							>
								NEW WORD
							</Badge>
							<h1 className='text-2xl sm:text-3xl font-bold mb-6'>
								Tap the matching pairs
							</h1>

							<div className='grid grid-cols-2  sm:grid-cols-2 gap-6 mb-6'>
								<Card className='p-6'>
									<h3 className='text-xl sm:text-2xl font-bold mb-4'>
										English
									</h3>
									<div className='grid grid-cols-1 gap-4'>
										{englishWords.map(({ id, value }) => (
											<Button
												key={id}
												variant='outline'
												onClick={() => handleSelect(id, value)}
												disabled={matchedPairs.flat().includes(value)}
												className={cn('border-b-1', {
													'border-pink-500 text-pink-500':
														selected.some(s => s.id === id) && !feedback,
													'border-gray-200 text-gray-700':
														!selected.some(s => s.id === id) && !feedback,
													'border-green-500 text-green-500':
														selected.some(s => s.id === id) &&
														feedback === 'Excellent!',
												})}
											>
												{value}
											</Button>
										))}
									</div>
								</Card>

								<Card className='p-6'>
									<h3 className='text-xl sm:text-2xl font-bold mb-4'>Uzbek</h3>
									<div className='grid grid-cols-1 gap-4'>
										{uzbekWords.map(({ id, value }) => (
											<Button
												key={id}
												variant='outline'
												onClick={() => handleSelect(id, value)}
												disabled={matchedPairs.flat().includes(value)}
												className={cn('border-b-1', {
													'border-pink-500 text-pink-500':
														selected.some(s => s.id === id) && !feedback,
													'border-gray-200 text-gray-700':
														!selected.some(s => s.id === id) && !feedback,
													'border-green-500 text-green-500':
														selected.some(s => s.id === id) &&
														feedback === 'Excellent!',
												})}
											>
												{value}
											</Button>
										))}
									</div>
								</Card>
							</div>

							<div className='flex items-center justify-between min-h-[3rem]'>
								<div className='flex-1'>
									{feedback && (
										<div
											className={`text-lg sm:text-xl font-semibold transition-colors duration-200 ${
												feedback === 'Try again!'
													? 'text-pink-600'
													: 'text-green-600'
											}`}
										>
											{feedback}
										</div>
									)}
								</div>
								<div className='flex-shrink-0'>
									{matchedPairs.length === words.length && (
										<Button
											onClick={resetGame}
											className='text-lg sm:text-xl font-semibold transition-colors duration-200 border-b-4 text-white bg-green-500 hover:bg-green-600 border-green-700'
										>
											Continue
										</Button>
									)}
								</div>
							</div>
						</>
					)}
				</CardContent>
			</div>
		</motion.div>
	)
}

export default MatchingPairs
