'use client'
import Nexus from '@/components/vocabulary/game-words/nexus'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { SparklesIcon } from '@/components/utils/icons'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { lessons } from '@/constants/lessons'
import { Power } from 'lucide-react'
import Module from '@/components/vocabulary/game-words/module'

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

				<Nexus/>
				<Module/>
			</div>
		</section>
	)
}

export default Vocabulary
