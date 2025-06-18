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

const Hero = () => {
	return (
		<section className='w-full h-full lg:min-h-[87vh] py-10 lg:py-20 bg-[url("/assets/images/hero-left-bg.png"),url("/assets/images/hero-right-bg.png")] bg-no-repeat bg-[position:calc(50%-550px)_50px,calc(50%+550px)_400px] overflow-x-hidden'>
			<div className='container'>
				<div className='flex flex-col-reverse md:flex-row justify-between gap-10 mb-16'>
					{/* hero content */}
					<div className='flex flex-col gap-5 w-full lg:w-[700px] min-h-[450px]'>
						<h1 className='text-2xl lg:text-[40px] lg:leading-[48px] font-bold'>
							O`z Tilingiz salohiyatini{' '}
							<span className='text-primary'>LexiGo:</span> bilan oching:{' '}
							<span className='text-primary'>Ingliz tilini </span>
							O`rganish <span className='text-primary'>sarguzashtga</span>{' '}
							aylangan joy!
						</h1>
						<p className='leading-[180%] text-base text-gray-500'>
							Ingliz tilini **LexiGo** bilan o`rganing: Bilimingizni oshirishga
							yordam beradigan eng so`nggi onlayn o`quv tizimi va materiallari.
						</p>
						<div className='flex flex-col gap-4 md:flex-row lg:gap-7 mb-5 lg:mb-10'>
							<Link
								className={cn(
									buttonVariants({ variant: 'default', size: 'lg' })
								)}
								href='/dashboard/vocabulary'
							>
								Boshlash
							</Link>
						</div>
						<ul className='flex sm:gap-5 lg:gap-10 items-center'>
							<li className='flex items-center gap-3'>
								<SpeechIcon />
								<span className='sr-only'>Nutq belgisi</span>
								<p className='text-sm lg:text-base'>Ommaviy nutq</p>
							</li>
							<li className='flex items-center gap-[10px]'>
								<PortfelIcon />
								<span className='sr-only'>Portfel belgisi</span>
								<p className='text-sm lg:text-base'>Kasbga yo`naltirilgan</p>
							</li>
							<li className='flex items-center gap-[10px]'>
								<LampIcon />
								<span className='sr-only'>Chiroq belgisi</span>
								<p className='text-sm lg:text-base'>Ijodiy fikrlash</p>
							</li>
						</ul>
					</div>

					{/* Hero image */}
					<div className='relative mx-auto w-[280px] h-[280px] lg:w-[495px] lg:h-[495px] bg-primary rounded-full'>
						<span className='absolute -top-2 -left-2 lg:-top-4  inset-0 lg:-left-4 w-[280px] h-[280px] lg:w-[495px] lg:h-[495px] border border-primary rounded-full'></span>

						<div className='relative flex justify-center mx-auto w-[280px] h-[280px] lg:w-[495px] lg:h-[495px] bg-primary rounded-full overflow-hidden'>
							<Image
								className='absolute w-full h-full object-left top-1 lg:top-auto lg:bottom-0 object-cover'
								src='/assets/images/hero-image.png'
								width={366}
								height={432}
								alt='Qahramon rasmi'
								priority
							/>
						</div>

						{/* progress vs words */}
						<div className='absolute -top-5 left-[70%]  md:left-[80%] md:w-[140px] md:h-[185px] p-2  md:p-5 rounded-[18px] border border-primary bg-white dark:bg-black'>
							<div className='flex justify-center mb-1 lg:mb-3'>
								<ProgressIcon className='w-[50px] h-[50px] md:w-[81px] md:h-[81px]' />
								<span className='sr-only'>Taraqqiyot belgisi</span>
							</div>

							<h3 className='text-lg lg:text-3xl font-bold text-center'>10K</h3>
							<p className='text-sm text-gray-400 text-center whitespace-nowrap'>
								Inglizcha so'zlar
							</p>
						</div>

						{/* grammar topics */}
						<div className='absolute -left-8 lg:-left-20 top-7 lg:top-36 flex flex-col lg:flex-row items-center gap-1 lg:gap-6 p-2 md:p-5 rounded-[18px] border border-primary bg-white dark:bg-black'>
							<div>
								<LaptopIcon className='w-[30px] h-[30px] md:w-[50px] md:h-[50px]' />
								<span className='sr-only'>Noutbuk belgisi</span>
							</div>
							<div className='text-center lg:text-start'>
								<h3 className='text-lg lg:text-3xl font-bold'>20+</h3>
								<p className='text-sm text-gray-400 whitespace-nowrap'>
									Grammatika mavzulari
								</p>
							</div>
						</div>

						{/* IELTS topics */}
						<div className='absolute top-[210px] left-[65%] lg:top-[375px] lg:left-[75%] flex flex-col lg:flex-row items-center gap-1 lg:gap-6 p-2 md:p-5 rounded-[18px] border border-primary bg-white dark:bg-black'>
							<div>
								<TutorIcon className='w-[30px] h-[30px] md:w-[50px] md:h-[50px]' />
								<span className='sr-only'>O'qituvchi belgisi</span>
							</div>
							<div className='text-center lg:text-start'>
								<p className='text-sm text-gray-400 whitespace-nowrap'>
									IELTS mavzulari
								</p>
								<h3 className='text-lg lg:text-3xl font-bold'>150+</h3>
							</div>
						</div>
					</div>
				</div>

				{/* Collaboration */}
			</div>
		</section>
	)
}

export default Hero
