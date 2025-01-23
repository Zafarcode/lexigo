'use client'
import { useEffect, useRef, useState } from 'react'
import Confetti from 'react-confetti'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

type CelebrationDialogProps = {
	isOpen: boolean
	onClose: () => void
}

const CelebrationDialog = ({ isOpen, onClose }: CelebrationDialogProps) => {
	const [showConfetti, setShowConfetti] = useState(false)
	const audioRef = useRef<HTMLAudioElement | null>(null)

	useEffect(() => {
		if (isOpen) {
			setShowConfetti(true)

			// Initialize and play audio
			if (!audioRef.current) {
				audioRef.current = new Audio('/sounds/congratulations.mp3')
				audioRef.current.volume = 1.0
			}
			audioRef.current.play()

			// Automatically close dialog after 5 seconds
			const timer = setTimeout(() => {
				onClose()
				setShowConfetti(false) // Stop confetti when closing
			}, 5000)

			return () => clearTimeout(timer) // Cleanup on unmount
		} else {
			// Pause and reset audio when dialog closes
			if (audioRef.current) {
				audioRef.current.pause()
				audioRef.current.currentTime = 0
			}
		}
	}, [isOpen, onClose])

	return (
		<>
			{showConfetti && <Confetti />}
			<Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
				<DialogContent className='max-w-lg p-8 bg-gradient-to-br from-gray-100 via-white to-gray-50 rounded-xl shadow-2xl text-center space-y-6'>
					<DialogHeader>
						<DialogTitle className='text-4xl font-extrabold text-gray-800'>
							🎉 Congratulations!
						</DialogTitle>
						<DialogDescription className='text-lg text-gray-600'>
							You’ve successfully completed all the words in this unit. Keep up
							the great work!
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default CelebrationDialog
