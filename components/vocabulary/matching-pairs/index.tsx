'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { WordPair } from '@/types'
import { motion } from 'framer-motion'
import { Heart, X } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type WordPairProps = {
	words: WordPair[]
	onViewed: (itemId: number) => void
	slug: string
}

const shuffleArray = <T,>(array: T[]): T[] => {
	return [...array].sort(() => Math.random() - 0.5)
}

const MatchingPairs = ({ words, onViewed, slug }: WordPairProps) => {
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
	const [visibleWords, setVisibleWords] = useState(4)

	useEffect(() => {
		setEnglishWords(
			shuffleArray(words.map(w => ({ id: w.id, value: w.value })))
		)
		setUzbekWords(
			shuffleArray(words.map(w => ({ id: w.id + 100, value: w.pair })))
		)
	}, [words])

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
				onViewed(first.id) // Mark the first word as viewed
				onViewed(second.id - 100) // Adjust ID for second word
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

	const handleContinue = () => {
		setVisibleWords(prev => prev + 4)
	}

	const resetGame = () => {
		setSelected([])
		setMatchedPairs([])
		setFeedback('')
		setProgress(0)
		setHearts(5)
		setGameOver(false)
		setVisibleWords(4)
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
			className='flex items-center justify-center'
		>
			<div className='w-full lg:max-w-5xl p-0 overflow-hidden shadow-none border-none'>
				<CardContent className='p-3 md:p-6'>
					{gameOver ? (
						<section className='flex flex-col items-center justify-center min-h-[300px]'>
							<h1 className='text-3xl md:text-4xl font-bold text-pink-600 mb-6'>
								Game Over
							</h1>
							<Button variant='secondary' onClick={resetGame}>
								Restart Game
							</Button>
						</section>
					) : (
						<>
							<div className='flex items-center gap-4 mb-6'>
								<Link href={`/dashboard/vocabulary/${slug}`}>
									<X className='h-6 w-6 text-gray-200 hover:text-primary' />
								</Link>
								<Progress value={progress} className='h-3 flex-1 bg-pink-100' />
								<div className='flex items-center space-x-1'>
									<Heart className='h-4 w-4 text-primary' />
									<span className='text-lg'>{hearts}</span>
								</div>
							</div>
							<Badge
								variant='secondary'
								className='text-xs mb-6 font-semibold bg-pink-200 text-pink-700'
							>
								NEW WORD
							</Badge>
							<h1 className='text-2xl md:text-3xl font-bold mb-6 text-start'>
								Tap the matching pairs
							</h1>
							<section className='grid grid-cols-2 md:grid-cols-2 gap-1 mb-2'>
								<Card className='p-4'>
									<h3 className='text-lg md:text-xl font-bold mb-4 hidden md:block'>
										English
									</h3>
									<div className='grid grid-cols-1 gap-2'>
										{englishWords
											.slice(0, visibleWords)
											.map(({ id, value }) => (
												<Button
													key={id}
													variant='outline'
													onClick={() => handleSelect(id, value)}
													disabled={matchedPairs.flat().includes(value)}
													className={cn(
														'border rounded-md text-sm md:text-lg',
														{
															'border-pink-500 text-pink-500':
																selected.some(s => s.id === id) && !feedback,
															'border-gray-200 text-gray-700':
																!selected.some(s => s.id === id) && !feedback,
															'border-green-500 text-green-500':
																selected.some(s => s.id === id) &&
																feedback === 'Excellent!',
														}
													)}
												>
													{value}
												</Button>
											))}
									</div>
								</Card>
								<Card className='p-4'>
									<h3 className='text-lg md:text-xl font-bold mb-4 hidden sm:block'>
										Uzbek
									</h3>
									<div className='grid grid-cols-1 gap-2'>
										{uzbekWords.slice(0, visibleWords).map(({ id, value }) => (
											<Button
												key={id}
												variant='outline'
												onClick={() => handleSelect(id, value)}
												disabled={matchedPairs.flat().includes(value)}
												className={cn('border rounded-md text-sm md:text-lg', {
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
							</section>

							<div className='md:h-20 pt-0 flex flex-col md:flex-row items-center justify-between gap-4'>
								<div className='min-h-[32px] flex items-center'>
									{feedback && (
										<span
											className={`text-lg font-semibold ${
												feedback === 'Try again!'
													? 'text-pink-600'
													: 'text-green-600'
											}`}
										>
											{feedback}
										</span>
									)}
								</div>
								<div className='w-full md:w-auto'>
									{matchedPairs.length === words.length && (
										<Button
											onClick={handleContinue}
											className='w-full text-lg text-white bg-green-500 hover:bg-green-600 font-semibold transition-colors duration-200 border-b-4'
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
