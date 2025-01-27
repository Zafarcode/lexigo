import { Book, MessageCircle, Star } from 'lucide-react'

export const plans = [
	{
		name: 'Basic',
		price: '$9.99',
		description: 'Perfect for getting started',
		features: [
			'20 English lessons per month',
			'Basic grammar exercises',
			'Vocabulary builder',
			'Progress tracking',
		],
	},
	{
		name: 'Pro',
		price: '$19.99',
		description: 'Best for serious learners',
		features: [
			'Unlimited English lessons',
			'Advanced grammar exercises',
			'Vocabulary builder',
			'Progress tracking',
			'Live tutoring sessions',
			'IELTS preparation materials',
		],
	},
	{
		name: 'Enterprise',
		price: '$49.99',
		description: 'For teams and organizations',
		features: [
			'All Pro features',
			'Custom learning paths',
			'Team progress analytics',
			'Dedicated support',
			'Custom content integration',
			'API access',
		],
	},
]

export const notifications = [
	{
		id: 1,
		title: 'New Lesson Available',
		description: 'A new grammar lesson has been added to your course.',
		icon: Book,
		time: '2 hours ago',
	},
	{
		id: 2,
		title: 'Achievement Unlocked',
		description: "You've completed 10 lessons in a row!",
		icon: Star,
		time: '5 hours ago',
	},
	{
		id: 3,
		title: 'Tutor Message',
		description: 'Your tutor has sent you feedback on your latest assignment.',
		icon: MessageCircle,
		time: '1 day ago',
	},
]