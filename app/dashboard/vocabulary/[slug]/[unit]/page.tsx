'use client'

import FillInBlank from '@/components/vocabulary/fill-in-blank'
import FinishQuiz from '@/components/vocabulary/finish-quiz'
import Flashcard from '@/components/vocabulary/flash-card'
import MatchingPairs from '@/components/vocabulary/matching-pairs'
import WordImage from '@/components/vocabulary/word-image'
import { useProgressStore } from '@/store/use-progress'
import Link from 'next/link'

interface UnitPageProps {
	params: {
		slug: string
		unit: string
	}
}

export default function UnitPage({ params }: UnitPageProps) {
	const { slug, unit: unitSlug } = params
	const { sections, updateItemStatus } = useProgressStore()
	const section = sections.find(s => s.slug === slug)
	const unit = section?.units.find(u => u.slug === unitSlug)

	if (!section || !unit) {
		return (
			<section className='pt-10'>
				<div className='container'>
					<div className='text-center'>
						<p className='text-xl text-red-500'>Unit not found</p>
						<Link
							href='/dashboard/vocabulary'
							className='text-blue-500 hover:underline'
						>
							Go back to Vocabulary Dashboard
						</Link>
					</div>
				</div>
			</section>
		)
	}

	const handleViewed = (itemId: number) => {
		updateItemStatus(slug, unitSlug, itemId)
	}

	const flashcards = unit.item.filter(i => i.type === 'flashcard')
	const imageSelections = unit.item.filter(i => i.type === 'imageSelection')
	const finishQuiz = unit.item.filter(i => i.type === 'finishQuiz')
	const wordPairs = unit.item.filter(i => i.type === 'wordPair')
	const fillInBlank = unit.item.filter(i => i.type === 'fillInBlank')

	return (
		<section className='pt-5'>
				{/* Render Flashcard Component */}
				{flashcards.length > 0 && (
					<Flashcard
						onViewed={handleViewed}
						cardData={flashcards} // Pass only flashcards
						slug={slug}
					/>
				)}

				{/* Render WordImage Component */}
				{imageSelections.length > 0 && (
					<WordImage
						onViewed={handleViewed}
						slug={section.slug}
						quizData={imageSelections} // Pass only image selections
					/>
				)}

				{/* Render FinishQuiz Component */}
				{finishQuiz.length > 0 && (
					<FinishQuiz
						onViewed={handleViewed}
						slug={section.slug}
						options={finishQuiz} // Pass only translations
					/>
				)}

				{/* Render MatchingPairs Component */}
				{wordPairs.length > 0 && (
					<MatchingPairs
						onViewed={handleViewed}
						slug={section.slug}
						words={wordPairs} // Pass only word pairs
					/>
				)}

				{/* Render FillInBlank Component */}
				{fillInBlank.length > 0 && (
					<FillInBlank
						onViewed={handleViewed}
						slug={section.slug}
						questions={fillInBlank} // Pass only fill-in-blank questions
					/>
				)}
		</section>
	)
}
