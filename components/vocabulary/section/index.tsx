'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Star, Trophy, Box, Play } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import CircularProgress from './circle'
import type { Section as SectionType } from '@/types'

interface SectionProps {
	section: SectionType
	onUnitClick: (unitId: number) => void
	unitProgress: Record<number, number>
}

export function Section({ section, onUnitClick, unitProgress }: SectionProps) {
	const getUnitPositions = (): Record<
		number,
		{ top: string; left: string }
	> => {
		const positions: Record<number, { top: string; left: string }> = {}
		const amplitude = 25 // Amplitude of the wave
		const spacing = 5 // Spacing between units
		const startY = 5 // Starting Y position
		const centerX = 50 // Center X position
		const totalUnits = 30 // Total number of units

		
		const frequency = (Math.PI * 2) / (totalUnits - 1) // Frequency

		for (let i = 0; i < totalUnits; i++) { 
			const y = startY + i * spacing 
			const x = centerX + amplitude * Math.sin(frequency * i) // X position

			positions[i + 1] = {
				top: `${y}%`,
				left: `${x}%`,
			}
		}

		return positions
	}


	const getThemeColors = () => {
		switch (section.theme) {
			case 'pink':
				return {
					bg: 'bg-pink-50',
					header: 'bg-pink-500',
					button: 'bg-white text-pink-500 hover:bg-pink-50',
					progress: '#f9a8d4',
				}
			case 'blue':
				return {
					bg: 'bg-blue-50',
					header: 'bg-blue-500',
					button: 'bg-white text-blue-500 hover:bg-blue-50',
					progress: '#93c5fd',
				}
			case 'green':
				return {
					bg: 'bg-green-50',
					header: 'bg-green-500',
					button: 'bg-white text-green-500 hover:bg-green-50',
					progress: '#86efac',
				}
			default:
				return {
					bg: 'bg-gray-50',
					header: 'bg-gray-500',
					button: 'bg-white text-gray-500 hover:bg-gray-50',
					progress: '#d1d5db',
				}
		}
	}

	const colors = getThemeColors()

	const getIcon = (
		type: 'start' | 'star' | 'chest' | 'trophy' | 'character'
	) => {
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

	const getUnitThemeColors = (
		isCompleted: boolean,
		isLocked: boolean,
		theme: string
	) => {
		switch (theme) {
			case 'pink':
				return isCompleted
					? 'bg-pink-500 text-white'
					: isLocked
					? 'bg-gray-300 text-gray-500'
					: 'bg-pink-100 text-pink-500'
			case 'blue':
				return isCompleted
					? 'bg-blue-500 text-white'
					: isLocked
					? 'bg-gray-300 text-gray-500'
					: 'bg-blue-100 text-blue-500'
			case 'green':
				return isCompleted
					? 'bg-green-500 text-white '
					: isLocked
					? 'bg-gray-300 text-gray-500'
					: 'bg-green-100 text-green-500'
			default:
				return isCompleted
					? 'bg-gray-500 text-white'
					: isLocked
					? 'bg-gray-300 text-gray-500'
					: 'bg-gray-100 text-gray-500'
		}
	}

	const unitPositions = getUnitPositions()

	return (
		<Card
			className={`relative w-full max-w-4xl border-none shadow-none`}
		>
			<div
				className={`flex flex-col items-center justify-between p-4 rounded-lg ${colors.header} text-white`}
			>
				<div className='flex justify-between w-full'>
					<div className='flex items-center gap-2'>
						<Link
							href='/dashboard/vocabulary'
							className={cn(
								buttonVariants({
									variant: 'ghost',
									size: 'icon',
									className: 'text-white hover:bg-transparent/15',
								})
							)}
						>
							<ArrowLeft className='h-6 w-6' />
						</Link>
						<h2 className='text-lg font-bold'>Module {section.id}</h2>
					</div>
					<Button className={colors.button}>GUIDEBOOK</Button>
				</div>
				<h3 className='text-2xl font-bold text-white'>{section.title}</h3>
			</div>
			<div className='relative h-[2000px] w-full'>
				{section.units.map(unit => (
					<motion.div
						key={unit.id}
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.5 }}
						className='absolute'
						style={{
							top: unitPositions[unit.id].top,
							left: unitPositions[unit.id].left,
							transform: 'translate(-50%, -50%)',
						}}
					>
						<motion.button
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => !unit.isLocked && onUnitClick(unit.id)}
							disabled={unit.isLocked}
							className={`relative flex h-16 w-16 items-center justify-center rounded-full ${getUnitThemeColors(
								unit.isCompleted,
								unit.isLocked,
								section.theme
							)} shadow-2xl`}
						>
							<CircularProgress
								progress={unitProgress[unit.id] || 0}
								icon={getIcon(unit.type)} theme={colors.progress}							/>
							
						</motion.button>
					</motion.div>
				))}
			</div>
		</Card>
	)
}
