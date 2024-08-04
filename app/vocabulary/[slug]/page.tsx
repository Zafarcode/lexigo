import { lessons } from '@/constants/lessons'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const UnitDetail = ({ params: { slug } }: { params: { slug: string } }) => {
	const lesson = lessons.find(lesson => lesson.slug === slug)

	return (
		<section className='pt-10'>
			<div className='container'>
				<div className='border rounded-md p-5 space-y-10'>
					<div className='space-y-1.5'>
						{/* Back link */}
						<Link
							href='/vocabulary'
							className='flex items-center gap-2 text-lg font-semibold text-neutral-400 hover:text-primary custom-transition'
						>
							<ArrowLeft /> Back
						</Link>
						<h1 className='text-2xl sm:text-4xl font-bold'>
							{lesson?.lesson_title}
						</h1>
					</div>

					<div className='space-y-5'>
						<h2 className='font-semibold uppercase tracking-wider text-neutral-400'>
							Navigation
						</h2>
						<ul className='space-y-2'>
							{lesson?.unit.map(unit => (
								<li key={unit.id}>
									<Link
										href={`#${unit.slug}`}
										className='font-semibold hover:text-primary hover:underline hover:underline-offset-300 custom-transition'
									>
										{unit.title}: {unit.item.length}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className='space-y-5'>
						<h2 className='font-semibold uppercase tracking-wider text-neutral-400'>
							Units
						</h2>
						<section className='space-y-10'>
							{lesson?.unit.map(unit => (
								<div
									key={unit.id}
									id={unit.slug}
									className='space-y-5 scroll-mt-20'
								>
									<div>
										<h3 className='text-xl sm:text-2xl font-bold'>
											{unit.title}
										</h3>
										<p className='text-neutral-400 font-semibold'>
											({unit.item.length} Terms)
										</p>
									</div>

									<div className='grid grid-cols-1 gap-2 sm:gap-5 lg:grid-cols-2'>
										{lesson.unit.map(unit => (
											<Link
												key={unit.slug}
												href={`/vocabulary/${lesson.slug}/${unit.slug}`}
												className='block space-y-1.5 px-5 py-3 custom-transition border rounded-lg'
											>
												<h4 className='text-lg sm:text-xl font-bold'>
													{unit.title}
												</h4>

												{
													<p className='line-clamp-3 text-neutral-400 font-semibold'>
														{unit.item.length} Terms
													</p>
												}
											</Link>
										))}
									</div>
								</div>
							))}
						</section>
					</div>
				</div>
			</div>
		</section>
	)
}

export default UnitDetail
