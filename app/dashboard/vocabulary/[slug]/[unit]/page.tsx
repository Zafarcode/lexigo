'use client'

import FillInBlank from '@/components/vocabulary/fill-in-blank'
import Flashcard from '@/components/vocabulary/flash-card'
import MatchingPairs from '@/components/vocabulary/matching-pairs'
import { useProgressStore } from '@/store/use-progress'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface UnitPageProps {
	params: {
		slug: string
		unit: string
	}
}

type FillInBlank = {
	type: 'fillInBlank'
	id: number
	question: string
	correctAnswer: string
	options: string[]
	viewed: boolean
}

type WordPair = {
	type: 'wordPair'
	id: number
	viewed: boolean
	value: string
	pair: string
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

	const flashcards = unit.item.filter(i => i.type === 'flashcard') as {
		id: number
		front_side: string
		back_side: string
		viewed: boolean
	}[]
	const wordPairs: WordPair[] = unit.item
		.filter(i => i.type === 'wordPair')
		.map(i => ({
			id: i.id,
			type: 'wordPair',
			viewed: i.viewed,
			value: i.value,
			pair: i.pair,
		}))

	const fillInBlank: FillInBlank[] = unit.item
		.filter(i => i.type === 'fillInBlank')
		.map(i => i as FillInBlank)

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
								cardData={flashcards}
								onViewed={handleViewed}
								slug={slug}
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

				{/* Render MatchingPairs Component */}
				{wordPairs.length > 0 && (
					<MatchingPairs
						onViewed={handleViewed}
						words={wordPairs}
						slug={slug}
					/>
				)}

				{/* Render FillInBlank Component */}
				{fillInBlank.length > 0 && (
					<FillInBlank
						onViewed={handleViewed}
						questions={fillInBlank}
						slug={slug} // shu yerda slug ni uzating
					/>
				)}
			</div>
		</section>
	)
}
