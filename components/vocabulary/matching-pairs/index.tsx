'use client'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { WordPair } from '@/types'
import { motion } from 'framer-motion'
import { Heart, X, Volume2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState, useRef } from 'react'
import { congratulationIconsData } from '@/constants/congratulationIcons'


type WordPairProps = {
	words: WordPair[]
	onViewed: (itemId: number) => void
	slug: string
}

const shuffleArray = <T,>(array: T[]): T[] => {
	return [...array].sort(() => Math.random() - 0.5)
}

// Custom hook for Text-to-Speech (TTS) functionality
const useTTS = () => {
	const handleNormalSpeech = (event: React.MouseEvent, text: string) => {
		event.preventDefault()
		if ('speechSynthesis' in window) {
			const utterance = new SpeechSynthesisUtterance(text)
			utterance.lang = 'en-US'
			window.speechSynthesis.speak(utterance)
		} else {
			alert('Speech synthesis is not supported in this browser.')
		}
	}
	return { handleNormalSpeech }
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
	const [finish, setFinish] = useState(false)
	const [visibleWords, setVisibleWords] = useState(4)

	// Refs for audio
	const successAudioRef = useRef<HTMLAudioElement | null>(null)
	const loseAudioRef = useRef<HTMLAudioElement | null>(null)

	useEffect(() => {
		// Initialize audio refs
		successAudioRef.current = new Audio('/sounds/success.mp3')
		loseAudioRef.current = new Audio('/sounds/lose.mp3')

		// Cleanup audio refs when component unmounts
		return () => {
			successAudioRef.current = null
			loseAudioRef.current = null
		}
	}, [])

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
				successAudioRef.current?.play() // Play success sound
			} else {
				setFeedback('Try again!')
				setHearts(prev => {
					const updatedHearts = prev - 1
					if (updatedHearts === 0) setGameOver(true)
					loseAudioRef.current?.play() // Play lose sound
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

	const { handleNormalSpeech } = useTTS()

	function getRandomIcon() {
		const randomIndex = Math.floor(
			Math.random() * congratulationIconsData.length
		)
		return congratulationIconsData[randomIndex].svgIcon
	}

	const randomIcon = getRandomIcon()

	const handleFinish = () => {
		setFinish(false);
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className=' flex items-center justify-center '
		>
			<div className='w-full max-w-4xl p-0 overflow-hidden shadow-none border-none'>
				<CardContent className='p-3 md:p-6'>
					{gameOver ? (
						<div className=' w-full h-28 absolute bottom-0 left-0 bg-pink-200 flex justify-center items-center'>
							<div className=' w-[90%] sm:w-[70%] flex justify-between items-center'>
								<div className=' flex justify-center items-center gap-3 sm:gap-5'>
									<div className=' w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-full bg-white flex justify-center items-center p-2'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											x='0px'
											y='0px'
											width='48'
											height='48'
											viewBox='0 0 48 48'
										>
											<path
												fill='#ec4899'
												d='M21.5 4.5H26.501V43.5H21.5z'
												transform='rotate(45.001 24 24)'
											></path>
											<path
												fill='#ec4899'
												d='M21.5 4.5H26.5V43.501H21.5z'
												transform='rotate(135.008 24 24)'
											></path>
										</svg>
									</div>
									<span className=' text-2xl sm:text-3xl text-left font-bold text-pink-500'>
										Starting over.
									</span>
								</div>
								<Button
									variant={'secondary'}
									onClick={resetGame}
									className='bg-pink-500 hover:bg-pink-500 text-white px-4 py-2 border-pink-600'
								>
									Restart
								</Button>
							</div>
						</div>
					) : (
						<>
							<section className='flex items-center gap-4 mb-6'>
								<Link href='/dashboard/vocabulary'>
									<X className='h-6 w-6 text-gray-200 hover:text-primary' />
								</Link>
								<Progress value={progress} className='h-3 flex-1 bg-pink-100' />
								<div className='flex items-center space-x-1'>
									<Heart className='h-4 w-4 text-primary' />
									<span className='text-lg'>{hearts}</span>
								</div>
							</section>
							<h1 className='text-2xl md:text-3xl font-bold mb-6 text-start'>
								Tap the matching pairs
							</h1>
							<Button
								variant='ghost'
								size='icon'
								className='h-10 w-10 rounded-lg bg-pink-500 border-b-4 border-pink-600 animate-pulse hover:bg-pink-500'
								onClick={evt =>
									handleNormalSpeech(
										evt,
										selected.length === 1
											? selected[0].value
											: 'Select a word first'
									)
								}
							>
								<Volume2 className='h-5 w-5 text-sky-100' aria-hidden='true' />
							</Button>
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
											className={`text-lg font-semibold ${feedback === 'Try again!'
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
										<div className=' w-full h-28 absolute bottom-0 left-0 bg-green-200 flex justify-center items-center'>
											<div className=' w-[90%] sm:w-[70%] flex justify-between items-center'>
												<div className=' flex justify-center items-center gap-3 sm:gap-5'>
													<div className=' w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-full bg-white flex justify-center items-center p-2'>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															x='0px'
															y='0px'
															width='48'
															height='48'
															viewBox='0 0 48 48'
														>
															<path
																fill='rgba(88,204,2,255)'
																d='M40.6 12.1L17 35.7 7.4 26.1 4.6 29 17 41.3 43.4 14.9z'
																className=' text-duolingoGreen'
															></path>
														</svg>
													</div>
													<span className=' text-2xl sm:text-3xl font-bold text-green-500'>
														Great !
													</span>
												</div>
												<Button
													variant={'secondary'}
													onClick={() => setFinish(true)}
													className='bg-green-500 text-white px-4 py-2'
												>
													Finish
												</Button>
											</div>
										</div>
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