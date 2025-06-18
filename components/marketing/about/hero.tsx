import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const AboutHero = () => {
	return (
		<section className='py-10 lg:py-20'>
			<div className='container'>
				<div className='flex flex-col-reverse md:flex-row justify-between items-end gap-5 lg:gap-10'>
					<div className='w-full md:w-1/2 flex flex-col space-y-3'>
						<h1 className='text-2xl lg:text-5xl font-bold'>Biz haqimizda</h1>

						<h2 className='text-xl lg:text-4xl font-bold'>
							O‘z <span className='text-primary'>til bilish</span>{' '}
							salohiyatingizni <span className='text-primary'>LexiGo</span>{' '}
							bilan oching
						</h2>

						<p className='text-gray-500'>
							<span className='text-primary'>LexiGo ga xush kelibsiz</span>, bu
							yerda ingliz tilini o‘rganish haqiqiy sarguzashtga aylanadi! Biz
							sizga bilimlaringizni oshirish uchun eng yangi onlayn o‘quv
							tizimlari va materiallarini taqdim etishga sodiqmiz.
						</p>
						<p className='text-gray-500'>
							LexiGo’da biz til o‘rganish qiziqarli va ishtiyoqli bo‘lishi
							kerak, deb hisoblaymiz. Bizning innovatsion platformamiz
							interaktiv darslar, qiziqarli mashg‘ulotlar va amaliy mashqlarni
							birlashtirib, ingliz tilini o‘zlashtirishni samarali va zavqli
							qiladi. Boshlovchi bo‘lasizmi yoki ilg‘or darajaga chiqqan
							o‘quvchi bo‘lasizmi – LexiGo har biringiz uchun nimadir
							tayyorlagan.
						</p>
					</div>

					<div className='w-full md:w-1/2'>
						<Image
							src='/assets/images/team.svg'
							width='700'
							height='400'
							alt='jamoa'
							priority
						/>
					</div>
				</div>

				<div className='w-full flex flex-col space-y-3 mt-5'>
					<p className='text-gray-500'>
						Bizning missiyamiz – hayotning barcha jabhalaridagi insonlarni
						ingliz tilida bemalol gaplasha olishga ilhomlantirish, yangi
						imkoniyatlar yaratish va shaxsiy hamda professional hayotlarini
						boyitishdir. LexiGo bilan siz shunchaki til o‘rganmaysiz; siz
						kashfiyot va o‘sish dunyosiga sho‘ng‘isiz.
					</p>
					<p className='text-gray-500'>
						<span className='text-primary'>LexiGo jamoasiga qo‘shiling</span> va
						boshqa hech kimnikiga o‘xshamagan til o‘rganish sarguzashtini
						boshlang. Sizning salohiyatingiz cheksiz, va biz uni ochishda
						ko‘maklashishga tayyormiz. Ingliz tilini o‘rganish safarini birga
						qiziqarli qilaylik!
					</p>
				</div>

				<Link
					className={cn(buttonVariants({ size: 'lg' }), 'mt-5')}
					href='/auth/login'
				>
					Hoziroq qo‘shiling
				</Link>
			</div>
		</section>
	)
}

export default AboutHero
