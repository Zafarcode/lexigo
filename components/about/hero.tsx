import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const AboutHero = () => {
	return (
		<section className='py-10 lg:py-20'>
			<div className='container'>
				<div className='flex flex-col-reverse md:flex-row justify-between items-end gap-5 lg:gap-10'>
					<div className='w-full md:w-1/2 flex flex-col space-y-3'>
						<h1 className='text-2xl lg:text-5xl font-bold'>About Us</h1>

						<h2 className='text-xl lg:text-4xl font-bold'>
							Unlock Your <span className='text-primary'>Language</span>{' '}
							Potential with <span className='text-primary'>WordWonders</span>
						</h2>

						<p className='text-gray-500'>
							<span className='text-primary'>Welcome to WordWonders</span>,
							where learning English transforms into an exciting adventure! We
							are dedicated to providing you with the latest online learning
							systems and materials designed to help your knowledge grow.
						</p>
						<p className='text-gray-500'>
							At WordWonders, we believe that language learning should be an
							engaging and enjoyable experience. Our innovative platform
							combines interactive lessons, fun activities, and practical
							exercises to make mastering English both effective and
							entertaining. Whether you are a beginner starting your journey or
							an advanced learner aiming to refine your skills, WordWonders has
							something for everyone.
						</p>
					</div>

					<div className='w-full md:w-1/2'>
						<Image
							src='/assets/images/team.svg'
							width='700'
							height='400'
							alt='team'
							priority
						/>
					</div>
				</div>

				<div className='w-full flex flex-col space-y-3 mt-5'>
					<p className='text-gray-500'>
						Our mission is to empower individuals from all walks of life to
						achieve fluency in English, opening up new opportunities and
						enriching personal and professional lives. With WordWonders, you
						don&apos;t just learn a language; you immerse yourself in a world of
						discovery and growth.
					</p>
					<p className='text-gray-500'>
						<span className='text-primary'>Join us at WordWonders</span> and
						embark on a language-learning adventure like no other. Your
						potential is limitless, and we&apos;re here to help you unlock it.
						Let&apos;s make learning English an exciting journey together!
					</p>
				</div>

				<Link
					className={cn(buttonVariants({ size: 'lg' }), 'mt-5')}
					href='/login'
				>
					Join Now
				</Link>
			</div>
		</section>
	)
}

export default AboutHero
