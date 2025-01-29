'use client'
import { Card, CardContent } from '@/components/ui/card'
import { WeekCalendar } from '@/components/page'
import {
	BoltIcon,
	FireIcon,
	HeartIcon,
	StarIcon,
	UserIcon,
} from '@heroicons/react/24/solid'
import Image from 'next/image'
import { useState } from 'react'

const DuolingoClone = () => {
	const [showFlagCard, setShowFlagCard] = useState(false)
	const [showFireCard, setShowFireCard] = useState(false)
	const [showStarCard, setShowStarCard] = useState(false)
	const [showLiveCard, setShowLiveCard] = useState(false)

	return (
		<div className='flex flex-col items-center h-[800px] dark:bg-zinc-950 top-2 dar space-y-6 transition-all duration-300 pr-4 ease-in-out overflow-hidden w-full max-w-[450px]'>
			{/* Header Section */}
			<div className='flex items-center justify-between w-full pt-4  max-w-[450px] relative'>
				{/* Flag with hover effect */}
				<div
					className='relative group'
					onMouseEnter={() => setShowFlagCard(true)}
					onMouseLeave={() => setShowFlagCard(false)}
				>
					<button
						className='w-11 h-8 rounded-lg flex items-center justify-center text-2xl transition duration-300 ease-in-out transform hover:bg-gray-900'
						style={{
							backgroundImage:
								"url('https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg')",
							backgroundSize: 'cover',
							backgroundPosition: 'center',
						}}
						aria-label='Change Language'
					/>

					{/* Hover card */}
					{showFlagCard && (
						<div
							className='absolute left-0 transform w-56 p-4 rounded-xl border-[2px] transition-all duration-300 ease-in-out bg-gray-50 dark:bg-zinc-900 dark:text-white dark:border-gray-700'
							style={{ marginTop: '10px' }}
						>
							<div className='relative'>
								<span className='absolute -top-6 left-1/8 transform -translate-x-1/8 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] dark:border-b-zinc-900 border-b-slate-200' />
							</div>
							<p className='text-sm font-semibold mb-2 '>
								My Course
							</p>
							<ul className='space-y-2'>
								<li className='flex gap-2 items-center px-3 py-1 rounded-lg cursor-pointer hover:bg-blue-200 hover:text-white transition-all duration-300'>
									<img
										src='https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg'
										alt='English'
										className='w-8 h-8'
									/>
									<span className='font-bold text-xl text-blue-600'>
										English
									</span>
								</li>
							</ul>
						</div>
					)}
				</div>
				{/* Fire Icon */}
				<button
					className='relative flex items-center space-x-2 group'
					onMouseEnter={() => setShowFireCard(true)}
					onMouseLeave={() => setShowFireCard(false)}
				>
					<div className='flex items-center gap-1 w-14 h-10 rounded-lg transition-all duration-300 group-hover:bg-gray-100 dark:group-hover:bg-gray-700'>
						<FireIcon className='w-8 h-8 text-orange-500 transition-all duration-300' />
						<span className='text-gray-500 font-bold text-xl transition-all duration-300 rounded-lg'>
							1
						</span>
					</div>

					{/* Fire Card */}
					{showFireCard && (
						<div className='absolute left-0.5 top-3/4 w-[400px] rounded-2xl duration-300 transform -translate-x-1/4 translate-y-4 dark:border-gray-950 border transition-all ease-in-out bg-white dark:bg-zinc-900 dark:text-white shadow-lg'>
							<div className='relative'>
								<span className='absolute -top-2 left-1/4 transform -translate-x-1/4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] dark:border-b-blue-400 border-b-blue-200' />
							</div>
							<div className='bg-blue-200 dark:bg-blue-400 w-full h-full rounded-t-2xl p-2'>
								<div className='flex justify-between items-center px-2 mb-2'>
									<div className='text-left'>
										<h3 className='text-lg font-bold mb-2 text-blue-500 dark:text-white'>
											1 day on the go
										</h3>
										<p className='text-base mb-4 text-blue-500 dark:text-white'>
											Yesterday the streak was frozen.
										</p>
									</div>
									<div className='w-full overflow-hidden flex justify-end'>
										<Image
											src='/assets/icons/Streak-freeze-new.svg'
											alt='icon'
											width={100}
											height={100}
											className='object-contain'
										/>
									</div>
								</div>
								{/* Calendar Progress */}

								<WeekCalendar />
							</div>
							<div className='bg-white dark:bg-zinc-950 w-full h-full rounded-b-2xl p-2'>
								<div className='p-4 rounded-lg border mb-4 bg-white dark:bg-zinc-950 dark:text-white dark:border-white'>
									<div className='flex items-center space-x-4'>
										<div className='text-5xl'>🔒</div>
										<div>
											<h4 className='font-semibold text-lg'>
												Elite WordWonders
											</h4>
											<p className='text-sm text-center'>
												Stay on a 7-day streak to unlock Elite WordWonders and
												gain access to exclusive rewards.
											</p>
										</div>
									</div>
								</div>
								<button className='w-full py-2 rounded-lg bg-pink-500 text-white font-semibold text-lg hover:bg-pink-600 transition duration-300'>
									More details
								</button>
							</div>
						</div>
					)}
				</button>

				<button
					className='relative flex items-center gap-1 rounded-lg group transition-all duration-300'
					onMouseEnter={() => setShowStarCard(true)}
					onMouseLeave={() => setShowStarCard(false)}
				>
					<div className='flex items-center gap-1 w-20 h-10 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-700'>
						<StarIcon className='w-8 h-8 text-blue-400' />
						<span className='text-blue-400 font-bold text-xl'>
							500
						</span>
					</div>

					{/* Star Card */}
					{showStarCard && (
						<div
							className='absolute left-1/2 -translate-x-1/2 top-9 transform w-80 h-44 p-4 rounded-xl border-[2px] transition-all duration-300 ease-in-out bg-gray-50 dark:bg-zinc-900 dark:text-white dark:border-gray-700'
							style={{ marginTop: '10px' }}
						>
							<div className='relative'>
								<span className='absolute -top-6  transform   border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] dark:border-b-zinc-900 border-b-slate-200' />
							</div>
							<div className='flex items-center'>
								<Image
									src='/assets/icons/boxs.svg'
									alt='icon'
									width={100}
									height={100}
									className='object-contain pl-2 '
								/>

								<div className='text-center space-y-2'>
									<span className='block text-2xl'>Diamonds</span>
									<span className='block text-base '>
										You have 505 diamonds in stock.
									</span>
									<a className='block  text-sky-500 hover:underline' href='#'>
										GO TO THE STORE
									</a>
								</div>
							</div>
						</div>
					)}
				</button>

				<div className='flex justify-center'>
					<button className='relative group'>
						<div className='relative'>
							<button
								className='relative flex items-center space-x-2 group'
								onMouseEnter={() => setShowLiveCard(true)}
								onMouseLeave={() => setShowLiveCard(false)}
							>
								<div className='flex justify-center'>
									<button className='relative group'>
										<div className='flex items-center gap-1 w-14 h-10 rounded-lg transition-all duration-300 group-hover:bg-gray-100 dark:group-hover:bg-gray-700'>
											<HeartIcon className='w-8 h-8 text-pink-500 transition-all duration-300' />
											<span className='text-pink-500 font-bold text-xl transition-all duration-300 rounded-lg'>
												0
											</span>
										</div>
									</button>
								</div>
								{showLiveCard && (
									<Card className='absolute top-11 left-full -translate-x-full opacity-100 transition-all duration-300 w-96 bg-white dark:bg-gray-800 shadow-lg rounded-2xl'>
										<div className='relative'>
											<span className='absolute -top-2 left-[90%] transform -translate-x-[90%] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] dark:border-b-gray-800 border-b-gray-100' />
										</div>
										<CardContent className='p-4 rounded-xl bg-gray-100 dark:bg-zinc-900 dark:border-b-white'>
											<h3 className='text-xl font-bold text-center text-gray-900 dark:text-gray-200'>
												Lives
											</h3>
											<div className='flex justify-center'>
												{Array(5)
													.fill(0)
													.map((_, i) => (
														<HeartIcon
															key={i}
															className='w-7 h-7 text-pink-600'
														/>
													))}
											</div>
											<p className='text-center mt-4 text-gray-600 dark:text-gray-400'>
												Your supply of lives is full
											</p>
											<p className='text-center text-sm mt-1 text-gray-500 dark:text-gray-400'>
												Continue your studies
											</p>
											<div className='mt-4 space-y-2'>
												<button className='w-full bg-blue-100 text-blue-700 font-medium py-2 rounded-lg dark:bg-gray-700 dark:hover:bg-gray-800 hover:bg-blue-200 flex items-center space-x-2'>
													<Image
														src='/assets/icons/love.svg'
														alt='icon'
														width={30}
														height={30}
														className='object-contain pl-2'
													/>
													<span className='flex-grow text-start'>
														INFINITE LIVES
													</span>
													<span className='text-xs pr-2 text-pink-500'>
														Get <br /> Super
													</span>
												</button>
												<button className='w-full bg-blue-100 text-blue-700 font-medium py-2 rounded-lg dark:bg-gray-700 dark:hover:bg-gray-800 hover:bg-blue-200 flex items-center space-x-2'>
													<Image
														src='/assets/icons/love_gray.svg'
														alt='icon'
														width={35}
														height={35}
														className='object-contain pl-2'
													/>
													<span className='flex-grow text-start'>
														LIVES FOR DIAMONDS
													</span>
													<span className='text-xs flex gap-1 place-items-center pr-2 text-pink-500'>
														<Image
															src='/assets/icons/almaz.svg'
															alt='icon'
															width={30}
															height={30}
															className='object-contain pl-2'
														/>
														<span className='flex-grow text-center'>350</span>
													</span>
												</button>
												<button className='w-full dark:bg-gray-700 dark:hover:bg-gray-800 bg-blue-100 text-blue-700 font-medium py-2 rounded-lg hover:bg-blue-200 flex items-center space-x-2'>
													<Image
														src='/assets/icons/love_gray.svg'
														alt='icon'
														width={35}
														height={35}
														className='object-contain pl-2'
													/>
													<span className='flex-grow text-start'>
														LIVES PER TRAINING
													</span>
												</button>
											</div>
										</CardContent>
									</Card>
								)}
							</button>
						</div>
					</button>
				</div>
			</div>

			{/* Main Content */}
			<div className='w-full max-w-xl p-6 rounded-lg space-y-4 border bg-gray-50 transition duration-300 dark:bg-zinc-900 dark:text-white dark:border-gray-700'>
				<h2 className='text-2xl font-bold text-center'>Unlock Rankings!</h2>

				<div className='flex justify-start'>
					<UserIcon className='w-16 h-16 text-gray-400' />
					<p className='text-lg text-center'>
						Complete <span className='font-bold '>10 more lessons</span> to join
						the competition
					</p>
				</div>
			</div>

			{/* Daily Tasks */}
			<div className='w-full max-w-xl h-64 p-6 rounded-lg space-y-4 border transition duration-300 dark:bg-zinc-900 bg-gray-50 dark:text-white dark:border-gray-700'>
				<h2 className='text-2xl font-bold'>Daily Tasks</h2>
				<div className='flex items-center justify-between'>
					<p className='text-lg'>Earn 10 XP</p>
					<a href='#' className='text-blue-400 text-lg font-bold'>
						ALL
					</a>
				</div>
				<div className='flex items-center space-x-4'>
					<BoltIcon className='w-20 h-20 text-yellow-400' />
					<div className='w-full bg-gray-300 h-4 rounded-full'>
						<div
							className='bg-pink-500 h-4 rounded-full'
							style={{ width: '20%' }}
						></div>
					</div>
					<Image
						src='/assets/icons/box.svg'
						alt='icon'
						width={90}
						height={90}
						className='object-contain '
					/>
				</div>
			</div>

			<footer className='text-lg flex justify-center space-x-6'>
				<a href='#' className='hover:underline dark:text-white'>
					ABOUT
				</a>
				<a href='#' className='hover:underline dark:text-white'>
					STORE
				</a>
			</footer>
		</div>
	)
}

export default DuolingoClone
