'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ChevronLeft } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { UnitNode } from './unit-node'
import type { Section as SectionType } from '@/types'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SectionProps {
	section: SectionType
	onUnitClick: (unitId: number) => void
}

export function Section({ section, onUnitClick }: SectionProps) {
	const getUnitPositions = (
		isRight: boolean
	): Record<number, { top: string; left: string }> => {
		return {
			1: { top: '10%', left: isRight ? '50%' : '50%' },
			2: { top: '25%', left: isRight ? '60%' : '40%' },
			3: { top: '45%', left: isRight ? '65%' : '35%' },
			4: { top: '65%', left: isRight ? '60%' : '40%' },
			5: { top: '85%', left: isRight ? '50%' : '50%' },
		}
	}


	const isRight = section.id % 2 === 0
	const unitPositions = getUnitPositions(isRight)

	const getThemeColors = () => {
		switch (section.theme) {
			case 'pink':
				return {
					bg: 'bg-pink-50',
					header: 'bg-pink-500',
					button: 'bg-white text-pink-500 hover:bg-pink-50',
				}
			case 'pink-dark':
				return {
					bg: 'bg-pink-100',
					header: 'bg-pink-700',
					button: 'bg-white text-pink-700 hover:bg-pink-50',
				}
			case 'purple':
				return {
					bg: 'bg-purple-50',
					header: 'bg-purple-500',
					button: 'bg-white text-purple-500 hover:bg-purple-50',
				}
			case 'blue':
				return {
					bg: 'bg-blue-50',
					header: 'bg-blue-500',
					button: 'bg-white text-blue-500 hover:bg-blue-50',
				}
		}
	}

	const colors = getThemeColors()

	return (
		<>
			<Card
				className={`relative w-full max-w-xl overflow-hidden border-none shadow-none`}
			>
				<div
					className={`flex flex-col items-center justify-between p-4 sticky top-0 rounded-lg ${colors.header} text-white`}
				>
					<div className='flex justify-between w-full'>
						<div className='flex items-center gap-2'>
							<Link
								href='/dashboard/vocabulary'
								className={cn(
									buttonVariants({ variant: 'ghost', size: 'icon', className: 'text-white hover:bg-transparent/15' })
								)}
							>
								<ArrowLeft className='h-6 w-6' />
							</Link>
							<h2 className='text-lg font-bold'>Lesson {section.id}</h2>
						</div>
						<Button className={colors.button}>GUIDEBOOK</Button>
					</div>
					<h3 className='text-2xl font-bold text-white'>{section.title}</h3>
				</div>
				<div className='relative h-[600px] w-full'>
					{/* Units */}
					{section.units.map(unit => (
						<motion.div
							key={unit.id}
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 0.5 }}
							className='absolute'
							style={{
								top: unitPositions[unit.id]?.top,
								left: unitPositions[unit.id]?.left,
								transform: 'translate(-50%, -50%)',
							}}
						>
							<UnitNode
								type={unit.type}
								isCompleted={unit.isCompleted}
								isLocked={unit.isLocked}
								onClick={() => onUnitClick(unit.id)}
								theme={section.theme}
							/>
						</motion.div>
					))}
				</div>
			</Card>

			<div className='flex items-center justify-center space-x-4 h-16'>
				{/* Left text */}
				<motion.div
					className='h-px bg-gray-400'
					initial={{ width: 0 }}
					animate={{ width: '100px' }}
					transition={{ duration: 0.8 }}
				/>

				{/* Text */}
				<motion.div
					className='text-gray-400 text-lg'
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.3 }}
				>
					{section.title}
				</motion.div>

				{/* Right text */}
				<motion.div
					className='h-px bg-gray-400'
					initial={{ width: 0 }}
					animate={{ width: '100px' }}
					transition={{ duration: 0.8 }}
				/>
			</div>
		</>
	)
}
