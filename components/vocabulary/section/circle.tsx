import { motion } from 'framer-motion'

// Circle progress constants
const RADIUS = 30 // Radius of the circle
const CIRCUMFERENCE = 2 * Math.PI * RADIUS // Circumference of the circle

const CircularProgress = ({
	progress,
	icon,
	theme,
}: {
	progress: number
	icon: React.ReactNode
	theme: string
}) => {
	return (
		<div className='relative w-[110px] h-[110px]'>
			<svg
				width='110'
				height='110'
				viewBox='0 0 80 80'
				className='rotate-[-90deg]'
			>
				{/* Background circle */}
				<circle
					cx='40'
					cy='40'
					r={RADIUS}
					fill='none'
					stroke='lightgray'
					strokeWidth='8'
				/>
				{/* Animated progress circle */}
				<motion.circle
					cx='40'
					cy='40'
					r={RADIUS}
					fill='none'
					stroke={theme}
					strokeWidth='8'
					strokeDasharray={CIRCUMFERENCE}
					strokeDashoffset={CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE}
					initial={{ strokeDashoffset: CIRCUMFERENCE }}
					animate={{
						strokeDashoffset: CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE,
					}}
					transition={{ duration: 0.5, ease: 'easeInOut' }}
				/>
			</svg>
			{/* Centered icon */}
			<div className='absolute inset-0 flex items-center justify-center'>
				{icon}
			</div>
		</div>
	)
}

export default CircularProgress
