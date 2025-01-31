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
		question: 'What is WordWonders?',
		answer:
			'WordWonders is an innovative online platform designed to make English learning engaging, effective, and fun. We combine interactive lessons, games, and practical exercises to help learners unlock their language potential.',
	},
	{
		question: 'Who is WordWonders for?',
		answer:
			'Our platform caters to all learners, from beginners to advanced students, offering tailored resources to suit different proficiency levels.',
	},
	{
		question: 'What features does WordWonders offer?',
		answer:
			'We provide a Vocabulary Builder, Grammar Mastery lessons, Interactive Games, Reading & Listening Practice, Speaking & Writing Tools, and Online Tests to track progress.',
	},
	{
		question: 'How is WordWonders different from other platforms?',
		answer:
			'We focus on making learning an adventure through a blend of games, interactive activities, and structured lessons that cover all language skills in one place.',
	},
	{
		question: 'Is WordWonders free to use?',
		answer:
			'WordWonders offers both free and premium plans. Free users get access to basic lessons, while premium members enjoy advanced features, personalized learning paths, and an ad-free experience.',
	},
	{
		question: 'How effective is WordWonders for language learning?',
		answer:
			'Our platform uses scientifically backed methods like spaced repetition for vocabulary and contextual grammar exercises. Users report improved confidence in English within weeks of consistent practice.',
	},
	{
		question: 'Can I track my progress?',
		answer:
			'Yes! Online Tests assess your understanding, and our dashboard displays your learning statistics, strengths, and areas for improvement.',
	},
	{
		question: 'Do I need special equipment?',
		answer:
			'No—WordWonders works on any device with internet access (computer, tablet, or smartphone), allowing you to learn anytime, anywhere.',
	},
	{
		question: 'How do I start learning on WordWonders?',
		answer:
			'Simply create a free account, take a quick placement test, and our system will recommend a personalized learning path based on your goals.',
	},
	{
		question: 'What support does WordWonders offer?',
		answer:
			'We provide 24/7 email support, a learner community forum, and detailed guides/tutorials to help you maximize your experience.',
	},
]

export default function FAQPage() {
	return (
		<div className='max-w-2xl mx-auto py-10'>
			<h2 className='text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white'>
				Frequently Asked Questions
			</h2>
			<p className='text-center mb-6 text-gray-700 dark:text-gray-300'>
				Here are some of our FAQs. If you have any other questions you&apos;d
				like to ask, please don&apos;t hesitate to reach out to our support
				team.
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
				Unlock your language potential{' '}
				<span className='text-primary'>today</span>!
			</h3>
			<h3>
				<Link className='underline text-primary font-bold' href='/auth/login'>
					Join Now
				</Link>{' '}
				and start your adventure with{' '}
				<span className='text-primary font-bold'>WordWonders</span>.
			</h3>
		</div>
	)
}
