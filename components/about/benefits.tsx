import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const benefirts = [
	{
		id: '01',
		title: 'Interactive Learning Experience',
		description:
			'WordWonders offers a dynamic and interactive platform that makes learning English engaging and enjoyable. Interactive lessons and fun activities keep learners motivated and interested.',
	},
	{
		id: '02',
		title: 'Comprehensive Learning Materials',
		description:
			'The platform provides the latest online learning systems and materials, ensuring that learners have access to up-to-date and relevant content to aid their language acquisition.',
	},
	{
		id: '03',
		title: 'Tailored for All Levels',
		description:
			'Whether you are a beginner or an advanced learner, WordWonders has tailored content to meet your specific needs and help you progress at your own pace.',
	},
	{
		id: '04',
		title: 'Practical Exercises',
		description:
			'WordWonders includes practical exercises that allow learners to apply what they have learned in real-world scenarios, enhancing their language proficiency and confidence.',
	},
	{
		id: '05',
		title: 'Innovative Teaching Methods',
		description:
			'The platform utilizes innovative teaching methods that combine traditional learning techniques with modern technology, making the process of mastering English both effective and entertaining.',
	},
	{
		id: '06',
		title: 'Empowerment Through Language',
		description:
			'WordWonders aims to empower individuals by helping them achieve fluency in English, opening up new opportunities in both their personal and professional lives.',
	},
	{
		id: '07',
		title: 'Immersive Learning Environment',
		description:
			'Learners at WordWonders immerse themselves in a world of discovery and growth, which not only aids in language learning but also broadens their cultural understanding.',
	},
	{
		id: '08',
		title: 'Supportive Community',
		description:
			'Joining WordWonders means becoming part of a supportive community that is dedicated to helping you succeed in your language-learning journey.',
	},
	{
		id: '09',
		title: 'Unlimited Potential',
		description:
			'With WordWonders, your potential to learn and master English is limitless. The platform is designed to help you unlock your language potential and achieve your goals.',
	},
]

const Benefits = () => {
	return (
		<section className='mb-10'>
			<div className='container'>
				<h2 className='text-2xl lg:text-5xl font-bold text-center'>
					Our Benefits
				</h2>

				<ol className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 mt-10'>
					{benefirts.map(({ id, title, description }) => (
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
