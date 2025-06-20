import Link from 'next/link'

const SiteFooter = () => {
	return (
		<footer className='w-full pt-10 border-t'>
			<div className='container'>
				<div className='flex flex-col lg:flex-row justify-between items-start gap-5'>
					<div className='flex flex-col space-y-8 w-full max-w-[360px]'>
						<Link href='/'>
							<span className='sr-only'>LexiGo icon</span>
						</Link>

						<p className='text-sm text-muted-foreground'>
							Unlock Your Language Potential with{' '}
							<span className='text-primary'>LexiGo</span>: Where English
							Learning Becomes an Adventure!
						</p>
					</div>

					<div className='w-full max-w-[650px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-20'>
						<div className='flex flex-col space-y-4'>
							<h3 className='text-lg lg:text-xl font-semibold'>Skills</h3>
							<ul className='flex flex-col space-y-3'>
								<li>
									<Link
										className='hover:text-primary hover:underline'
										href='/dashboard/skills'
									>
										Skills
									</Link>
								</li>
								<li>
									<Link
										className='hover:text-primary hover:underline'
										href='/dashboard/grammar'
									>
										Grammar
									</Link>
								</li>
								<li>
									<Link
										className='hover:text-primary hover:underline'
										href='/dashboard/vocabulary'
									>
										Vocabulary
									</Link>
								</li>
							</ul>
						</div>

						<div className='flex flex-col space-y-4'>
							<h3 className='text-lg lg:text-xl font-semibold'>Company</h3>
							<ul className='flex flex-col space-y-3'>
								<li>
									<Link
										className='hover:text-primary hover:underline'
										href='/about'
									>
										About Us
									</Link>
								</li>
								<li>
									<Link
										className='hover:text-primary hover:underline'
										href='/career'
									>
										Career
									</Link>
								</li>
								<li>
									<Link
										className='hover:text-primary hover:underline'
										href='/news'
									>
										News
									</Link>
								</li>
							</ul>
						</div>

						<div className='flex flex-col space-y-4'>
							<h3 className='text-lg lg:text-xl font-semibold'>Social</h3>
							<ul className='flex flex-col space-y-3'>
								<li>
									<Link
										className='hover:text-primary hover:underline'
										href='https://www.instagram.com/lexigo.uz?igsh=MWhhcXhtYTY5bHVkbg=='
										target='blank'
									>
										Instagram
									</Link>
								</li>
								<li>
									<Link
										className='hover:text-primary hover:underline'
										href='https://t.me/LexiGo_uz'
										target='blank'
									>
										Telegram
									</Link>
								</li>
								<li>
									<Link
										className='hover:text-primary hover:underline'
										href='https://youtube.com/@lexigo_uz?si=qySMHwZvYEU2foSx'
										target='blank'
									>
										YouTube
									</Link>
								</li>
							</ul>
						</div>

						<div className='flex flex-col space-y-4'>
							<h3 className='text-lg lg:text-xl font-semibold'>Legal</h3>
							<ul className='flex flex-col space-y-3'>
								<li>
									<Link
										className='hover:text-primary hover:underline'
										href='/terms'
									>
										Terms
									</Link>
								</li>
								<li>
									<Link
										className='hover:text-primary hover:underline'
										href='/privacy'
									>
										Privacy
									</Link>
								</li>
								<li>
									<Link
										className='hover:text-primary hover:underline'
										href='/cookies'
									>
										Cookies
									</Link>
								</li>
								<li>
									<Link
										className='hover:text-primary hover:underline'
										href='/contacts'
									>
										Contact
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<hr className='my-10' />

				<div className='flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-3 text-center'>
					<p className='text-sm text-muted-foreground'>
						&copy; {new Date().getFullYear()}{' '}
						<Link
							className='font-semibold hover:text-primary hover:underline'
							href='https://lexigo.uz'
						>
							LexiGo.
						</Link>{' '}
						All rights reserved.
					</p>

					<p className='text-sm text-muted-foreground'>
						Developed by{' '}
						<Link
							className='font-semibold hover:text-primary hover:underline'
							href='https://shahnur.software'
						>
							Dilshodbek Hasanov
						</Link>
					</p>
				</div>
			</div>
		</footer>
	)
}

export default SiteFooter
