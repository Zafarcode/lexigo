import Courses from '@/components/home/courses'
import CTA from '@/components/home/cta'
import Hero from '@/components/home/hero'
import Testimonials from '@/components/home/testimonials'

export default function Home() {
	return (
		<main className='pt-24 md:pt-20'>
			<Hero />
			<Courses />
			<Testimonials />
			<CTA />
		</main>
	)
}
