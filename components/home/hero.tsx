'use client'
import { buttonVariants } from '@/components/ui/button'
import {
	LampIcon,
	LaptopIcon,
	PortfelIcon,
	ProgressIcon,
	SpeechIcon,
	TutorIcon,
} from '@/components/utils/icons'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import HeroCarousel from './hero-carousel'

const Hero = () => {
	return (
		<section className='w-full h-full lg:min-h-[87vh] py-10 lg:py-20 bg-[url("/assets/images/hero-left-bg.png"),url("/assets/images/hero-right-bg.png")] bg-no-repeat bg-[position:calc(50%-550px)_50px,calc(50%+550px)_400px] overflow-x-hidden'>
			<div className='container'>
				<div className='flex flex-col-reverse md:flex-row justify-between gap-10 mb-16'>
					{/* hero content */}
					<div className='flex flex-col gap-5 w-full lg:w-[700px] min-h-[450px]'>
						<h1 className='text-2xl lg:text-[40px] lg:leading-[48px] font-bold'>
							Unlock Your <span className='text-primary'>Language</span>{' '}
							Potential with <span className='text-primary'>WordWonders:</span>{' '}
							Where English <span className='text-primary'>Learning</span>{' '}
							Becomes an Adventure!
						</h1>
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
					<div className='relative mx-auto w-[280px] h-[280px] lg:w-[495px] lg:h-[495px] bg-primary rounded-full'>
						<span className='absolute -top-2 -left-2 lg:-top-4  inset-0 lg:-left-4 w-[280px] h-[280px] lg:w-[495px] lg:h-[495px] border border-primary rounded-full'></span>

						<div className='relative flex justify-center mx-auto w-[280px] h-[280px] lg:w-[495px] lg:h-[495px] bg-primary rounded-full overflow-hidden'>
							<Image
								className='absolute top-1 lg:top-auto lg:bottom-0 object-cover'
								src='/assets/images/hero-image.png'
								width={366}
								height={432}
								alt='Hero image'
								priority
							/>
						</div>

						{/* progress vs words */}
						<div className='absolute -top-5 left-[70%]  md:left-[80%] md:w-[140px] md:h-[185px] p-2  md:p-5 rounded-[18px] border border-primary bg-white dark:bg-black'>
							<div className='flex justify-center mb-1 lg:mb-3'>
								<ProgressIcon className='w-[50px] h-[50px] md:w-[81px] md:h-[81px]' />
								<span className='sr-only'>Progress icon</span>
							</div>

							<h3 className='text-lg lg:text-3xl font-bold text-center'>20K</h3>
							<p className='text-sm text-gray-400 text-center whitespace-nowrap'>
								English Words
							</p>
						</div>

						{/* grammar topics */}
						<div className='absolute -left-8 lg:-left-20 top-7 lg:top-36 flex flex-col lg:flex-row items-center gap-1 lg:gap-6 p-2 md:p-5 rounded-[18px] border border-primary bg-white dark:bg-black'>
							<div>
								<LaptopIcon className='w-[30px] h-[30px] md:w-[50px] md:h-[50px]' />
								<span className='sr-only'>Laptop Icon</span>
							</div>
							<div className='text-center lg:text-start'>
								<h3 className='text-lg lg:text-3xl font-bold'>40+</h3>
								<p className='text-sm text-gray-400 whitespace-nowrap'>
									Grammar Topics
								</p>
							</div>
						</div>

						{/* IELTS topics */}
						<div className='absolute top-[210px] left-[65%] lg:top-[375px] lg:left-[75%] flex flex-col lg:flex-row items-center gap-1 lg:gap-6 p-2 md:p-5 rounded-[18px] border border-primary bg-white dark:bg-black'>
							<div>
								<TutorIcon className='w-[30px] h-[30px] md:w-[50px] md:h-[50px]' />
								<span className='sr-only'>Tutor Icon</span>
							</div>
							<div className='text-center lg:text-start'>
								<p className='text-sm text-gray-400 whitespace-nowrap'>
									IELTS Topics
								</p>
								<h3 className='text-lg lg:text-3xl font-bold'>240+</h3>
							</div>
						</div>
					</div>
				</div>

				{/* Collaboration */}

				<div className='flex flex-col lg:flex-row gap-1 lg:gap-20  lg:items-center'>
					<div>
						<h3 className='text-3xl lg:text-5xl font-bold text-primary'>7+</h3>
						<p className='text-lg lg:text-2xl'>Collaborations</p>
					</div>
					<HeroCarousel />
				</div>
			</div>
		</section>
	)
}

export default Hero
