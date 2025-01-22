'use client'
import { useEffect, useRef, useState } from 'react'
import Confetti from 'react-confetti'
import { Howl } from 'howler'
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
	const soundRef = useRef<Howl | null>(null)

	useEffect(() => {
		if (isOpen) {
			setShowConfetti(true)

			// Initialize and play sound only once
			if (!soundRef.current) {
				soundRef.current = new Howl({
					src: ['/sounds/congratulations.mp3'],
					volume: 1.0,
				})
			}
			soundRef.current.play()

			// Automatically close dialog after 5 seconds
			const timer = setTimeout(() => {
				onClose()
				setShowConfetti(false) // Stop confetti when closing
			}, 5000)

			return () => clearTimeout(timer) // Cleanup on unmount
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
