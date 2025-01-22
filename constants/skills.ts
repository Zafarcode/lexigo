import { Book, LucideIcon, MessageSquare, Mic, Pencil } from 'lucide-react'

export type skillT = {
	name: string
	slug: string
	level: string[]
	icon: LucideIcon
	color: string
	hoverColor: string
}

export const skillsData: skillT[] = [
	{
		name: 'Reading',
		slug: 'reading',
		level: ['A1-reading', 'A2-reading', 'B1-reading', 'B2-reading'],
		icon: Book,
		color: 'bg-red-500',
		hoverColor: 'hover:text-red-700',
	},
	{
		name: 'Listening',
		slug: 'listening',
		level: ['A1-listening', 'A2-listening', 'B1-listening', 'B2-listening'],
		icon: Mic,
		color: 'bg-green-500',
		hoverColor: 'hover:text-green-700',
	},
	{
		name: 'Writing',
		slug: 'writing',
		level: ['A1-writing', 'A2-writing', 'B1-writing', 'B2-writing'],
		icon: Pencil,
		color: 'bg-blue-500',
		hoverColor: 'hover:text-blue-700',
	},
	{
		name: 'Speaking',
		slug: 'speaking',
		level: ['A1-speaking', 'A2-speaking', 'B1-speaking', 'B2-speaking'],
		icon: MessageSquare,
		color: 'bg-yellow-500',
		hoverColor: 'hover:text-yellow-700',
	},
]

export const infodata = [
	{
		id: 1,
		title: 'How to improve your English proficiency',
		description:
			'Expand your vocabulary and enhance communication skills with WordWonders. Our interactive lessons and engaging activities make learning English enjoyable and effective.',
	},
	{
		id: 2,
		title: 'Choose the skill you want to practise',
		description:
			'With WordWonders, you can focus on the skills that matter most to you—reading, listening, writing, or speaking. Tailored exercises help you master each skill step by step.',
	},
]
