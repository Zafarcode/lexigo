'use client'

import * as React from 'react'

import NexusCard from '@/components/games/nexusCard'
import NexusWords from '@/components/games/nexusWords'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Layers, Shapes, SquarePi } from 'lucide-react'

const Nexus = () => {
	const [name, setName] = React.useState('Guest')
	const [level, setLevel] = React.useState('')
	const [time, setTime] = React.useState(0)

	React.useEffect(() => {
		if (time > 0) {
			const timerId = setInterval(() => {
				setTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0))
			}, 1000)
			return () => clearInterval(timerId)
		}
	}, [time])
	const handleMinutes = (timee: number) => {
		const seconds: string = String(timee % 60)
		return timee / 60 > 0
			? Math.floor(timee / 60) + ' : ' + seconds.padStart(2, '0')
			: timee
	}

	return (
		<>
			{level.length > 0 ? (
				<div className='container mx-auto h-[80vh] max-[727px]:h-[140vh]'>
					<div className='flex items-center gap-5 mb-7'>
						<p>Qolgan vaqt</p>
						<Progress
							value={
								(time / (level == 'Easy' ? 120 : level == 'Medium' ? 90 : 60)) *
								100
							}
							className='w-full'
						/>
						<p className='text-gray-500 min-w-[60px]'>{handleMinutes(time)}</p>
					</div>
					<div className='flex gap-4 max-[727px]:flex-col'>
						<Card
							className={`${level === 'Easy' ? 'bg-[#FFC107]' : ''} ${
								level === 'Medium' ? 'bg-[#00BCD4]' : ''
							} ${
								level === 'Hard' ? 'bg-[#f73644]' : ''
							} p-[15px] w-[275px] max-[727px]:w-full max-[727px]:h-[100px] h-[210px] rounded-[30px] flex flex-col justify-between`}
						>
							{level == 'Easy' ? (
								<Layers className='w-[70px] h-[70px] text-white border rounded-[15px] dark:text-black max-[727px]:hidden' />
							) : (
								''
							)}
							{level == 'Medium' ? (
								<SquarePi className='w-[70px] h-[70px] text-white border rounded-[15px] dark:text-black max-[727px]:hidden' />
							) : (
								''
							)}
							{level == 'Hard' ? (
								<Shapes className='w-[70px] h-[70px] text-white border rounded-[15px] dark:text-black max-[727px]:hidden' />
							) : (
								''
							)}
							<div className='mb-4'>
								<h3 className='text-[32px] font-bold dark:text-black'>
									{level}
								</h3>
								<p className='text-[18px] font-medium dark:text-black'>
									Siz tanlagan daraja
								</p>
							</div>
						</Card>
						<div className='w-full bg-gray-100 dark:bg-[#1E1E1E] p-[15px] rounded-[30px]'>
							<NexusWords />
						</div>
					</div>
				</div>
			) : (
				<div className='container mx-auto pt-10 h-[80vh]'>
					<h2 className='text-lg text-center'>Assalomu aleykum, {name}</h2>
					<p className='text-[28px] font-bold text-center'>
						O&apos;zingiz uchun qulay darajani tanlang!
					</p>
					<div className='flex justify-center items-center gap-[21px] mt-10'>
						<NexusCard
							level={'Easy'}
							handleTime={() => setTime(120)}
							handleGameStart={() => setLevel('Easy')}
						/>
						<NexusCard
							level={'Medium'}
							handleTime={() => setTime(90)}
							handleGameStart={() => setLevel('Medium')}
						/>
						<NexusCard
							level={'Hard'}
							handleTime={() => setTime(60)}
							handleGameStart={() => setLevel('Hard')}
						/>
					</div>
				</div>
			)}
		</>
	)
}

export default Nexus
