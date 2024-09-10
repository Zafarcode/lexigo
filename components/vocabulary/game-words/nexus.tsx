'use client'
import React from 'react'


import NexusWords from '@/components/vocabulary/game-words/nexusWords'
import useWordGameStore from '@/store/word.game.provider'
import NexusCard from './nexusCard'


const Nexus = () => {
	const {level, setLevel, name} = useWordGameStore()


	return (
		<>
			{level !== ""  ? (
				<div className='container mx-auto h-[80vh] max-[727px]:h-[140vh]'>
					<div className='flex items-center gap-5 mb-7'>
						<div className='w-full bg-gray-100 dark:bg-[#1E1E1E] p-[15px] rounded-[30px]'>
							<NexusWords />
						</div>
					</div>
				</div>
			) : (
				<div className='container mx-auto pt-5 mt-3 mb-5'>
					<h2 className='text-lg text-center'>Assalomu aleykum, {name}</h2>
					<p className='text-[28px] font-bold text-center'>
						O&apos;zingiz uchun qulay darajani tanlang!
					</p>
					<div className='flex justify-center items-center gap-[21px] mt-10 flex-wrap' >
						<NexusCard
							level={'Easy'}
							handleGameStart={() => setLevel('Easy')}
						/>
						<NexusCard
							level={'Medium'}
							handleGameStart={() => setLevel('Medium')}
						/>
						<NexusCard
							level={'Hard'}
							handleGameStart={() => setLevel('Hard')}
						/>
					</div>
				</div>
			)}
		</>
	)
}

export default Nexus
