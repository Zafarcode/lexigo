export const images: Record<string, string> = {
	vocabulary: '/assets/images/words.svg',
	game: '/assets/images/game.svg',
	grammar: '/assets/images/grammar.svg',
	reading: '/assets/icons/reading.svg',
	listening: '/assets/icons/listening.svg',
	speaking: '/assets/icons/speaking.svg',
	writing: '/assets/icons/writing.svg',
	test: '/assets/images/online-test.svg',
}

export const courses: {
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
