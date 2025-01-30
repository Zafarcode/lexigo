'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { WordPair } from '@/types'
import { motion } from 'framer-motion'
import { CheckCheck, Heart, X } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Celebration from '../celebration'
import { cn } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useIsMobile } from '@/hooks/use-mobile'

type MatchingPairsProps = {
	words: WordPair[]
	onViewed: (itemId: number) => void
	slug: string
}

const shuffleArray = <T,>(array: T[]): T[] => {
	return [...array].sort(() => Math.random() - 0.5)
}

const MatchingPairs = ({ words, onViewed, slug }: MatchingPairsProps) => {
	const isMobile = useIsMobile()
	const [selected, setSelected] = useState<{ id: number; value: string }[]>([])
	const [matchedPairs, setMatchedPairs] = useState<string[][]>([])
	const [progress, setProgress] = useState(0)
	const [showCongratulations, setShowCongratulations] = useState(false)
	const [hearts, setHearts] = useState(5)
	const [wordIndex, setWordIndex] = useState(0)

	const wordsPerRound = isMobile ? 4 : 5

	const getCurrentWords = React.useCallback(() => {
		return words.slice(wordIndex, wordIndex + wordsPerRound)
	}, [wordIndex, wordsPerRound, words])

	const [englishWords, setEnglishWords] = useState<
		{ id: number; value: string }[]
	>([])
	const [uzbekWords, setUzbekWords] = useState<{ id: number; value: string }[]>(
		[]
	)

	useEffect(() => {
		const currentWords = getCurrentWords()
		setEnglishWords(
			shuffleArray(currentWords.map(w => ({ id: w.id, value: w.value })))
		)
		setUzbekWords(
			shuffleArray(currentWords.map(w => ({ id: w.id + 100, value: w.pair })))
		)
	}, [getCurrentWords, wordIndex])

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
				setProgress(((matchedPairs.length + 1) / words.length) * 100)
				onViewed(first.id)
				onViewed(second.id)
			} else {
				setHearts(prev => prev - 1)
			}
			setSelected([])
		}
	}

	const handleContinue = () => {
		if (matchedPairs.length >= wordIndex + wordsPerRound) {
			setWordIndex(prev => prev + wordsPerRound)
		}
		if (matchedPairs.length === words.length) {
			setShowCongratulations(true)
		}
	}

	return (
		<>
			{showCongratulations ? (
				<Celebration onOpen={showCongratulations} slug={slug} />
			) : (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					<Card className='w-full lg:max-w-5xl mx-auto p-0 overflow-hidden shadow-none border-none'>
						<div className='flex flex-row items-center gap-2 w-full px-3 xl:px-0 lg:max-w-5xl mx-auto'>
							<div className='flex items-center gap-2'>
								<Link
									href={`/dashboard/vocabulary/${slug}`}
									aria-label='Go back to vocabulary page'
								>
									<X className='h-6 w-6 text-gray-200 hover:text-primary hover:text-gray-400 transition-all' />
								</Link>
							</div>

							<Progress
								value={progress}
								className={cn('h-3 bg-pink-100', {
									'bg-pink-200': progress > 0,
								})}
								aria-label={`Quiz progress: ${progress}%`}
							/>

							<div className='flex items-center justify-end space-x-1'>
								<Heart
									className='h-4 w-4 fill-primary text-primary'
									aria-hidden='true'
								/>
								{hearts > 0 && <span className='text-primary'>{hearts}</span>}
							</div>
						</div>
						<CardContent className='p-3 md:p-6 max-w-2xl mx-auto md:pt-10 mb-20'>
							<h1 className='text-2xl md:text-3xl font-bold mb-6 text-start text-gray-800 dark:text-white'>
								Tap the matching pairs
							</h1>
							<section className='grid grid-cols-2 gap-1 mb-2'>
								{[englishWords, uzbekWords].map((wordList, idx) => (
									<Card key={idx} className='p-0 border-none'>
										<div className='grid grid-cols-1 gap-2'>
											{wordList.map(({ id, value }) => (
												<Button
													key={id}
													variant={
														selected.some(s => s.id === id)
															? 'secondary'
															: 'primary'
													}
													onClick={() => handleSelect(id, value)}
													disabled={matchedPairs.flat().includes(value)}
												>
													{value}
												</Button>
											))}
										</div>
									</Card>
								))}
							</section>
						</CardContent>
						{matchedPairs.length >= wordIndex + wordsPerRound && (
							<CardFooter
								className={`flex items-center  bg-green-500/20 absolute bottom-0 left-0 right-0  p-0 pb-3 px-3 xl:px-0 md:pb-0 md:h-24 border-t`}
							>
								<div
									className='w-full lg:max-w-5xl mx-auto flex flex-col md:flex-row items-center
							justify-end
							'
								>
									<Alert className='w-full flex items-center border-none bg-transparent'>
										<AlertTitle
											className='mb-0 p-2 flex items-center justify-center rounded-full
												bg-green-600
											'
										>
												<CheckCheck className='h-10 w-10 text-white' />
										</AlertTitle>
										<AlertDescription
											className='text-lg font-bold ml-1 text-green-600'
										>
											Amazing! You&apos;ve matched all pairs
										</AlertDescription>
									</Alert>

									<Button className='w-full md:w-auto' variant='secondary' onClick={handleContinue}>
										Continue
									</Button>
								</div>
							</CardFooter>
						)}
					</Card>
				</motion.div>
			)}
		</>
	)
}

export default MatchingPairs
