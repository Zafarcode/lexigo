'use client'
import {
	AudioLinesIcon,
	BookHeadPhoneIcon,
	GamePadIcon,
	LanguageIcon,
	LibraryIcon,
	NotePadIcon,
	OnlineTestsIcon,
	WordIcon,
} from '@/components/utils/icons'
import { courses, images } from '@/constants/courses'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const Courses = () => {
	const icons: Record<string, JSX.Element> = {
		vocabulary: <WordIcon width={34} height={34} />,
		game: <GamePadIcon width={34} height={34} />,
		grammar: <LibraryIcon width={34} height={34} />,
		reading: <LanguageIcon width={34} height={34} />,
		listening: <BookHeadPhoneIcon width={34} height={34} />,
		speaking: <AudioLinesIcon width={34} height={34} />,
		writing: <NotePadIcon width={34} height={34} />,
		test: <OnlineTestsIcon width={34} height={34} />,
	}

	return (
		<section className='pb-10 md:py-10'>
			<div className='container'>
				<h2 className='text-2xl lg:text-[40px] lg:leading-[48px] font-bold mb-10 text-center'>
					Our Courses
				</h2>

				<ul className='flex flex-col gap-20'>
					{courses.map(({ id, title, description, icon }) => (
						<li
							className='flex flex-col md:flex-row justify-center items-center odd:flex-col md:odd:flex-row-reverse gap-5 md:gap-20'
							key={id}
						>
							<div
								className='w-full md:w-1/3'
								data-aos={cn({
									'fade-left': id % 2 === 1,
									'fade-right': id % 2 === 0,
								})}
							>
								<Image
									className={cn(
										'h-auto mx-auto object-cover',
										{
											'md:rotate-6': id % 2 === 1,
										},
										{
											'md:-rotate-12': id % 2 === 0,
										},
										(id === 2 || id === 1 || id === 8) && 'w-[250px]'
									)}
									src={images[icon]}
									alt={icon}
									width={350}
									height={250}
								/>
							</div>

							<div className='w-full md:w-1/3'>
								<div data-aos='fade-up' className='mb-1'>
									{icons[icon]}
								</div>

								<h3
									data-aos='fade-up'
									className='text-2xl text-primary font-semibold'
								>
									{id}. {title}
								</h3>

								<p data-aos='fade-up' className='text-gray-500'>
									{description}
								</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}

export default Courses
