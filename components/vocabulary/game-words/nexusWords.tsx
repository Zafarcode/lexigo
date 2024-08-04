import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import useWordGameStore from '@/store/word.game.provider'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import words from './nexus.words'

interface Word {
	word: string
	translation: string
}

const correctSound = '/assets/music/correct.mp3'
const wrongSound = '/assets/music/wrong.mp3'

const shuffleArray = (array: any[]) => array.sort(() => Math.random() - 0.5)

const NexusWords: React.FC = () => {
	const {
		isOver,
		results,
		setResults,
		setShuffledWords,
		setShuffledTranslations,
		setSelectedWord,
		setSelectedTranslation,
		selectedTranslation,
		selectedWord,
		setIsOver,
		shuffledTranslations,
		shuffledWords,
	} = useWordGameStore()

	const correctSoundRef = useRef<HTMLAudioElement>(null)
	const wrongSoundRef = useRef<HTMLAudioElement>(null)

	// Shuffle and set words and translations
	useEffect(() => {
		const selectedWords = shuffleArray([...words]).slice(0, 5)

		const wordsArray = selectedWords.map(({ word, translation }) => ({
			word,
			translation,
		}))
		const translationsArray = wordsArray

		setShuffledWords(shuffleArray([...wordsArray]))
		setShuffledTranslations(shuffleArray([...translationsArray]))
	}, [setShuffledWords, setShuffledTranslations])

	// Check if game is over
	useEffect(() => {
		if (results.length === 5) {
			setIsOver(true)
		}
	}, [results, setIsOver])

	const playSound = useCallback((isCorrect: boolean) => {
		const sound = isCorrect ? correctSoundRef.current : wrongSoundRef.current
		if (sound) {
			sound.play()
		}
	}, [])

	const checkMatch = useCallback(
		(word: Word, translation: Word) => {
			const isCorrect = word.translation === translation.translation
			playSound(isCorrect)
			setResults(prevResults => [
				...prevResults,
				{ word, translation, isCorrect },
			])
			setSelectedWord(null)
			setSelectedTranslation(null)
		},
		[setResults, setSelectedWord, setSelectedTranslation, playSound]
	)

	const handleWordClick = useCallback(
		(word: Word) => {
			setSelectedWord(word)
			if (selectedTranslation) {
				checkMatch(word, selectedTranslation)
			}
		},
		[selectedTranslation, setSelectedWord, checkMatch]
	)

	const handleTranslationClick = useCallback(
		(translation: Word) => {
			setSelectedTranslation(translation)
			if (selectedWord) {
				checkMatch(selectedWord, translation)
			}
		},
		[selectedWord, setSelectedTranslation, checkMatch]
	)

	const renderWordButtons = useMemo(
		() =>
			shuffledWords.slice(0, 5).map((word, index) => {
				const isSelected = selectedWord && selectedWord.word === word.word
				const isCorrect = results.some(
					result => result.word.word === word.word && result.isCorrect
				)
				const isWrong = results.some(
					result => result.word.word === word.word && !result.isCorrect
				)

				return (
					<Button
						variant={'outline'}
						key={index}
						onClick={() => handleWordClick(word)}
						disabled={results.some(result => result.word.word === word.word)}
						className={`p-2 mb-2 border w-full flex px-[15px] dark:text-white dark:bg-[#141414] items-center h-[55px] rounded-[15px] disabled:opacity-100
						${isSelected ? 'border-2 border-black dark:border-white' : ''}
						${
							isCorrect
								? 'bg-[#58cc02] dark:bg-[#58cc02] text-white'
								: isWrong
								? 'bg-red-700 dark:bg-red-700 text-white'
								: 'bg-white dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-[#1F1F1F]'
						}
					`}
					>
						<p>{word.word}</p>
					</Button>
				)
			}),
		[shuffledWords, results, selectedWord, handleWordClick]
	)

	const renderTranslationButtons = useMemo(
		() =>
			shuffledTranslations.slice(0, 5).map((translation, index) => {
				const isSelected =
					selectedTranslation &&
					selectedTranslation.translation === translation.translation
				const isCorrect = results.some(
					result =>
						result.translation.translation === translation.translation &&
						result.isCorrect
				)
				const isWrong = results.some(
					result =>
						result.translation.translation === translation.translation &&
						!result.isCorrect
				)

				return (
					<Button
						variant={'outline'}
						key={index}
						onClick={() => handleTranslationClick(translation)}
						disabled={results.some(
							result =>
								result.translation.translation === translation.translation
						)}
						className={`p-2 mb-2 border w-full flex px-[15px] dark:text-white dark:bg-[#141414] items-center h-[55px] rounded-[15px] disabled:opacity-100
						${isSelected ? 'border-2 border-black dark:border-white' : ''}
						${
							isCorrect
								? 'bg-[#58cc02] dark:bg-[#58cc02] text-white'
								: isWrong
								? 'bg-red-700 dark:bg-red-700 text-white'
								: 'bg-white dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-[#1F1F1F]'
						}
					`}
					>
						<p>{translation.translation}</p>
					</Button>
				)
			}),
		[shuffledTranslations, results, selectedTranslation, handleTranslationClick]
	)

	return (
		<div className='w-full flex flex-col items-center'>
			<div className='w-full'>
				<h2 className='text-[22px] font-bold'>Bir xil so’zlarni tanlang</h2>
				<p
					className='ml-0 text-gray-800 dark:text-gray-200'
					style={{ margin: 0 }}
				>
					So’zning inglizcha hamda o’zbekcha holatini birdaniga bosing
				</p>
				<div className='w-full flex gap-2'>
					<div className='w-full'>{renderWordButtons}</div>
					<div className='w-full'>{renderTranslationButtons}</div>
				</div>
			</div>
			<Dialog open={isOver} onOpenChange={() => setIsOver(false)}>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Game Over</DialogTitle>
						<DialogDescription>
							<p>
								You scored{' '}
								<span className='font-bold text-green-500'>
									{results.filter(result => result.isCorrect).length}
								</span>{' '}
								out of{' '}
								<span className='dark:text-white text-black'>
									{results.length}
								</span>{' '}
								correct answers.
							</p>
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className=''>
						<Link href='/vocabulary' onClick={() => setIsOver(false)}>
							Try Again
						</Link>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<div className='mt-8'>
				<p className='text-lg font-semibold'>
					{isOver ? 'Game Over! All words matched' : 'Keep matching the words!'}
				</p>
			</div>
			<audio ref={correctSoundRef} src={correctSound} />
			<audio ref={wrongSoundRef} src={wrongSound} />
		</div>
	)
}

export default NexusWords
