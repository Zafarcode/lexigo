'use client'
import Nexus from '@/components/games/nexus'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { SparklesIcon } from '@/components/utils/icons'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const VocabularyPage = () => {
	return (
		<main className='pt-24 md:pt-28'>
			<div className='container'>
				<h1 className='text-2xl lg:text-[40px] lg:leading-[48px] font-bold mb-10 text-center my-5'>
					Vocabulary
				</h1>

				<Nexus />

				<ol className='flex flex-col gap-5 w-full max-w-2xl mx-auto'>
					<li>
						<Card className='min-h-[250px]'>
							<CardHeader>
								<CardTitle className='text-xl md:text-4xl text-primary mb-2'>
									Module 1
								</CardTitle>
								<div className='relative w-[300px] flex items-center'>
									<Progress value={0} />
									<span className='absolute -right-2 text-primary'>
										<SparklesIcon />
									</span>
								</div>
							</CardHeader>
							<CardContent className='min-h-[100px] relative flex justify-between items-end'>
								<Link
									className={cn(
										buttonVariants({ variant: 'default', size: 'lg' })
									)}
									href='/vocabulary/module/1'
								>
									Get started
								</Link>

								<Image
									className='absolute right-5 -top-16'
									src='/assets/images/navigator.svg'
									width={270}
									height={270}
									alt='navigator'
								/>
							</CardContent>
						</Card>
					</li>
					<li>
						<Card className='min-h-[250px]'>
							<CardHeader>
								<CardTitle className='text-xl md:text-4xl text-primary mb-2'>
									Module 1
								</CardTitle>
								<div className='relative w-[300px] flex items-center'>
									<Progress value={0} />
									<span className='absolute -right-2 text-primary'>
										<SparklesIcon />
									</span>
								</div>
							</CardHeader>
							<CardContent className='min-h-[100px] relative flex justify-between items-end'>
								<Link
									className={cn(
										buttonVariants({ variant: 'default', size: 'lg' })
									)}
									href='/vocabulary/module/1'
								>
									Get started
								</Link>

								<Image
									className='absolute right-5 -top-16'
									src='/assets/images/navigator.svg'
									width={270}
									height={270}
									alt='navigator'
								/>
							</CardContent>
						</Card>
					</li>
					<li>
						<Card className='min-h-[250px]'>
							<CardHeader>
								<CardTitle className='text-xl md:text-4xl text-primary mb-2'>
									Module 1
								</CardTitle>
								<div className='relative w-[300px] flex items-center'>
									<Progress value={0} />
									<span className='absolute -right-2 text-primary'>
										<SparklesIcon />
									</span>
								</div>
							</CardHeader>
							<CardContent className='min-h-[100px] relative flex justify-between items-end'>
								<Link
									className={cn(
										buttonVariants({ variant: 'default', size: 'lg' })
									)}
									href='/vocabulary/module/1'
								>
									Get started
								</Link>

								<Image
									className='absolute right-5 -top-16'
									src='/assets/images/navigator.svg'
									width={270}
									height={270}
									alt='navigator'
								/>
							</CardContent>
						</Card>
					</li>
				</ol>
			</div>
		</main>
	)
}

export default VocabularyPage
