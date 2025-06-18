'use client'

import { Button } from '@/components/ui/button'
import { consonantPronunciations, pronunciations } from '@/constants/sounds'
import { useState } from 'react'

export default function Characters() {
	const [activeSound, setActiveSound] = useState<string | null>(null)
	const [clickedSymbol, setClickedSymbol] = useState<string | null>(null)
	const handleButtonClick = (symbol: string, example: string) => {
		// Tugmadagi matnlarni o'qish uchun ovoz chiqarish funksiyasi
		const speak = (text: string) => {
			if ('speechSynthesis' in window) {
				const utterance = new SpeechSynthesisUtterance(text)
				utterance.lang = 'en-USA' // Tilni sozlash (kerak bo'lsa 'uz-UZ' uchun almashtiring)
				window.speechSynthesis.speak(utterance)
			} else {
				alert(
					'Sizning brauzeringiz matnni ovozga o‘girishni qo‘llab-quvvatlamaydi.'
				)
			}
		}

		// Tugmadagi p.symbol va p.example matnlarini ovoz bilan o'qish
		speak(symbol) // p.symbol ni o'qish
		speak(example) // p.example ni o'qish

		// Faol ovozni belgilash va bosilgan simbolni saqlash
		setActiveSound(symbol)
		setClickedSymbol(symbol)

		// 100ms keyin bosilgan simbolni tozalash
		setTimeout(() => setClickedSymbol(null), 100)
	}

	return (
		<main className='min-h-screen mx-auto p-4 flex flex-rows items-center'>
			<div className='max-w-4xl w-full'>
				<div className='grid grid-cols-1 rounded-lg  mb-8 items-center'>
					<div>
						<h1 className='text-2xl md:text-4xl sm:text-3xl font-semibold text-center mb-4 text-gray-600 dark:text-gray-50'>
							Let’s Learn English Sounds!
						</h1>
						<p className='text-center text-sm sm:text-base md:text-lg  text-gray-500 dark:text-gray-200 mb-4'>
							Train your listening skills and learn to pronounce sounds.
						</p>
					</div>

					<Button className='bg-[#029af3] hover:bg-[#3eb6fc] font-bold py-3 px-6 rounded-2xl w-[90%] md:w-80 text-center mx-auto text-white border-blue-500 dark:text-gray-950 relative transition-all duration-200'>
						<span className='relative z-10'>START: +10 XP</span>
						<span className='absolute inset-0 bg-black/20 rounded-2xl translate-y-1 translate-x-1 blur-[3px] -z-10'></span>{' '}
						{/* Modified shadow */}
					</Button>
				</div>

				<section className='rounded-lg p-6 my-8'>
					<h2 className='text-lg sm:text-xl md:text-2xl font-bold mb-4 flex items-center px-3'>
						<span className='flex-grow h-[3px] bg-gray-200 dark:bg-gray-600'></span>
						<span className='px-4 text-gray-600 dark:text-gray-50'>
							Glasnary
						</span>
						<span className='flex-grow h-[3px] bg-gray-200 dark:bg-gray-600'></span>
					</h2>
					<div className=' grid grid-cols-3 gap-4 '>
						{pronunciations.map((p, index) => (
							<Button
								key={index}
								className={`
                  bg-white dark:bg-gray-950 dark:text-gray-100 dark:border-gray-800 py-8 sm:py-10 font-bold 
                  border-2 border-b-4 border-gray-200 hover:bg-gray-50 text-gray-600 
                  rounded-2xl shadow-sm transition duration-200 
                  ${clickedSymbol === p.symbol ? 'translate-y-1' : ''}
                `}
								onClick={() => handleButtonClick(p.symbol, p.example)}
							>
								<div className='flex flex-col items-center justify-center py-4'>
									<div className=' text-sm sm:text-base md:text-lg  font-medium'>
										{p.symbol}
									</div>
									<div className='text-xs text-gray-400 mb-2'>{p.example}</div>
									<div className='w-6 sm:w-8 md:w-10 h-1 sm:h-2 bg-gray-200 dark:bg-gray-800 rounded-full'></div>
								</div>
							</Button>
						))}
					</div>
				</section>

				<section className='rounded-lg p-6 mb-8'>
					<h2 className='text-lg sm:text-xl md:text-2xl font-bold mb-4 flex items-center px-3'>
						<span className='flex-grow h-[3px] bg-gray-200 dark:bg-gray-600'></span>
						<span className='px-4 text-gray-600 dark:text-gray-50'>
							Concords
						</span>
						<span className='flex-grow h-[3px] bg-gray-200 dark:bg-gray-600'></span>
					</h2>
					<div className=' grid grid-cols-3 gap-4 '>
						{consonantPronunciations.map((p, index) => (
							<Button
								key={index}
								className={`
                  bg-white dark:bg-gray-950 dark:text-gray-100 dark:border-gray-800 py-8 sm:py-10 font-bold 
                  border-2 border-b-4 border-gray-200 hover:bg-gray-50 text-gray-600 
                  rounded-2xl shadow-sm transition duration-200 
                  ${clickedSymbol === p.symbol ? 'translate-y-1' : ''}
                `}
								onClick={() => handleButtonClick(p.symbol, p.example)}
							>
								<div className='flex flex-col items-center justify-center py-4'>
									<div className=' text-sm sm:text-base md:text-lg  font-medium'>
										{p.symbol}
									</div>
									<div className='text-xs text-gray-400 mb-2'>{p.example}</div>
									<div className='w-6 sm:w-8 md:w-10 h-1 sm:h-2 bg-gray-200 dark:bg-gray-800 rounded-full'></div>
								</div>
							</Button>
						))}
					</div>
				</section>
			</div>
		</main>
	)
}
