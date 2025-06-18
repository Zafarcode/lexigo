'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'

const faqs = [
	{
		question: 'LexiGo nima?',
		answer:
			"LexiGo ingliz tilini qiziqarli, samarali va oson o'rganish uchun mo'ljallangan innovatsion onlayn platformadir. Biz interaktiv darslar, o'yinlar va amaliy mashqlarni birlashtirib, o'quvchilarga til salohiyatini ochishga yordam beramiz.",
	},
	{
		question: 'LexiGo kimlar uchun?',
		answer:
			"Platformamiz barcha o'quvchilarga, yangi boshlovchilardan tortib, ilg'or talabalargacha mo'ljallangan bo'lib, turli darajadagi bilimdonlikka moslashtirilgan resurslarni taklif etadi.",
	},
	{
		question: 'LexiGo qanday xususiyatlarni taklif etadi?',
		answer:
			"Biz Lug'at Yaratuvchisi, Grammatika Mahorati darslari, Interaktiv o'yinlar, O'qish va Tinglash amaliyotlari, Gapirish va Yozish vositalari hamda taraqqiyotni kuzatish uchun Onlayn testlarni taqdim etamiz.",
	},
	{
		question: 'LexiGo boshqa platformalardan nimasi bilan farq qiladi?',
		answer:
			"Biz o'yinlar, interaktiv mashg'ulotlar va barcha til ko'nikmalarini bir joyda qamrab oluvchi tuzilmali darslar orqali o'rganishni sarguzashtga aylantirishga e'tibor qaratamiz.",
	},
	{
		question: 'LexiGo dan foydalanish bepulmi?',
		answer:
			"LexiGo bepul va premium rejalarni taklif etadi. Bepul foydalanuvchilar asosiy darslarga ega bo'ladilar, premium a'zolar esa ilg'or xususiyatlar, shaxsiy o'rganish yo'nalishlari va reklamasiz tajribadan bahramand bo'lishadi.",
	},
	{
		question: "LexiGo til o'rganish uchun qanchalik samarali?",
		answer:
			"Platformamiz lug'at uchun intervalgacha takrorlash va kontekstual grammatika mashqlari kabi ilmiy asoslangan usullardan foydalanadi. Foydalanuvchilar bir necha hafta davomida muntazam mashq qilish orqali ingliz tilida o'zlariga bo'lgan ishonchlari ortganini xabar qilishadi.",
	},
	{
		question: 'Taraqqiyotimni kuzata olamanmi?',
		answer:
			"Ha! Onlayn testlar bilimingizni baholaydi va bizning boshqaruv paneli sizning o'rganish statistikalaringizni, kuchli tomonlaringizni va yaxshilash kerak bo'lgan sohalarni ko'rsatadi.",
	},
	{
		question: 'Maxsus jihozlar kerakmi?',
		answer:
			"Yo'q — LexiGo internetga ulangan har qanday qurilmada (kompyuter, planshet yoki smartfon) ishlaydi, bu sizga istalgan vaqtda, istalgan joyda o'rganish imkonini beradi.",
	},
	{
		question: "LexiGo da o'rganishni qanday boshlayman?",
		answer:
			"Shunchaki bepul hisob yarating, qisqa joylashtirish testidan o'ting va tizimimiz maqsadlaringizga asoslanib shaxsiy o'rganish yo'nalishini tavsiya qiladi.",
	},
	{
		question: 'LexiGo qanday yordam taklif qiladi?',
		answer:
			"Biz 24/7 elektron pochta orqali yordam, o'quvchilar hamjamiyati forumi va tajribangizni maksimal darajada oshirishga yordam beradigan batafsil qo'llanmalar/o'quv materiallarini taqdim etamiz.",
	},
]

export default function FAQPage() {
	return (
		<div className='max-w-2xl mx-auto py-10'>
			<h2 className='text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white'>
				Frequently Asked Questions
			</h2>
			<p className='text-center mb-6 text-gray-700 dark:text-gray-300'>
				Mana bizning tez-tez beriladigan savollarimiz. Agar sizda boshqa
				savollar bo`lsa, qo`llab-quvvatlash jamoamizga murojaat qilishdan
				tortinmang.
			</p>
			<Accordion
				type='single'
				collapsible
				className='rounded-lg bg-white dark:bg-black/60'
			>
				{faqs.map((faq, index) => (
					<AccordionItem key={index} value={String(index)}>
						<AccordionTrigger className='flex justify-between dark:px-4 w-full transition font-semibold text-lg text-gray-800 dark:text-gray-200'>
							{faq.question}
						</AccordionTrigger>
						<AccordionContent className='text-gray-500 dark:px-4 dark:text-gray-400 text-base'>
							{faq.answer}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
			<h3 className='mt-4 mb-1'>
				Til salohiyatingizni <span className='text-primary'>bugun</span>!
			</h3>
			<h3>
				<Link className='underline text-primary font-bold' href='/auth/login'>
					Hozir qo`shiling
				</Link>{' '}
				va <span className='text-primary font-bold'>LexiGo</span> bilan
				sarguzashtingizni boshlang.
			</h3>
		</div>
	)
}
