'use client'

import FillInBlank from '@/components/vocabulary/fill-in-blank'
import FinishQuiz from '@/components/vocabulary/finish-quiz'
import Flashcard from '@/components/vocabulary/flash-card'
import MatchingPairs from '@/components/vocabulary/matching-pairs'
import WordImage from '@/components/vocabulary/word-image'
import { useProgressStore } from '@/store/use-progress'
import { ArrowLeft } from 'lucide-react'
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
		<section className='pt-10'>
			<div className='container'>
				
				{/* Render Flashcard Component */}
				{flashcards.length > 0 && (
					<div className='w-full rounded-lg border p-4 lg:p-6'>
						<div className='mb-12 space-y-5'>
							<div className='space-y-1.5'>
								<Link
									href={`/dashboard/vocabulary/${section.slug}`}
									className='flex items-center gap-2 text-lg font-semibold text-neutral-400 hover:text-primary custom-transition'
									aria-label={`Back to ${section.title}`}
								>
									<ArrowLeft /> Back
								</Link>
								<h1 className='text-2xl sm:text-4xl font-bold'>{unit.title}</h1>
							</div>

							<Flashcard
								onViewed={handleViewed}
								cardData={flashcards} // Pass only flashcards
							/>

							<section className='space-y-5'>
								<h2 className='text-xl font-bold'>
									Terms in this set ({unit.item.length})
								</h2>
								<ul className='space-y-2'>
									{unit.item.map((item, index) => (
										<li
											key={index}
											className='grid sm:grid-cols-2 justify-between items-center gap-4 rounded-lg border p-4 lg:p-6'
										>
											{item.type === 'flashcard' && (
												<>
													<div className='text-2xl'>{item.front_side}</div>
													<div className='text-lg'>{item.back_side}</div>
												</>
											)}
										</li>
									))}
								</ul>
							</section>
						</div>
					</div>
				)}

				{/* Render WordImage Component */}
				{imageSelections.length > 0 && (
					<WordImage
						onViewed={handleViewed}
						quizData={imageSelections} // Pass only image selections
					/>
				)}

				{/* Render FinishQuiz Component */}
				{finishQuiz.length > 0 && (
					<FinishQuiz
						onViewed={handleViewed}
						options={finishQuiz} // Pass only translations
					/>
				)}

				{/* Render MatchingPairs Component */}
				{wordPairs.length > 0 && (
					<MatchingPairs
						onViewed={handleViewed}
						words={wordPairs} // Pass only word pairs
					/>
				)}

				{/* Render FillInBlank Component */}
				{fillInBlank.length > 0 && (
					<FillInBlank
						onViewed={handleViewed}
						questions={fillInBlank} // Pass only fill-in-blank questions
					/>
				)}
			</div>
		</section>
	)
}
