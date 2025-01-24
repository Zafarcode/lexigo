'use client'
import Courses from '@/components/marketing/home/courses'
import CTA from '@/components/marketing/home/cta'
import Hero from '@/components/marketing/home/hero'
import Testimonials from '@/components/marketing/home/testimonials'

import AOS from 'aos'
import 'aos/dist/aos.css'
import React from 'react'

export default function Home() {
	React.useEffect(() => {
		AOS.init()
	}, [])

	return (
		<>
			<Hero />
			<Courses />
			<Testimonials />
			<CTA />
		</>
	)
}
