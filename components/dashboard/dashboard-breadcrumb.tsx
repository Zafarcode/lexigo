'use client'

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { usePathname } from 'next/navigation'
import React from 'react'

// Helper to generate the breadcrumb paths
function generateBreadcrumbs(pathname: string) {
	const pathnames = pathname.split('/').filter(Boolean) // split and remove empty
	return pathnames.map((value: string, index: number) => {
		const to = `/${pathnames.slice(0, index + 1).join('/')}` // Build the path for each part
		return { label: value, to }
	})
}

export default function DashboardBreadcrumb() {
	const pathname = usePathname()

	const breadcrumbs = generateBreadcrumbs(pathname)

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href='/'>Home</BreadcrumbLink>
				</BreadcrumbItem>
				{breadcrumbs.map((breadcrumb, index) => (
					<React.Fragment key={breadcrumb.to}>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							{index === breadcrumbs.length - 1 ? (
								<BreadcrumbPage className='capitalize'>
									{breadcrumb.label}
								</BreadcrumbPage>
							) : (
								<BreadcrumbLink className='capitalize' href={breadcrumb.to}>
									{breadcrumb.label}
								</BreadcrumbLink>
							)}
						</BreadcrumbItem>
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
