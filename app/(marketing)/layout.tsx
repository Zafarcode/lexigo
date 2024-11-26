'use client'

import SiteFooter from '@/components/common/site-footer'
import SiteHeader from '@/components/common/site-header'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	const session = useSession()
	const router = useRouter()

	useEffect(() => {
		if (session.status === 'authenticated') {
			router.push('/dashboard')
		}
	}, [router, session.status])

	return (
		<main className='flex-1 pt-20 md:pt-24 pb-3 lg:pb-10'>
			<SiteHeader />
			{children}
			<SiteFooter />
		</main>
	)
}

export default HomeLayout
