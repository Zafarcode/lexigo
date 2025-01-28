'use client'
import React, { useEffect, useState, useCallback, useRef, MouseEvent } from 'react'
import { Card } from '@/components/ui/card'
import { Heart, X, Volume2 } from 'lucide-react'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { FinishQuiz as FinishQuizType } from '@/types'
import CelebrationDialog from '../celebration-dialog'
import useTTS from '@/hooks/useTTS'
import Image from 'next/image'
import { congratulationIconsData } from '@/constants/congratulationIcons'

type FinishQuizProps = {
	options: FinishQuizType[]
	onViewed: (itemId: number) => void
	slug: string
}

const FinishQuiz = ({ options, onViewed, slug }: FinishQuizProps) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [lossCount, setLossCount] = useState(5)
	const [progress, setProgress] = useState(0)
	const [gameState, setGameState] = useState<'playing' | 'continue' | 'lose' | 'win' | 'end' | 'start'>('playing')
	const [inputSpaces, setInputSpaces] = useState<string[]>([])
	const [clickedLetters, setClickedLetters] = useState<Record<string, boolean>>({})
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

	const handleWin = useCallback((currentWord: string) => {
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
	}, [currentIndex, options, onViewed,])

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

	function getRandomIcon() {
		const randomIndex = Math.floor(Math.random() * congratulationIconsData.length);
		return congratulationIconsData[randomIndex].svgIcon;
	}
	
	const randomIcon = getRandomIcon();

	return (
		<div className='w-full lg:max-w-5xl mx-auto flex flex-col items-center gap-5 p-3 sm:p-5'>
			<CelebrationDialog isOpen={showCongratulations} onClose={() => setShowCongratulations(false)} />

			<Card className='w-full h-[calc(50vh)] sm:h-[450px] min-[320px]:h-[250px] p-0 md:p-4 text-center rounded-2xl border-none flex flex-col justify-center items-center'>
				{gameState === 'playing' && (
					<React.Fragment>
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
						<div className=' flex justify-center flex-col items-center'>
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
												className={`rounded-md px-2 py-2 text-xs sm:text-sm ${clickedLetters[letter]
													? currentWord.toUpperCase().includes(letter)
														? 'bg-green-500 text-white'
														: 'bg-pink-500 text-white'
													: ''
													}`}
											>
												{letter}
											</Button>
										))}
									</li>
								))}
							</ul>
						</div>
					</React.Fragment>
				)}

				{gameState === 'continue' && (
					<React.Fragment>
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
						<div className=' flex flex-col justify-center items-center'>
							<div className=' flex flex-col justify-center gap-2 items-center'>
								<Button
									variant='ghost'
									size='icon'
									className='h-10 w-10 rounded-lg bg-pink-500 border-b-4 border-pink-600 animate-pulse hover:bg-pink-500'
									onClick={evt =>
										handleNormalSpeech(evt, currentWord)
									}
								>
									<Volume2
										className='h-5 w-5 text-sky-100'
										aria-hidden='true'
									/>
								</Button>
								<p className='flex gap-2 text-base sm:text-lg'>
									{inputSpaces.map((char, idx) => (
										<span key={idx}>{char}</span>
									))}
								</p>
							</div>
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
												disabled={true}
												className={`rounded-md px-2 py-2 text-xs sm:text-sm ${clickedLetters[letter]
													? currentWord.toUpperCase().includes(letter)
														? 'bg-green-500 text-white'
														: 'bg-pink-500 text-white'
													: ''
													}`}
											>
												{letter}
											</Button>
										))}
									</li>
								))}
							</ul>
						</div>
						<div className=' w-full h-28 absolute bottom-0 left-0 bg-duolingoBgGreen flex justify-center items-center'>
							<div className=' w-[70%] flex justify-between items-center'>
								<div className=' flex justify-center items-center gap-5'>
									<div className=' w-[60px] h-[60px] rounded-full bg-white flex justify-center items-center p-2'>
										<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
											<path fill="rgba(88,204,2,255)" d="M40.6 12.1L17 35.7 7.4 26.1 4.6 29 17 41.3 43.4 14.9z" className=' text-duolingoGreen'></path>
										</svg>
									</div>
									<span className=' text-3xl font-bold text-duolingoGreen'>
										Great !
									</span>
								</div>
								<Button
									onClick={() => setGameState('playing')}
									className='bg-duolingoGreen hover:bg-green-500 text-white px-4 py-2 border-green-600'
								>
									Continue
								</Button>
							</div>
						</div>
					</React.Fragment>
				)}

				{gameState === 'lose' && (
					<React.Fragment>
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
						<div className=' flex flex-col justify-center items-center'>
							<p className='mb-4 text-sm sm:text-lg text-center'>
								<span className='font-bold'>Hint:</span> {currentHint}
							</p>
							<p className='flex gap-2 text-base sm:text-lg'>
								<span className='font-bold'>This word:</span> {currentWord.toUpperCase()}
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
												disabled={true}
												className={`rounded-md px-2 py-2 text-xs sm:text-sm ${clickedLetters[letter]
													? currentWord.toUpperCase().includes(letter)
														? 'bg-green-500 text-white'
														: 'bg-pink-500 text-white'
													: ''
													}`}
											>
												{letter}
											</Button>
										))}
									</li>
								))}
							</ul>
						</div>
						<div className=' w-full h-28 absolute bottom-0 left-0 bg-duolingoBgRed flex justify-center items-center'>
							<div className=' w-[70%] flex justify-between items-center'>
								<div className=' flex justify-center items-center gap-5'>
									<div className=' w-[60px] h-[60px] rounded-full bg-white flex justify-center items-center p-2'>
										<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
											<path fill="#ec4899" d="M21.5 4.5H26.501V43.5H21.5z" transform="rotate(45.001 24 24)"></path><path fill="#ec4899" d="M21.5 4.5H26.5V43.501H21.5z" transform="rotate(135.008 24 24)"></path>
										</svg>
									</div>
									<span className=' text-3xl text-left font-bold text-pink-500'>
										You have run out of hearts! <br /> Starting over.
									</span>
								</div>
								<Button
									onClick={() => setGameState('playing')}
									className='bg-pink-500 hover:bg-pink-500 text-white px-4 py-2 border-pink-700'
								>
									Restart
								</Button>
							</div>
						</div>
					</React.Fragment>
				)}

				{gameState === 'win' && (
					<React.Fragment>
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

						<div className=' flex flex-col justify-center items-center'>
							<div className=' flex flex-col justify-center gap-2 items-center'>
								<Button
									variant='ghost'
									size='icon'
									className='h-10 w-10 rounded-lg bg-pink-500 border-b-4 border-pink-600 animate-pulse hover:bg-pink-500'
									onClick={evt =>
										handleNormalSpeech(evt, currentWord)
									}
								>
									<Volume2
										className='h-5 w-5 text-sky-100'
										aria-hidden='true'
									/>
								</Button>
								<p className='flex gap-2 text-base sm:text-lg'>
									{inputSpaces.map((char, idx) => (
										<span key={idx}>{char}</span>
									))}
								</p>
							</div>
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
												disabled={true}
												className={`rounded-md px-2 py-2 text-xs sm:text-sm ${clickedLetters[letter]
													? currentWord.toUpperCase().includes(letter)
														? 'bg-duolingoGreen text-white'
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
						</div>

						<div className=' w-full h-28 absolute bottom-0 left-0 border-t-2 border-gray-300 flex justify-center items-center'>
							<div className=' w-[70%] flex justify-between items-center'>
								<Button
									onClick={handleStart}
									className='bg-blue-400 hover:bg-blue-400 text-white px-4 py-2 border-blue-600'
								>
									Train some more
								</Button>
								<Button
									onClick={() => setGameState('end')}
									className='bg-green-500 hover:bg-green-500 text-white px-4 py-2 border-green-600'
								>
									Finish
								</Button>
							</div>
						</div>
					</React.Fragment>
				)}

				{gameState === 'end' && (
					// Finish component
					<React.Fragment>
						<div className=' flex justify-center items-center gap-5 flex-col'>
							<div className=' w-full'>
								<Image src={randomIcon} alt='congratulation' width={200} height={50} className=' object-contain mx-auto' />
							</div>
							<div className='  flex justify-center items-center gap-5 flex-col'>
								<p className=' text-3xl font-semibold text-[#f00050]'>History is complete!</p>
								<div className=' flex justify-center items-center gap-3'>
									<div className=' w-[200px] p-1 bg-yellow-500 flex flex-col justify-center items-center gap-3 rounded-xl'>
										<p className=' text-white font-medium'>Experience points</p>
										<div className=' flex justify-center items-center gap-1 bg-white w-full h-full rounded-xl py-5'>
											<div className=' w-[30px] overflow-hidden'>
												<Image src={'https://d35aaqx5ub95lt.cloudfront.net/images/icons/f5358b2d4087a109790fc809eedc08c5.svg'} alt='pointIcon' width={20} height={20} className=' object-contain' />
											</div>
											<p className=' font-semibold text-lg text-yellow-500'>5</p>
										</div>
									</div>
									<div className=' w-[200px] p-1 bg-green-500 flex flex-col justify-center items-center gap-3 rounded-xl'>
										<p className=' text-white font-medium'>Great</p>
										<div className=' flex justify-center items-center gap-2 bg-white w-full h-full rounded-xl py-5'>
											<div className=' w-[30px] overflow-hidden'>
												<Image src={'https://d35aaqx5ub95lt.cloudfront.net/images/icons/9ace13520a375f5661415ff7d470f243.svg'} alt='pointIcon' width={30} height={30} className=' object-contain' />
											</div>
											<p className=' font-semibold text-lg text-green-500'>100 %</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className=' w-full h-28 absolute bottom-0 left-0 border-t-2 border-gray-300 flex justify-center items-center'>
							<div className=' w-[70%] flex justify-end items-center'>
								<Link href={'/dashboard/vocabulary/basic-vocabulary'}>
									<Button
										className='bg-green-500 hover:bg-green-500 text-white px-4 py-2 border-green-600'
									>
										Continue
									</Button>
								</Link>
							</div>
						</div>
					</React.Fragment>
				)}
			</Card>
		</div>
	)
}

export default FinishQuiz