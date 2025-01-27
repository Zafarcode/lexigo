'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, CreditCard, Settings, User } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

	const routes = [
		{
			href: '/profile',
			label: 'Profile',
			icon: User,
		},
		{
			href: '/profile/notifications',
			label: 'Notifications',
			icon: Bell,
		},
		{
			href: '/profile/pricing',
			label: 'Pricing',
			icon: CreditCard,
		},
		{
			href: '/profile/settings',
			label: 'Settings',
			icon: Settings,
		},
	]

export function Sidebar({ className, ...props }: SidebarProps) {
	const pathname = usePathname()

	return (
		<aside
			className={cn('border-r bg-gray-100/40 pb-12', className)}
			{...props}
		>
			<div className='px-4 py-6'>
				<h2 className='mb-4 px-2 text-lg font-semibold tracking-tight'>
					Account
				</h2>
				<nav className='space-y-1'>
					{routes.map(route => (
						<Button
							key={route.href}
							asChild
							variant={pathname === route.href ? 'default' : 'ghost'}
							className='w-full justify-start'
						>
							<Link href={route.href}>
								<route.icon className='mr-2 h-4 w-4' />
								{route.label}
							</Link>
						</Button>
					))}
				</nav>
			</div>
		</aside>
	)
}
