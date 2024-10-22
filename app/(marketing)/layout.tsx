import SiteFooter from '@/components/global/site-footer'
import SiteHeader from '@/components/global/site-header'
import React from 'react'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className='flex-1 pt-20 md:pt-24 pb-3 lg:pb-10'>
			<SiteHeader />
			{children}
			<SiteFooter />
		</main>
	)
}

export default HomeLayout
