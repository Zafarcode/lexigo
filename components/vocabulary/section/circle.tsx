import { motion } from 'framer-motion'
import React from 'react'

const RADIUS = 30
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

interface ProgressCircleProps {
	progress: number | string
}

const ProgressCircle = ({ progress }: ProgressCircleProps) => {
	return (
		<div className='absolute inset-0 flex items-center justify-center'>
			<motion.svg
				width='96'
				height='96'
				viewBox='0 0 80 80'
				className='rotate-[-90deg]'
				style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
			>
				<defs>
					<filter id='glow'>
						<feGaussianBlur stdDeviation='2' result='coloredBlur' />
						<feMerge>
							<feMergeNode in='coloredBlur' />
							<feMergeNode in='SourceGraphic' />
						</feMerge>
					</filter>
				</defs>

				{/* Background circle */}
				<circle
					cx='40'
					cy='40'
					r={RADIUS}
					fill='none'
					stroke='rgba(255,255,255,0.2)'
					strokeWidth='8'
					filter='url(#glow)'
				/>

				{/* Animated progress circle */}
				<motion.circle
					cx='40'
					cy='40'
					r={RADIUS}
					fill='none'
					stroke='rgba(255,255,255,0.9)'
					strokeWidth='8'
					strokeLinecap='round'
					strokeDasharray={CIRCUMFERENCE}
					strokeDashoffset={CIRCUMFERENCE - (parseFloat(progress as string) / 100) * CIRCUMFERENCE}
					initial={{ strokeDashoffset: CIRCUMFERENCE }}
					animate={{
						strokeDashoffset: CIRCUMFERENCE - (parseFloat(progress as string) / 100) * CIRCUMFERENCE,
					}}
					transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
					filter='url(#glow)'
				/>
			</motion.svg>
		</div>
	)
}

export default ProgressCircle
