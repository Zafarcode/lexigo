import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { QuoteIcon } from '@/components/utils/icons'

const Testimonials = () => {
	return (
		<section className='py-20'>
			<div className='container'>
				<h2 className='text-2xl lg:text-[40px] lg:leading-[48px] font-bold mb-10 text-center'>
					Fikr-mulohazalar
				</h2>

				<div className='flex flex-wrap -m-4'>
					<div data-aos='fade-right' className='p-4 md:w-1/2 w-full'>
						<div className='h-full p-8 rounded border flex flex-col justify-between'>
							<div>
								<QuoteIcon />
								<span className='sr-only'>Iqtibos belgisi</span>
								<p className='leading-relaxed mb-6'>
									LexiGo ingliz tilini o‘rganish uslubimni butunlay o‘zgartirdi.
									Interaktiv darslar va qiziqarli mashg‘ulotlar tufayli o‘qish
									juda maroqli bo‘lib qoldi, so‘z boyligim va grammatikam
									sezilarli darajada yaxshilandi. Ingliz tilini o‘rganmoqchi
									bo‘lganlarga LexiGo’ni chin dildan tavsiya qilaman!
								</p>
							</div>
							<div className='flex items-center'>
								<Avatar>
									<AvatarImage src='' />
									<AvatarFallback>JG</AvatarFallback>
								</Avatar>

								<div className='ml-3'>
									<p className='text-sm font-medium'>Javlon G‘ulyamov</p>
									<p className='text-sm text-gray-500'>Software Engineer</p>
								</div>
							</div>
						</div>
					</div>
					<div data-aos='fade-left' className='p-4 md:w-1/2 w-full'>
						<div className='h-full p-8 rounded border flex flex-col justify-between'>
							<div>
								<QuoteIcon />
								<span className='sr-only'>Iqtibos belgisi</span>
								<p className='leading-relaxed mb-6'>
									LexiGo’dagi keng qamrovli o‘quv materiallari va amaliy
									mashqlar ingliz tilini o‘rganishimda juda ko‘p yordam berdi.
									Har bir mavzudan keyingi onlayn testlar o‘z ustimdan ishlashim
									va qaysi jihatlarni yaxshilashim kerakligini aniqlash uchun
									juda foydali. LexiGo bilan ingliz tilini o‘rganish haqiqiy
									sarguzashtga aylanadi.
								</p>
							</div>
							<div className='flex items-center'>
								<Avatar>
									<AvatarImage src='/assets/images/avatar.jpg' />
									<AvatarFallback>DH</AvatarFallback>
								</Avatar>

								<div className='ml-3'>
									<p className='text-sm font-medium'>Dilshodbek Hasanov</p>
									<p className='text-sm text-gray-500'>Software Engineer</p>
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
