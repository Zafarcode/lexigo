'use client'

import { useEffect, useRef, useState } from 'react'
import Confetti from 'react-confetti'
import { buttonVariants } from '../ui/button'
import { motion } from 'framer-motion'
import { Target, Zap } from 'lucide-react'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type CelebrationProps = {
	slug: string
	onOpen?: boolean
}

const Celebration = ({ slug, onOpen }: CelebrationProps) => {
	const [showConfetti, setShowConfetti] = useState(false)
	const audioRef = useRef<HTMLAudioElement | null>(null)

	useEffect(() => {
		if (!audioRef.current) {
			audioRef.current = new Audio('/sounds/congratulations.mp3')
			audioRef.current.volume = 1.0
		}

		if (onOpen) {
			setShowConfetti(true)

			if (audioRef.current) {
				if (audioRef.current) {
					audioRef.current.currentTime = 0
				}
			}
			audioRef.current.play()

			const timer = setTimeout(() => {
				setShowConfetti(false)
				audioRef.current?.pause()
			}, 5000)

			return () => clearTimeout(timer)
		} else {
			audioRef.current?.pause()
			audioRef.current.currentTime = 0
		}
	}, [onOpen])

	return (
		<>
			{showConfetti && <Confetti />}
			<div className='flex flex-col items-center bg-white p-4'>
				<div className='text-center space-y-8 max-w-md w-full mx-auto xl:pt-5 pb-32 xl:pb-0'>
					{/* Character and Mascot Image */}
					<motion.div
						initial={{ y: 50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ type: 'spring', bounce: 0.5 }}
						className='relative h-40 flex justify-center'
					>
						<Image
							src='/assets/icons/congratulationIcons6.svg'
							alt='Character'
							width={200}
							height={200}
							className='w-40 h-40'
						/>
					</motion.div>

					{/* Title */}
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className='text-3xl font-bold text-primary'
					>
						Congratulations!
					</motion.h1>

					{/* Stats Cards */}
					<div className='grid grid-cols-2 gap-4'>
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.2 }}
						>
							<Card className='p-0 bg-yellow-500 border-4 border-yellow-500 rounded-xl'>
								<p className=' text-sm md:text-base font-bold text-white mb-1 py-2'>
									Experience points
								</p>
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ type: 'spring', delay: 0.4 }}
									className='text-2xl font-bold text-yellow-500 flex items-center justify-center gap-2 rounded-xl bg-white py-4'
								>
									<Zap className='w-5 h-5' />5
								</motion.div>
							</Card>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.3 }}
						>
							<Card className='p-0 bg-green-500 border-4 border-green-500 rounded-xl'>
								<p className=' text-sm md:text-base font-bold text-white mb-1 py-2'>Great</p>
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ type: 'spring', delay: 0.5 }}
									className='text-2xl font-bold text-green-500 flex items-center justify-center gap-2 rounded-xl bg-white py-4'
								>
									<Target className='w-5 h-5' />
									71%
								</motion.div>
							</Card>
						</motion.div>
					</div>
				</div>

				{/* Next Button */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6 }}
					className='absolute bottom-0 h-24 w-full'
				>
					<hr className='w-full' />
					<div className='max-w-5xl mx-auto flex items-center justify-end pt-[26px] pr-4 xl:pr-0'>
						<Link
							href={`/dashboard/vocabulary/${slug}`}
							className={cn(buttonVariants({ variant: 'secondary' }))}
						>
							Continue
						</Link>
					</div>
				</motion.div>
			</div>
		</>
	)
}

export default Celebration
