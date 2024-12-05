export interface Tag {
	id: number
	name: string
}

export interface Item {
	id: number
	front_side: string
	back_side: string
	description: string
	synonyms: string[]
	tags: Tag
	image: string
	viewed: boolean
}

export interface Unit {
	id: number
	title: string
	slug: string
	type: 'start' | 'trophy' | 'star' | 'character' | 'chest'
	isCompleted: boolean
	isLocked: boolean
	item: Item[]
}

export interface Section {
	id: number
	title: string
	theme: string
	slug: string
	units: Unit[]
}
