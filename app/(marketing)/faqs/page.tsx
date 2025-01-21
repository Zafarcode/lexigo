'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
	{
		question: 'Kurslar bepulmi?',
		answer: "Ba'zi kurslar bepul, ba'zilari esa pullik.",
	},
	{
		question: "Paymedan boshqa to'lov qilish imkoni bormi?",
		answer: "Ha, turli xil to'lov usullari mavjud.",
	},
	{
		question: "Kurslar noldan boshlab o'rgatiladimi?",
		answer: "Ha, kurslar boshlang'ich darajadan boshlab tushuntiriladi.",
	},
	{
		question: 'Kurs sotib olgach undan qachongacha foydalanamiz?',
		answer: 'Kurslar umrbod kirish imkoniyatiga ega.',
	},
	{
		question: "To'lov butun kurs uchun qancha?",
		answer: 'Kurs narxi kursga bog‘liq holda farqlanadi.',
	},
	{
		question: 'Kurslarda o‘qish uchun kompyuter kerakmi?',
		answer: 'Ha, amaliyot uchun kompyuter tavsiya etiladi.',
	},
	{
		question: 'Express kurslarning davomi ham bo‘ladimi?',
		answer: 'Ha, yangi bo‘limlar qo‘shib boriladi.',
	},
	{
		question: 'Yangi darslar qachon qo‘shiladi?',
		answer: 'Har oy yangi darslar yuklanadi.',
	},
]

export default function FAQPage() {
	return (
		<div className='max-w-2xl mx-auto py-10'>
			<h2 className='text-2xl font-bold text-center mb-4'>
				Ko&apos;p Beriladigan Savollar!!
			</h2>
			<p className='text-center mb-6'>
				Yana sizni qiziqtirgan savollar bo&apos;lsa, biz bilan bog&apos;laning.
			</p>
			<Accordion
				type='single'
				collapsible
				className='rounded-lg bg-white border-b-0'
			>
				{faqs.map((faq, index) => (
					<AccordionItem key={index} value={String(index)}>
						<AccordionTrigger className='flex justify-between w-full transition font-semibold text-lg text-gray-800'>
							{faq.question}
						</AccordionTrigger>
						<AccordionContent className='text-gray-500 text-base'>
							{faq.answer}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	)
}
