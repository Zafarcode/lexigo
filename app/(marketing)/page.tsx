'use client'
import Courses from '@/components/home/courses'
import CTA from '@/components/home/cta'
import Hero from '@/components/home/hero'
import Testimonials from '@/components/home/testimonials'
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
