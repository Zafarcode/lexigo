import { INavList, ISkillList } from '@/components/global/site-header.types'
import {
	ListeningIcon,
	ReadingIcon,
	SpeakingIcon,
	WritingIcon,
} from '@/components/utils/icons'
import React from 'react'

const navList: INavList[] = [
	{
		id: 1,
		label: 'Home',
		href: '/',
	},
	{
		id: 2,
		label: 'About Us',
		href: '/about',
	},
	{
		id: 6,
		label: 'Contact Us',
		href: '/contacts',
	},
	{
		id: 7,
		label: "FAQ's",
		href: '#faq',
	},
]

const skillList: ISkillList[] = [
	{
		id: 1,
		label: 'Reading',
		href: '/skills/reading',
		icon: 'reading',
	},
	{
		id: 2,
		label: 'Listening',
		href: '/skills/listening',
		icon: 'listening',
	},
	{
		id: 3,
		label: 'Speaking',
		href: '/skills/speaking',
		icon: 'speaking',
	},
	{
		id: 4,
		label: 'Writing',
		href: '/skills/writing',
		icon: 'writing',
	},
]

const icons: Record<string, React.ReactNode> = {
	reading: <ReadingIcon />,
	listening: <ListeningIcon />,
	speaking: <SpeakingIcon />,
	writing: <WritingIcon />,
}

export { icons, navList, skillList }
