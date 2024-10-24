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
function generateBreadcrumbs(pathname: string): {label: string, to: string}[] {
	const pathnames: string[] = pathname.split('/').filter(Boolean) // split and remove empty
	return pathnames.map((value: string, index: number) => {
		const to = `/${pathnames.slice(0, index + 1).join('/')}` // Build the path for each part
		return { label: value, to }
	})
}

export default function DashboardBreadcrumb() {
	const pathname: string = usePathname()

	const breadcrumbs: { label: string, to: string }[] = generateBreadcrumbs(pathname)

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{breadcrumbs.map((breadcrumb, index) => (
					<React.Fragment key={breadcrumb.to}>
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
						{index !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
