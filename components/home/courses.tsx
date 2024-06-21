'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import {
	AudioLinesIcon,
	BookHeadPhoneIcon,
	GamePadIcon,
	LanguageIcon,
	LibraryIcon,
	NotePadIcon,
	WordIcon,
} from '@/components/utils/icons'
import Autoplay from 'embla-carousel-autoplay'

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
	}

	return (
		<section className='md:py-10'>
			<div className='container'>
				<h2 className='text-2xl lg:text-5xl font-bold text-center mb-10'>
					Our Courses
				</h2>

				<Carousel
					opts={{
						align: 'start',
						loop: true,
					}}
					plugins={[
						Autoplay({
							delay: 2000,
							stopOnInteraction: false,
							stopOnMouseEnter: true,
						}),
					]}
				>
					<CarouselContent>
						{courses.map(({ id, title, description, icon }) => (
							<CarouselItem key={id} className='md:basis-1/2 lg:basis-1/3'>
								<div className='p-1'>
									<Card className='hover:shadow-md'>
										<CardHeader>
											<div className='mb-1'>{icons[icon]}</div>

											<CardTitle className='text-primary'>{title}</CardTitle>
										</CardHeader>
										<CardContent>
											<span className='text-gray-500'>{description}</span>
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</section>
	)
}

export default Courses
