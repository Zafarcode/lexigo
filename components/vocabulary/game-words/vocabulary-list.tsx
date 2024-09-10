import React from 'react'
import NexusWords from '@/components/vocabulary/game-words/nexusWords'
import { Card } from '@/components/ui/card'
import { Layers, Shapes, SquarePi } from 'lucide-react'
import useWordGameStore from '@/store/word.game.provider'


const VocabularyList = () => {
	const { level } = useWordGameStore()
	

	
	return(
		<div className='container mx-auto h-[80vh] max-[727px]:h-[140vh]'>
			<div className='flex items-center gap-5 mb-7'>
			
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
	)
}

export default VocabularyList
