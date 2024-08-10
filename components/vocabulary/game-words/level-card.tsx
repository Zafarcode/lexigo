import React from 'react'
import NexusCard from '@/components/vocabulary/game-words/nexusCard'
import useGameStore from '@/store/game.provider'
function LevelCard() {
	const [name, setName] = React.useState('Guest')
	const [level, setLevel] = React.useState('')
    const { time, setTime } = useGameStore()

  return (
    <div className='container mx-auto pt-5 h-[80vh]'>
        <h2 className='text-lg text-center'>Assalomu aleykum, {name}</h2>
        <p className='text-[28px] font-bold text-center'>
            O&apos;zingiz uchun qulay darajani tanlang!
        </p>
        <div className='flex justify-center items-center gap-[21px] mt-10 flex-wrap' >
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
)
}

export default LevelCard
