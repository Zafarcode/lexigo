import { addDays, format, startOfWeek } from 'date-fns'

export interface DayData {
	date: Date
	tasks: { id: string; name: string; completed: boolean }[]
}

export function generateWeekData(startDate: Date = new Date()): DayData[] {
	const weekStart = startOfWeek(startDate, { weekStartsOn: 1 }) // Week starts on Monday

	return Array.from({ length: 7 }, (_, i) => {
		const date = addDays(weekStart, i)
		return {
			date,
			tasks: [
				{ id: `${i}-1`, name: 'Learn React', completed: Math.random() < 0.5 },
				{
					id: `${i}-2`,
					name: 'Practice TypeScript',
					completed: Math.random() < 0.5,
				},
				{
					id: `${i}-3`,
					name: 'Build a project',
					completed: Math.random() < 0.5,
				},
			],
		}
	})
}
