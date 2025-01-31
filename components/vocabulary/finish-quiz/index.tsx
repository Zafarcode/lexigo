'use client'

import { Button } from '@/components/ui/button'
import { Card, CardFooter } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import useTTS from '@/hooks/useTTS'
import { FinishQuizProps } from '@/types'
import { CheckCheck, Heart, X } from 'lucide-react'
import Link from 'next/link'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import Keyboard from './keyboard'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import Celebration from '../celebration'

const FinishQuiz = ({ options, onViewed, slug }: FinishQuizProps) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [lossCount, setLossCount] = useState(5)
	const [progress, setProgress] = useState(0)
	const [gameState, setGameState] = useState<
		'playing' | 'continue' | 'lose' | 'win' | 'end' | 'start'
	>('playing')
	const [inputSpaces, setInputSpaces] = useState<string[]>([])
	const [clickedLetters, setClickedLetters] = useState<Record<string, boolean>>(
		{}
	)
	const [showCongratulations, setShowCongratulations] = useState(false)
	const successAudioRef = useRef<HTMLAudioElement | null>(null)
	const loseAudioRef = useRef<HTMLAudioElement | null>(null)
	const currentWord = options[currentIndex]?.en || ''
	const currentHint = options[currentIndex]?.uz || ''

	const { handleNormalSpeech } = useTTS()

	const initializeWord = useCallback(() => {
		setInputSpaces(Array(currentWord.length).fill('_'))
		setClickedLetters({})
	}, [currentWord])

	const handleWin = useCallback(
		(currentWord: string) => {
			successAudioRef.current?.play()
			const isLastWord = currentIndex === options.length - 1
			onViewed(options[currentIndex].id)
			if (!isLastWord) {
				setCurrentIndex(prev => prev + 1)
				setProgress(((currentIndex + 1) / options.length) * 100)
				setGameState('continue')
			} else {
				setProgress(100)
				setShowCongratulations(true)
				setGameState('win')
				setTimeout(() => setShowCongratulations(false), 3000)
			}
		},
		[currentIndex, options, onViewed]
	)

	const handleLoss = useCallback(() => {
		loseAudioRef.current?.play()
		setLossCount(5)
		setCurrentIndex(0)
		setProgress(0)
		setGameState('lose')
	}, [])

	const handleStart = useCallback(() => {
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
					handleWin(currentWord)
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

	useEffect(() => {
		successAudioRef.current = new Audio('/sounds/success.mp3')
		loseAudioRef.current = new Audio('/sounds/lose.mp3')
		return () => {
			successAudioRef.current = null
			loseAudioRef.current = null
		}
	}, [])

	return (
		<>
		{gameState === 'end' ? (
			<Celebration onOpen={showCongratulations} slug={slug} />
		) : (
			<div className='w-full lg:max-w-5xl mx-auto flex flex-col items-center'>
			{/* Progress */}
			{['playing', 'continue', 'win', 'lose'].includes(gameState) && (
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
						{lossCount > 0 && <span className='text-primary'>{lossCount}</span>}
					</div>
				</div>
			)}
			<Card className='w-full h-[calc(50vh)] sm:h-[450px] min-[320px]:h-full py-2 md:p-4 text-center rounded-2xl border-none flex flex-col justify-center items-center'>
				{gameState === 'playing' && (
					<React.Fragment>
						<div className=' flex justify-center flex-col items-center'>
							<p className='mb-4 text-sm sm:text-lg'>
								<span className='font-bold'>Hint:</span> {currentHint}
							</p>
							<Keyboard
								clickedLetters={clickedLetters}
								currentWord={currentWord}
								inputSpaces={inputSpaces}
								handleLetterClick={handleLetterClick}
								handleNormalSpeech={handleNormalSpeech}
								statusSpeech='hidden'
							/>
						</div>
					</React.Fragment>
				)}

				{gameState === 'continue' && (
					<React.Fragment>
						<Keyboard
							clickedLetters={clickedLetters}
							currentWord={currentWord}
							inputSpaces={inputSpaces}
							handleLetterClick={handleLetterClick}
							handleNormalSpeech={handleNormalSpeech}
							alwaysDisabled={true}
							statusSpeech=''
						/>
						<CardFooter
							className='absolute bottom-0 left-0 right-0 p-0 pb-3 px-3 xl:px-0 md:pb-0 md:h-24 border-t
										bg-green-500/20'
						>
							<div
								className='w-full lg:max-w-5xl mx-auto flex flex-col md:flex-row items-center
											justify-between
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
										className='text-lg font-bold ml-1 text-green-600
													'
									>
										Great !
									</AlertDescription>
								</Alert>
								<Button
									variant={'secondary'}
									className='w-full md:max-w-28 text-lg text-white font-semibold transition-colors duration-200'
									onClick={() => setGameState('playing')}
								>
									Continue
								</Button>
							</div>
						</CardFooter>
					</React.Fragment>
				)}

				{gameState === 'lose' && (
					<React.Fragment>
						<div className=' flex flex-col justify-center items-center'>
							<p className='mb-4 text-sm sm:text-lg text-center'>
								<span className='font-bold'>Hint:</span> {currentHint}
							</p>
							<p className='flex gap-2 text-base sm:text-lg'>
								<span className='font-bold'>This word:</span>{' '}
								{currentWord.toUpperCase()}
							</p>
							<Keyboard
								clickedLetters={clickedLetters}
								currentWord={currentWord}
								inputSpaces={inputSpaces}
								handleLetterClick={handleLetterClick}
								handleNormalSpeech={handleNormalSpeech}
								alwaysDisabled={true}
								statusSpeech=''
							/>
						</div>
						<CardFooter
							className='absolute bottom-0 left-0 right-0 p-0 pb-3 px-3 xl:px-0 md:pb-0 md:h-24 border-t
										bg-primary/20'
						>
							<div
								className='w-full lg:max-w-5xl mx-auto flex flex-col md:flex-row items-center
											justify-between
										'
							>
								<Alert className='w-full flex items-center border-none bg-transparent'>
									<AlertTitle
										className='mb-0 p-2 flex items-center justify-center rounded-full
													bg-pink-600
													'
									>
										<CheckCheck className='h-10 w-10 text-white' />
									</AlertTitle>
									<AlertDescription
										className='text-lg font-bold ml-1 text-pink-600
													'
									>
										You lose!
									</AlertDescription>
								</Alert>
								<Button
									variant={'primary'}
									className='w-full md:max-w-28 text-lg text-white font-semibold transition-colors duration-200'
									onClick={() => setGameState('playing')}
								>
									Restart
								</Button>
							</div>
						</CardFooter>
					</React.Fragment>
				)}

				{gameState === 'win' && (
					<React.Fragment>
						<Keyboard
							clickedLetters={clickedLetters}
							currentWord={currentWord}
							inputSpaces={inputSpaces}
							handleLetterClick={handleLetterClick}
							handleNormalSpeech={handleNormalSpeech}
							alwaysDisabled={true}
							statusSpeech=''
						/>
						<div className=' w-full h-28 absolute bottom-0 left-0 border-t-2 border-gray-300 flex justify-center items-center'>
							<div className=' w-[90%] sm:w-[70%] flex justify-between items-center'>
								<Button
									variant={'secondary'}
									onClick={handleStart}
									className='bg-blue-400 text-white px-4 py-2 border-blue-600'
								>
									Train some more
								</Button>
								<Button
									variant={'secondary'}
									onClick={() => setGameState('end')}
									className='bg-green-500 text-white px-4 py-2'
								>
									Finish
								</Button>
							</div>
						</div>
					</React.Fragment>
				)}
			</Card>
		</div>
		)}
		</>
	)
}

export default FinishQuiz
