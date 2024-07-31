import { Card } from '@/components/ui/card'
import { useQuizStore } from '@/store/word.quiz.provider'
import React, { useEffect, useState } from 'react'

const MatchingPairsQuiz: React.FC = () => {
	const {
		pairs,
		selected,
		correctPairs,
		setPairs,
		selectPair,
		resetSelection,
		addCorrectPair,
	} = useQuizStore()
	const [isMatchCorrect, setIsMatchCorrect] = useState<boolean | null>(null)
	const [incorrectPairs, setIncorrectPairs] = useState<Set<number>>(new Set())

	useEffect(() => {
		// Set initial pairs of words and their matches
		setPairs([
			{ id: 2, word: 'Cat', match: 'Кошка' },
			{ id: 3, word: 'Cow', match: 'Корова' },
			{ id: 4, word: 'Elephant', match: 'Слон' },
			{ id: 5, word: 'Horse', match: 'Лошадь' },
			{ id: 6, word: 'Turtle', match: 'Черепаха' },
			{ id: 7, word: 'Snake', match: 'Змея' },
			{ id: 8, word: 'Fish', match: 'Рыба' },
			{ id: 9, word: 'Bird', match: 'Птица' },
			{ id: 10, word: 'Rabbit', match: 'Кролик' },
		])
	}, [setPairs])

	const handleWordCardClick = (id: number) => {
		if (incorrectPairs.has(id) || correctPairs.has(id)) return
		selectPair(id, 'word')
		if (selected.length === 1) {
			checkMatch(id, 'word')
		}
	}

	const handleMatchCardClick = (id: number) => {
		if (incorrectPairs.has(id) || correctPairs.has(id)) return
		selectPair(id, 'match')
		if (selected.length === 1) {
			checkMatch(id, 'match')
		}
	}

	const checkMatch = (id: number, type: 'word' | 'match') => {
		const firstSelected = pairs.find(pair => pair.id === selected[0].id)
		const secondSelected = pairs.find(pair => pair.id === id)

		if (firstSelected && secondSelected) {
			if (
				(selected[0].type === 'word' &&
					type === 'match' &&
					firstSelected.match === secondSelected.match) ||
				(selected[0].type === 'match' &&
					type === 'word' &&
					firstSelected.word === secondSelected.word)
			) {
				// Match found
				setIsMatchCorrect(true)
				addCorrectPair(firstSelected.id)
				setTimeout(() => {
					resetSelection()
					setIsMatchCorrect(null)
				}, 1000)
			} else {
				// No match
				setIsMatchCorrect(false)
				setIncorrectPairs(
					prevIncorrectPairs =>
						new Set(prevIncorrectPairs.add(firstSelected.id))
				)
				setTimeout(() => {
					resetSelection()
					setIsMatchCorrect(null)
				}, 1000)
			}
		}
	}

	return (
		<div className='grid grid-cols-2 gap-4'>
			{pairs.map(pair => (
				<React.Fragment key={pair.id}>
					<Card
						className={`p-4 text-center cursor-pointer ${
							selected.some(s => s.id === pair.id && s.type === 'word')
								? 'bg-blue-500 text-white'
								: ''
						} ${
							correctPairs.has(pair.id)
								? 'border-green-500 bg-green-100'
								: incorrectPairs.has(pair.id)
								? 'border-red-500 bg-red-100'
								: isMatchCorrect === false &&
								  selected.some(s => s.id === pair.id && s.type === 'word')
								? 'border-red-500 bg-red-100'
								: ''
						}`}
						onClick={() => handleWordCardClick(pair.id)}
					>
						{pair.word}
					</Card>
					<Card
						className={`p-4 text-center cursor-pointer ${
							selected.some(s => s.id === pair.id && s.type === 'match')
								? 'bg-blue-500 text-white'
								: ''
						} ${
							correctPairs.has(pair.id)
								? 'border-green-500 bg-green-100'
								: incorrectPairs.has(pair.id)
								? 'border-red-500 bg-red-100'
								: isMatchCorrect === false &&
								  selected.some(s => s.id === pair.id && s.type === 'match')
								? 'border-red-500 bg-red-100'
								: ''
						}`}
						onClick={() => handleMatchCardClick(pair.id)}
					>
						{pair.match}
					</Card>
				</React.Fragment>
			))}
		</div>
	)
}

export default MatchingPairsQuiz
