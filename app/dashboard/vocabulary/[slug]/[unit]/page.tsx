import Flashcard from '@/components/vocabulary/flash-card'
import { lessons } from '@/constants/lessons'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface FlashcardPageProps {
	params: {
		slug: string
		unit: string
	}
}

export default function FlashcardPage({ params }: FlashcardPageProps) {
	const { slug, unit: unitParam } = params
	const lesson = lessons.find(lesson => lesson.slug === slug)

	if (!lesson) {
		return <div>Lesson not found</div>
	}

	const unitData = lesson.unit.find(unit => unit.slug === unitParam)

	if (!unitData) {
		return <div>Unit not found</div>
	}

	return (
		<section className='pt-10'>
			<div className='container'>
				<div className='w-full rounded-lg border p-4 lg:p-6'>
					<div className='mb-12 space-y-5'>
						<div className='space-y-1.5'>
							{/* Back link */}
							<Link
								href={`/vocabulary/${lesson.slug}`}
								className='flex items-center gap-2 text-lg font-semibold text-neutral-400 hover:text-primary custom-transition'
							>
								<ArrowLeft /> Back
							</Link>
							<h1 className='text-2xl sm:text-4xl font-bold'>
								{lesson.unit[0].title}
							</h1>
						</div>

						{/* Flashcard Component */}
						<Flashcard cardData={unitData.item} />
					</div>

					<section className='space-y-5'>
						<h2 className='text-xl font-bold'>
							Terms in this set ({unitData.item.length})
						</h2>
						<ul className='space-y-2'>
							{unitData.item.map((item, i) => (
								<li
									key={`${unitData.slug}-${i}`}
									className='grid sm:grid-cols-2 items-center gap-4 rounded-lg border p-4 lg:p-6'
								>
									<div className='text-2xl'>{item.front_side}</div>
									<div className='text-lg'>{item.back_side}</div>
								</li>
							))}
						</ul>
					</section>
				</div>
			</div>
		</section>
	)
}
