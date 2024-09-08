'use client'
import { buttonVariants } from '@/components/ui/button'
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { lessons } from '@/constants/lessons'
import { cn } from '@/lib/utils'
import { Power } from 'lucide-react'
import Link from 'next/link'

const Vocabulary = () => {
	return (
		<section>
			<div className='container'>
				<h1 className='text-2xl lg:text-[40px] lg:leading-[48px] font-bold text-center'>
					Vocabulary
				</h1>

				<ul className='grid grid-cols-1 md:grid-cols-2 gap-3'>
					{lessons.map(lesson => (
						<li key={lesson.id}>
							<Card className='hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800'>
								<CardHeader>
									<div className='flex items-center justify-between'>
										<CardTitle>English Module {lesson.id}</CardTitle>

										<Link
											className={cn(
												buttonVariants({
													variant: 'default',
													size: 'icon',
												}),
												'flex md:hidden'
											)}
											href={`/vocabulary/${lesson.slug}`}
										>
											<Power />
										</Link>
									</div>

									<div className='flex justify-between items-center'>
										<CardDescription>
											A Beginner course in elementary English. (Lessons 1-30)
										</CardDescription>

										<Link
											className={cn(
												buttonVariants({
													variant: 'default',
													size: 'icon',
												}),
												'hidden md:flex'
											)}
											href={`/vocabulary/${lesson.slug}`}
										>
											<Power />
										</Link>
									</div>
								</CardHeader>
							</Card>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}

export default Vocabulary
