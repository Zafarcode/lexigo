import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { QuoteIcon } from '@/components/utils/icons'

const Testimonials = () => {
	return (
		<section className='py-20'>
			<div className='container'>
				<h2 className='text-2xl lg:text-[40px] lg:leading-[48px] font-bold mb-10 text-center'>
					Testimonials
				</h2>

				<div className='flex flex-wrap -m-4'>
					<div data-aos='fade-right' className='p-4 md:w-1/2 w-full'>
						<div className='h-full p-8 rounded border flex flex-col justify-between'>
							<div>
								<QuoteIcon />
								<span className='sr-only'>Quote icon</span>
								<p className='leading-relaxed mb-6'>
									WordWonders has completely transformed the way I learn
									English. The interactive lessons and fun activities make
									studying enjoyable, and I&apos;ve seen significant improvement
									in my vocabulary and grammar skills. I highly recommend
									WordWonders to anyone looking to master English!
								</p>
							</div>
							<div className='flex items-center'>
								<Avatar>
									<AvatarImage src='' />
									<AvatarFallback>KH</AvatarFallback>
								</Avatar>

								<div className='ml-3'>
									<p className='text-sm font-medium'>Khusniddin Qodirkulov</p>
									<p className='text-sm text-gray-500'>
										CEO of Newcastle School
									</p>
								</div>
							</div>
						</div>
					</div>
					<div data-aos='fade-left' className='p-4 md:w-1/2 w-full'>
						<div className='h-full p-8 rounded border flex flex-col justify-between'>
							<div>
								<QuoteIcon />
								<span className='sr-only'>Quote icon</span>
								<p className='leading-relaxed mb-6'>
									The comprehensive learning materials and practical exercises
									at WordWonders have helped me immensely in my English learning
									journey. The online tests after each topic are particularly
									useful for tracking my progress and identifying areas for
									improvement. WordWonders truly makes learning English an
									exciting adventure.
								</p>
							</div>
							<div className='flex items-center'>
								<Avatar>
									<AvatarImage src='/assets/images/avatar.jpg' />
									<AvatarFallback>SH</AvatarFallback>
								</Avatar>

								<div className='ml-3'>
									<p className='text-sm font-medium'>Shakhbozbek Usmonov</p>
									<p className='text-sm text-gray-500'>
										CEO of ShahNur Software
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Testimonials
