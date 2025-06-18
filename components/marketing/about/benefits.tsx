import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const benefits = [
	{
		id: '01',
		title: 'Interaktiv o‘rganish tajribasi',
		description:
			'LexiGo dinamik va interaktiv platformani taklif etadi, bu esa ingliz tilini o‘rganishni qiziqarli va maroqli qiladi. Interaktiv darslar va qiziqarli mashg‘ulotlar o‘quvchilarning motivatsiyasini oshiradi.',
	},
	{
		id: '02',
		title: 'Keng qamrovli o‘quv materiallari',
		description:
			'Platformada eng so‘nggi onlayn o‘quv tizimlari va materiallari mavjud bo‘lib, bu o‘quvchilarga til o‘rganishda dolzarb va foydali kontentdan foydalanish imkonini beradi.',
	},
	{
		id: '03',
		title: 'Barcha darajalar uchun mos',
		description:
			'Boshlovchi bo‘lasizmi yoki ilg‘or darajadami, LexiGo har bir foydalanuvchiga moslashtirilgan kontentni taklif etadi va sizni o‘zingizga qulay sur’atda rivojlantiradi.',
	},
	{
		id: '04',
		title: 'Amaliy mashqlar',
		description:
			'LexiGo o‘rgangan bilimlaringizni real hayotda qo‘llashga yordam beradigan amaliy mashqlarni o‘z ichiga oladi, bu esa til ko‘nikmalaringiz va ishonchingizni oshiradi.',
	},
	{
		id: '05',
		title: 'Innovatsion o‘qitish metodlari',
		description:
			'Platforma an’anaviy o‘quv texnikalarini zamonaviy texnologiyalar bilan uyg‘unlashtirib, ingliz tilini o‘rganish jarayonini samarali va qiziqarli qiladi.',
	},
	{
		id: '06',
		title: 'Til orqali kuch va imkoniyat',
		description:
			'LexiGo odamlarni ingliz tilida ravon gapirishga o‘rgatib, shaxsiy va professional hayotlarida yangi imkoniyatlar eshigini ochadi.',
	},
	{
		id: '07',
		title: 'Sho‘ng‘ishli o‘rganish muhit',
		description:
			'LexiGo foydalanuvchilari kashfiyot va rivojlanish dunyosiga sho‘ng‘ib, nafaqat til o‘rganadilar, balki madaniy tushunchalarini ham kengaytiradilar.',
	},
	{
		id: '08',
		title: 'Qo‘llab-quvvatlovchi hamjamiyat',
		description:
			'LexiGo hamjamiyatiga qo‘shilish orqali siz til o‘rganish yo‘lingizda muvaffaqiyatga erishishga yordam beradigan qo‘llab-quvvatlash jamoasining bir qismiga aylanasiz.',
	},
	{
		id: '09',
		title: 'Cheksiz imkoniyatlar',
		description:
			'LexiGo bilan ingliz tilini o‘rganish va uni mukammal bilish imkoniyatlaringiz cheksizdir. Platforma sizning til salohiyatingizni ochish va maqsadlaringizga erishishingizga yordam beradi.',
	},
]

const Benefits = () => {
	return (
		<section className='mb-10'>
			<div className='container'>
				<h2 className='text-2xl lg:text-5xl font-bold text-center'>
					Bizning afzalliklarimiz
				</h2>

				<ol className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 mt-10'>
					{benefits.map(({ id, title, description }) => (
						<li key={id}>
							<Card className='hover:shadow-lg h-full group'>
								<CardHeader>
									<span className='relative w-0 h-0 rounded-full border-[24px] md:border-[34px] border-primary border-b-transparent border-r-transparent'>
										<span className='absolute -top-5 -left-5 md:-top-8 md:-left-8 text-4xl md:text-6xl'>
											{id}
										</span>
									</span>

									<CardTitle className='text-xl bg-gradient-to-r from-primary from-30% dark:to-white to-black lg:to-secondary to-50% bg-clip-text text-transparent group-hover:to-primary'>
										{title}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className='text-gray-500'>{description}</p>
								</CardContent>
							</Card>
						</li>
					))}
				</ol>
			</div>
		</section>
	)
}

export default Benefits
