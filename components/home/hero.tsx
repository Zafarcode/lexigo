'use client'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { LampIcon, PortfelIcon, SpeechIcon } from '../utils/icons'

const Hero = () => {
	return (
		<section className='w-full lg:min-h-[87vh] py-10 lg:py-20'>
			<div className='container'>
				<div className='flex flex-col-reverse md:flex-row justify-between gap-10'>
					{/* hero content */}
					<div className='flex flex-col gap-5 w-full lg:w-[700px] min-h-[450px]'>
						<h2 className='text-2xl lg:text-[40px] lg:leading-[48px] font-bold'>
							Unlock Your <span className='text-primary'>Language</span>{' '}
							Potential with <span className='text-primary'>WordWonders:</span>{' '}
							Where English <span className='text-primary'>Learning</span>{' '}
							Becomes an Adventure!
						</h2>
						<p className='leading-[180%] text-base text-gray-500'>
							Learn English with WordWonders: The latest online learning system
							and materials that help your knowledge grow.
						</p>
						<div className='flex flex-col gap-4 md:flex-row lg:gap-7 mb-5 lg:mb-10'>
							<Link
								className={cn(
									buttonVariants({ variant: 'default', size: 'lg' })
								)}
								href='/vocabulary'
							>
								Get Started
							</Link>
							<Link
								className={cn(
									buttonVariants({ variant: 'outline', size: 'lg' })
								)}
								href='/login'
							>
								Get free trial
							</Link>
						</div>
						<ul className='flex sm:gap-5 lg:gap-10 items-center'>
							<li className='flex items-center gap-3'>
								<SpeechIcon />
								<span className='sr-only'>Speech Icon</span>
								<p className='text-sm lg:text-base'>Public Speaking</p>
							</li>
							<li className='flex items-center gap-[10px]'>
								<PortfelIcon />
								<span className='sr-only'>Portfel Icon</span>
								<p className='text-sm lg:text-base'>Career Oriented</p>
							</li>
							<li className='flex items-center gap-[10px]'>
								<LampIcon />
								<span className='sr-only'>Lamp Icon</span>
								<p className='text-sm lg:text-base'>Creative Thinking</p>
							</li>
						</ul>
					</div>

					{/* Hero image */}
					<div className='relative mx-auto w-[300px] h-[300px] lg:w-[495px] lg:h-[495px] bg-primary rounded-full'>
						<span className='absolute -top-3 -left-3 lg:-top-4  inset-0 lg:-left-4 w-[300px] h-[300px] lg:w-[495px] lg:h-[495px] border border-primary rounded-full'></span>

						<div className='relative flex justify-center mx-auto w-[300px] h-[300px] lg:w-[495px] lg:h-[495px] bg-primary rounded-full overflow-hidden'>
							<Image
								className='absolute top-1 lg:top-auto lg:bottom-0 object-cover'
								src='/assets/images/hero-image.png'
								width={366}
								height={432}
								alt='Hero image'
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero
