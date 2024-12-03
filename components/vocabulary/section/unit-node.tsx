'use client'

import { motion } from 'framer-motion'
import { Star, Trophy, Box, Play } from 'lucide-react'
import CircularProgress from './circle'

interface UnitNodeProps {
	type: 'start' | 'star' | 'chest' | 'trophy' | 'character'
	isCompleted: boolean
	isLocked: boolean
	onClick: () => void
	theme: 'pink' | 'pink-dark' | 'purple' | 'blue'
}


export function UnitNode({
	type,
	isCompleted,
	isLocked,
	onClick,
	theme,
}: UnitNodeProps) {
	const variants = {
		initial: { scale: 0.8, opacity: 0 },
		animate: { scale: 1, opacity: 1 },
		hover: { scale: 1.1 },
		tap: { scale: 0.95 },
	}


	const getIcon = () => {
		switch (type) {
			case 'start':
				return <Play className='h-6 w-6' />
			case 'star':
				return <Star className='h-6 w-6' />
			case 'chest':
				return <Box className='h-6 w-6' />
			case 'trophy':
				return <Trophy className='h-6 w-6' />
			case 'character':
				return <Star className='h-6 w-6' />
		}
	}

	const getThemeColors = () => {
		switch (theme) {
			case 'pink':
				return isCompleted
					? 'bg-pink-500 text-white border-pink-600'
					: isLocked
					? 'bg-gray-300 text-gray-500 border-gray-400'
					: 'bg-pink-100 text-pink-500 border-pink-200'
			case 'pink-dark':
				return isCompleted
					? 'bg-pink-700 text-white border-pink-800'
					: isLocked
					? 'bg-gray-300 text-gray-500 border-gray-400'
					: 'bg-pink-200 text-pink-700 border-pink-300'
			case 'purple':
				return isCompleted
					? 'bg-purple-500 text-white border-purple-600'
					: isLocked
					? 'bg-gray-300 text-gray-500 border-gray-400'
					: 'bg-purple-100 text-purple-500 border-purple-200'
			case 'blue':
				return isCompleted
					? 'bg-blue-500 text-white border-blue-600'
					: isLocked
					? 'bg-gray-300 text-gray-500 border-gray-400'
					: 'bg-blue-100 text-blue-500 border-blue-200'
		}
	}

	return (
		<motion.button
			variants={variants}
			initial='initial'
			animate='animate'
			whileHover='hover'
			whileTap='tap'
			onClick={onClick}
			disabled={isLocked}
			className={`relative flex h-16 w-16 items-center justify-center rounded-full ${getThemeColors()} shadow-2xl`}
		>
			
			<CircularProgress progress={30} icon={getIcon()} />
			{isLocked && (
				<div className='absolute -right-1 -top-1 rounded-full px-0.5 bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90 border-neutral-400 active:border-b-0'>
					<motion.div
						animate={{ rotate: [0, 10, 0] }}
						transition={{ repeat: Infinity, duration: 2 }}
					>
						🔒
					</motion.div>
				</div>
			)}
		</motion.button>
	)
}
