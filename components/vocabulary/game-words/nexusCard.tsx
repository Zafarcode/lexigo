import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Layers, Shapes, SquarePi } from 'lucide-react'

const NexusCard = ({
	level,
	handleGameStart,
	handleTime,
}: {
	level: string
	handleGameStart: () => void
	handleTime: () => void
}) => {
	const handleClick = () => {
		handleGameStart()
		handleTime()
	}
	return (
		<Card
			className={`${level === 'Easy' ? 'bg-[#FFC107]' : ''} ${
				level === 'Medium' ? 'bg-[#00BCD4]' : ''
			} ${
				level === 'Hard' ? 'bg-primary' : ''
			} p-[15px] w-full md:w-[275px] h-[270px] rounded-[15px] flex flex-col justify-between`}
		>
			{level == 'Easy' ? (
				<Layers className='w-[70px] h-[70px] text-white border rounded-[15px] dark:border-white ' />
			) : (
				''
			)}
			{level == 'Medium' ? (
				<SquarePi className='w-[70px] h-[70px] text-white border rounded-[15px] dark:border-white ' />
			) : (
				''
			)}
			{level == 'Hard' ? (
				<Shapes className='w-[70px] h-[70px] text-white border rounded-[15px] dark:border-white ' />
			) : (
				''
			)}
			<div className='mb-4'>
				<h3 className='text-[32px] font-bold '>{level}</h3>
				<p className='text-[18px] font-medium '>
					{level == 'Easy' ? 'Oson darajadagi so’zlar' : ''}
					{level == 'Medium' ? 'O’rta darajadagi so’zlar' : ''}
					{level == 'Hard' ? 'Murakkab so’zlar' : ''}
				</p>
			</div>
			<Button
				variant={'outline'}
				onClick={() => handleClick()}
				className='text-[18px] font-medium text-black dark:text-black p-[15px] bg-white rounded-[7px]'
			>
				Boshlash
			</Button>
		</Card>
	)
}

export default NexusCard
