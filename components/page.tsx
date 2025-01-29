'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Flame } from 'lucide-react'
import { generateWeekData, type DayData } from '../utils/week'
import { cn } from '@/lib/utils'

export function WeekCalendar() {
	const [weekData, setWeekData] = useState<DayData[]>(generateWeekData())

	const toggleTask = (dayIndex: number, taskId: string) => {
		setWeekData(prevData =>
			prevData.map((day, index) =>
				index === dayIndex
					? {
							...day,
							tasks: day.tasks.map(task =>
								task.id === taskId
									? { ...task, completed: !task.completed }
									: task
							),
					  }
					: day
			)
		)
	}

	return (
		<div className='max-w-4xl mx-auto p-4 bg-white dark:bg-zinc-950 rounded-lg shadow-lg'>
			<div className='grid grid-cols-7 gap-4'>
				{weekData.slice(0, 7).map((day, dayIndex) => (
					<div
						key={format(day.date, 'yyyy-MM-dd')}
						className='flex flex-col items-center'
					>
						<div className='text-sm font-medium mb-2'>
							{format(day.date, 'EEE')}
						</div>
						<div className='text-lg font-bold mb-2'>
							{format(day.date, 'd')}
						</div>
						<div className='flex flex-col items-center space-y-2'>
							{day.tasks.slice(0, 1).map(
								(
									task // faqat bitta task ko'rsatish uchun
								) => (
									<button
										key={task.id}
										onClick={() => toggleTask(dayIndex, task.id)}
										className={cn(
											'w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200',
											task.completed
												? 'bg-pink-500 hover:bg-pink-600'
												: 'bg-gray-200 hover:bg-gray-300'
										)}
									>
										{task.completed && <Flame className='w-6 h-6 text-white' />}
									</button>
								)
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
