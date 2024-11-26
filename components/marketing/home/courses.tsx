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
import { cn } from '@/lib/utils'
import Image from 'next/image'

const courses: {
	id: number
	title: string
	description: string
	icon: string
}[] = [
	{
		id: 1,
		title: 'Vocabulary',
		description:
			'Expand your vocabulary with our extensive collection of words and phrases. Our vocabulary lessons are designed to help you understand and remember new words, enriching your language skills.',
		icon: 'vocabulary',
	},
	{
		id: 2,
		title: 'Vocabulary Game',
		description:
			"Make learning fun with our interactive vocabulary games. These games are designed to reinforce your word knowledge in an entertaining and engaging way, ensuring that you retain what you've learned.",
		icon: 'game',
	},
	{
		id: 3,
		title: 'Grammar',
		description:
			'Master the rules of English with our detailed grammar lessons. Our clear and concise explanations, combined with practical examples, help you grasp even the most complex grammatical concepts.',
		icon: 'grammar',
	},
	{
		id: 4,
		title: 'Reading',
		description:
			'Enhance your reading skills with a variety of texts tailored to different proficiency levels. Our reading exercises improve your comprehension, speed, and overall ability to understand written English.',
		icon: 'reading',
	},
	{
		id: 5,
		title: 'Listening',
		description:
			'Develop your listening skills through our diverse range of audio materials. From everyday conversations to advanced lectures, our listening exercises help you understand spoken English in various contexts.',
		icon: 'listening',
	},
	{
		id: 6,
		title: 'Speaking',
		description:
			'Improve your speaking abilities with our practical speaking exercises. Whether practicing pronunciation, fluency, or conversational skills, our tools are designed to help you communicate confidently in English.',
		icon: 'speaking',
	},
	{
		id: 7,
		title: 'Writing',
		description:
			'Refine your writing skills with our comprehensive writing lessons. From basic sentence structure to advanced essay writing, we provide the guidance and practice you need to become a proficient writer in English.',
		icon: 'writing',
	},
	{
		id: 8,
		title: 'Online Tests',
		description:
			'Evaluate your progress with our online tests available after each topic. These tests are designed to assess your understanding and retention of the material, providing you with immediate feedback and personalized recommendations for further improvement.',
		icon: 'test',
	},
]

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

	const images: Record<string, string> = {
		vocabulary: '/assets/images/words.svg',
		game: '/assets/images/game.svg',
		grammar: '/assets/images/grammar.svg',
		reading: '/assets/icons/reading.svg',
		listening: '/assets/icons/listening.svg',
		speaking: '/assets/icons/speaking.svg',
		writing: '/assets/icons/writing.svg',
		test: '/assets/images/online-test.svg',
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
