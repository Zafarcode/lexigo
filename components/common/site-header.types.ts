interface INavList {
	id: number
	label: string
	href: string
}

interface ISkillList extends INavList {
	icon: 'reading' | 'listening' | 'speaking' | 'writing'
}

export type { INavList, ISkillList }
