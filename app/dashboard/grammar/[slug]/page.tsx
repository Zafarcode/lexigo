import { grammar } from '@/app/source'
import FillInTheBlankGame from '@/components/grammar/fill-in-the-blank'
import { Separator } from '@/components/ui/separator'
import { tense } from '@/constants/grammer'
import { createMetadata } from '@/utils/metadata'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Param {
	slug: string
}

export default function Page({ params }: { params: Param }) {
	const topic = grammar.getPage([params.slug])

	const topics = tense.find(item => item.name === topic?.data.title)

	if (!topic) {
		notFound()
	}

	return (
		<>
			<article className='min-h-screen'>
				<div className='container py-10'>
					<div className='flex flex-col md:flex-row gap-5 justify-end items-start'>
						<Link
							className='mb-5 md:fixed md:top-38 md:left-40'
							href='/dashboard/grammar'
						>
							<span className='whitespace-nowrap hover:text-primary'>
								&#8636; Back
							</span>
						</Link>

						<div className='w-full md:w-[calc(100%-200px)]'>
							<h1 className='text-3xl lg:text-[48px] lg:leading-[56px] font-extrabold text-neonBlue'>
								{topic.data.title}
							</h1>

							<Separator className='my-5' />

							<article className='prose prose-invert'>
								<topic.data.exports.default />
							</article>

							<div className='relative w-full mx-auto pt-10'>
								<div className='relative w-full pb-[56.25%] rounded-lg overflow-hidden'>
									<iframe
										className='absolute top-0 left-0 w-full h-full rounded-lg'
										src={`https://www.youtube.com/embed/${topics?.embed ?? ''}`}
										title='YouTube video player'
										allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
									></iframe>
								</div>
							</div>

							<FillInTheBlankGame questions={topics?.questions ?? []} />
						</div>
					</div>
				</div>
			</article>
		</>
	)
}

export function generateMetadata({ params }: { params: Param }): Metadata {
	const page = grammar.getPage([params.slug])

	if (!page) {
		notFound()
	}

	return createMetadata({
		title: page.data.title,
		description:
			page.data.description ??
			'WordWonders - Unlock Your Language Potential with WordWonders: Where English Learning Becomes an Adventure.',
	})
}

export function generateStaticParams(): Param[] {
	return grammar.getPages().map(page => ({
		slug: page.slugs[0],
	}))
}
