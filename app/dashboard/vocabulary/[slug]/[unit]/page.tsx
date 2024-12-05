'use client'

import Flashcard from '@/components/vocabulary/flash-card'
import { useProgressStore } from '@/store/use-progress'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface FlashcardPageProps {
	params: {
		slug: string
		unit: string
	}
}

export default function FlashcardPage({ params }: FlashcardPageProps) {
	const { slug, unit: unitSlug } = params
	const { sections, updateItemStatus } =
		useProgressStore()
	const section = sections.find(s => s.slug === slug)
	const unit = section?.units.find((u: { slug: string }) => u.slug === unitSlug)

	if (!section || !unit) {
		return <div>Unit not found</div>
	}

	const handleViewed = (itemId: number) => {
		updateItemStatus(slug, unitSlug, itemId)
	}

	return (
		<section className='pt-10'>
			<div className='container'>
				<div className='w-full rounded-lg border p-4 lg:p-6'>
					<div className='mb-12 space-y-5'>
						<div className='space-y-1.5'>
							<Link
								href={`/dashboard/vocabulary/${section.slug}`}
								className='flex items-center gap-2 text-lg font-semibold text-neutral-400 hover:text-primary custom-transition'
							>
								<ArrowLeft /> Back
							</Link>
							<h1 className='text-2xl sm:text-4xl font-bold'>{unit.title}</h1>
						</div>

						<Flashcard
							cardData={unit.item}
							onViewed={handleViewed}
						/>
					</div>

					{!unit.isLocked && (
						<section className='space-y-5'>
							<h2 className='text-xl font-bold'>
								Terms in this set ({unit.item.length})
							</h2>
							<ul className='space-y-2'>
								{unit.item.map((item: { front_side: string; back_side: string }, i: number) => (
									<li
										key={`${unit.slug}-${i}`}
										className='grid sm:grid-cols-2 items-center gap-4 rounded-lg border p-4 lg:p-6'
									>
										<div className='text-2xl'>{item.front_side}</div>
										<div className='text-lg'>{item.back_side}</div>
									</li>
								))}
							</ul>
						</section>
					)}
				</div>
			</div>
		</section>
	)
}
