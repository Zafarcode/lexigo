export interface Unit {
	slug: any
	id: number
	title: string
	isCompleted: boolean
	isLocked: boolean
	type: 'start' | 'star' | 'chest' | 'character' | 'trophy'
}

export interface Section {
	id: number
	title: string
	units: Unit[]
	theme: 'pink' | 'pink-dark' | 'purple' | 'blue'
}
