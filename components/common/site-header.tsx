'use client'
import MobileHeader from '@/components/common/mobile-header'
import { icons, navList, skillList } from '@/components/common/site-header.mock'
import { ModeToggle } from '@/components/theme/mode-toggle'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SiteHeader = () => {
	const pathname = usePathname()
	const [active, setActive] = React.useState('reading')
	const { theme } = useTheme()

	const logoSrc =
		theme === 'dark'
			? '/assets/icons/logolight.png'
			: '/assets/icons/logodark.png'

	return (
		<header className='py-5 shadow-sm dark:border-b fixed top-0 left-0 right-0 dark:bg-black bg-white z-10'>
			<div className='container'>
				<div className='flex items-center justify-between'>
					<Link href='/'>
						<Image src={logoSrc} alt='Logo' width={100} height={100} />
					</Link>

					<div className='flex items-center gap-14'>
						<NavigationMenu className='hidden lg:flex'>
							<NavigationMenuList className='gap-5'>
								{navList.map(item =>
									item.href === '/skills' ? (
										<NavigationMenuItem key={item.id}>
											<NavigationMenuTrigger className='lg:text-lg font-normal px-0'>
												{item.label}
											</NavigationMenuTrigger>
											<NavigationMenuContent
												className='flex px-5'
												onMouseLeave={() => setActive('reading')}
											>
												<div>
													{icons[active]}
													<span className='sr-only'>{active}</span>
												</div>
												<ul className='flex flex-col justify-center gap-2 py-3 px-5'>
													{skillList.map(item => (
														<li key={item.id}>
															<Link
																className='text-lg hover:text-primary'
																href={item.href}
																onMouseOver={() => setActive(item.icon)}
															>
																{item.label}
															</Link>
														</li>
													))}
												</ul>
											</NavigationMenuContent>
										</NavigationMenuItem>
									) : (
										<NavigationMenuItem key={item.id}>
											<Link
												className={cn(
													"relative hover:text-primary before:content-[''] before:w-0 before:h-[2px] before:mx-auto before:bg-primary before:transition-all before:duration-300 hover:before:w-full before:absolute  before:left-0 before:right-0 before:bottom-0 lg:text-lg",
													pathname === item.href && 'text-primary'
												)}
												href={item.href}
											>
												{item.label}
											</Link>
										</NavigationMenuItem>
									)
								)}
							</NavigationMenuList>
						</NavigationMenu>

						<div className='flex items-center gap-3'>
							<span className='hidden lg:block'>
								<ModeToggle />
							</span>

							<MobileHeader />
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default SiteHeader
