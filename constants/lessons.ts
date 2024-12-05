import { Section } from '@/types'

export const lessons: Section[] = [
	{
		id: 1,
		title: 'Basic Vocabulary',
		theme: 'pink',
		slug: 'basic-vocabulary',
		units: Array.from({ length: 30 }, (_, i) => ({
			id: i + 1,
			title: `Unit ${i + 1}`,
			slug: `unit-${i + 1}`,
			type:
				i === 0
					? 'start'
					: i === 29
					? 'trophy'
					: (['star', 'character', 'chest'][i % 3] as
							| 'star'
							| 'character'
							| 'chest'),
			isCompleted: false,
			isLocked: i !== 0,
			item: Array.from({ length: 20 }, (_, j) => ({
				id: j + 1,
				front_side: `Word ${j + 1}`,
				viewed: false,
				back_side: `Definition ${j + 1}`,
				description: `Example sentence for Word ${j + 1}`,
				synonyms: [`Synonym ${j + 1}A`, `Synonym ${j + 1}B`],
				tags: { id: 1, name: 'noun' },
				image: `/placeholder.svg?height=100&width=100&text=Word${j + 1}`,
			})),
		})),
	},
	{
		id: 2,
		title: 'Intermediate Vocabulary',
		theme: 'blue',
		slug: 'intermediate-vocabulary',
		units: Array.from({ length: 30 }, (_, i) => ({
			id: i + 1,
			title: `Unit ${i + 1}`,
			slug: `unit-${i + 1}`,
			type:
				i === 0
					? 'start'
					: i === 29
					? 'trophy'
					: (['star', 'character', 'chest'][i % 3] as
							| 'star'
							| 'character'
							| 'chest'),
			isCompleted: false,
			isLocked: i !== 0,
			item: Array.from({ length: 20 }, (_, j) => ({
				id: j + 1,
				viewed: false,
				front_side: `Advanced Word ${j + 1}`,
				back_side: `Advanced Definition ${j + 1}`,
				description: `Complex example sentence for Advanced Word ${j + 1}`,
				synonyms: [`Advanced Synonym ${j + 1}A`, `Advanced Synonym ${j + 1}B`],
				tags: { id: 2, name: 'verb' },
				image: `/placeholder.svg?height=100&width=100&text=AdvWord${j + 1}`,
			})),
		})),
	},
	{
		id: 3,
		title: 'Advanced Vocabulary',
		theme: 'green',
		slug: 'advanced-vocabulary',
		units: Array.from({ length: 30 }, (_, i) => ({
			id: i + 1,
			title: `Unit ${i + 1}`,
			slug: `unit-${i + 1}`,
			type:
				i === 0
					? 'start'
					: i === 29
					? 'trophy'
					: (['star', 'character', 'chest'][i % 3] as
							| 'star'
							| 'character'
							| 'chest'),
			isCompleted: false,
			isLocked: i !== 0,
			item: Array.from({ length: 20 }, (_, j) => ({
				id: j + 1,
				viewed: false,
				front_side: `Super Advanced Word ${j + 1}`,
				back_side: `Super Advanced Definition ${j + 1}`,
				description: `Super complex example sentence for Super Advanced Word ${j + 1}`,
				synonyms: [`Super Advanced Synonym ${j + 1}A`, `Super Advanced Synonym ${j + 1}B`],
				tags: { id: 3, name: 'adjective' },
				image: `/placeholder.svg?height=100&width=100&text=SuperAdvWord${j + 1}`,
			})),
		})),
	},
]
