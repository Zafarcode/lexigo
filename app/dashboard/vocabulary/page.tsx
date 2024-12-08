'use client'

import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { LogoIcon } from '@/components/utils/icons'
import MatchingPairs from '@/components/vocabulary/matching-pairs'
import WordImage from '@/components/vocabulary/word-image'
import { cn } from '@/lib/utils'
import { useProgressStore } from '@/store/use-progress'
import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import Link from 'next/link'

const Vocabulary = () => {
	const { sections } = useProgressStore()

	return (
		<section className='py-12'>
			<div className='container'>
				<h1 className='text-2xl lg:text-[40px] lg:leading-[48px] font-bold text-center mb-12'>
					Vocabulary
				</h1>

				<ul className='max-w-4xl mx-auto space-y-8'>
					{sections.map((section, index) => {
						const completedUnits = section.units.filter(
							(u: { isCompleted: any }) => u.isCompleted
						).length
						const totalUnits = section.units.length
						const progress = (completedUnits / totalUnits) * 100

						return (
							<motion.li
								key={section.id}
								initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 50 }}
								animate={{ opacity: 1, x: 0, y: 0 }}
								transition={{ delay: index * 0.1, duration: 0.5 }}
								className={cn(
									'w-full md:w-2/4',
									index % 2 === 0 ? 'mr-auto' : 'ml-auto'
								)}
							>
								<Card
									className={cn(
										'rounded-lg shadow-md transition-all duration-300 hover:shadow-lg',
										'dark:bg-[#1c1f26] bg-white text-black dark:text-white'
									)}
								>
									<CardHeader>
										<CardTitle className='text-lg font-semibold'>
											English Module {section.id}
										</CardTitle>
										<div className='flex items-center relative'>
											<Progress
												value={progress}
												className={cn('h-4 w-full max-w-52 bg-green-100', {
													'bg-primary': progress === 30,
												})}
												aria-label={`Progress: ${progress ? '30' : '1'}`}
											/>
											<span className='absolute top-1/2 text-sm left-[45%] -translate-x-[45%] md:left-[45%] md:-translate-x-[45%] lg:left-[45%] xl:left-[24%] xl:-translate-x-[22%] lg:-translate-x-[45%] -translate-y-1/2'>
												{progress.toFixed(0) + ' %'}
											</span>
											<Trophy className='w-[34px] h-[30px] text-primary absolute top-[45%] left-[100%] -translate-x-[100%] md:left-[110%] md:-translate-x-[110%] xl:left-[53%] lg:left-[110%] lg:-translate-x-[110%] xl:-translate-x-[53%] -translate-y-1/2 fill-white' />
										</div>
									</CardHeader>
									<CardContent className='flex md:flex-col xl:flex-row justify-between items-center mt-4'>
										<LogoIcon width={100} height={50} />
										<Link
											href={`/dashboard/vocabulary/${section.slug}`}
											className={cn(buttonVariants({ variant: 'primary' }), {
												'opacity-50': index > 0 && !progress,
											})}
											onClick={() => {
												if (index > 0 && progress === 0) {
													return
												}
											}}
										>
											{index === 0 || progress
												? progress === 100
													? 'Completed'
													: 'Continue'
												: 'Jump here'}
										</Link>
									</CardContent>
								</Card>
							</motion.li>
						)
					})}
				</ul>
			</div>

			<WordImage />
			<MatchingPairs />
		</section>
	)
}

export default Vocabulary
