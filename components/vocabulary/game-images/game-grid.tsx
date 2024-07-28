import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

interface GameGridProps {
	rendomElement: any;
	selectedImageId: number | null;
	handleSelection: ({ index, isCorrect }: { index: number | null, isCorrect: boolean }) => void;
	isCardSelected: boolean;
}

export const GameGrid: React.FC<GameGridProps> = ({ rendomElement, selectedImageId, handleSelection, isCardSelected }) => (
	<div className='grid md:grid-cols-2 grid-cols-2 gap-2 md:gap-5 md:w-[70%] w-full mx-auto '>
		{rendomElement?.images.map((element: { id: number; title: string; isCorrect: boolean, img: string }, index: number) => {
			let bgColor = ''
			if (selectedImageId === index) {
				if (element.isCorrect) {
					bgColor = 'bg-green-500 dark:bg-green-500'
				} else {
					bgColor = 'bg-primary dark:bg-primary'
				}
			}

			return (
				<label key={element.id} htmlFor={element.title} className='group'>
					<input
						type='radio'
						name='animal'
						id={element.title}
						className='hidden peer'
						checked={selectedImageId === index}
						onChange={() =>
							handleSelection({
								index,
								isCorrect: element.isCorrect,
							})
						}
						disabled={isCardSelected && selectedImageId !== index}
					/>
					<Card
						className={`flex justify-center h-[205px] items-center transition-shadow duration-300 ease-in-out cursor-pointer dark:bg-white ${
							isCardSelected && selectedImageId !== index
								? 'opacity-50 cursor-not-allowed'
								: ''
						} peer-checked:shadow-xl peer-checked:${
							selectedImageId === index ? 'bg-green-500' : 'bg-primary'
						} ${bgColor}`}
					>
						<CardContent className='flex justify-center items-center p-0'>
							<Image
								src={element.img}
								width={140}
								height={140}
								alt={element.title ?? 'Default image'}
								className='mx-auto md:w-[50%] md:h-[60%]  object-contain'
							/>
						</CardContent>
					</Card>
				</label>
			)
		})}
	</div>
)
