'use client'

import { ChevronRight, type LucideIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useMemo, useState } from 'react'

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from '@/components/ui/sidebar'

export function NavMain({
	items,
}: {
	items: {
		title: string
		url: string
		icon?: LucideIcon
		items?: { title: string; url: string }[]
	}[]
}) {
	const pathname = usePathname()
	const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

	const isActiveItem = useMemo(
		() => (item: { url: string; items?: { url: string }[] }) =>
			item.url === pathname ||
			item.items?.some(subItem => subItem.url === pathname),
		[pathname]
	)

	const isActiveSubItem = useMemo(
		() => (url: string) => url === pathname,
		[pathname]
	)

	const toggleCollapse = (title: string) => {
		setOpenItems(prev => ({ ...prev, [title]: !prev[title] }))
	}

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Learn</SidebarGroupLabel>
			<SidebarMenu>
				{items.map(item => {
					const isItemActive = isActiveItem(item)
					const isOpen = openItems[item.title] ?? isItemActive

					return item.items?.length ? (
						<Collapsible
							key={item.title}
							asChild
							open={isOpen}
							className='group/collapsible'
						>
							<SidebarMenuItem>
								<CollapsibleTrigger
									asChild
									onClick={() => toggleCollapse(item.title)}
								>
									<SidebarMenuButton
										tooltip={item.title}
										isActive={isItemActive}
										className={isItemActive ? 'text-primary' : ''}
									>
										{item.icon && (
											<item.icon
												className={isItemActive ? 'text-primary' : ''}
											/>
										)}
										<span className={isItemActive ? 'text-primary' : ''}>
											{item.title}
										</span>
										<ChevronRight
											className={`ml-auto transition-transform duration-200 ${
												isOpen ? 'rotate-90' : ''
											}`}
										/>
									</SidebarMenuButton>
								</CollapsibleTrigger>
								<CollapsibleContent>
									<SidebarMenuSub>
										{item.items.map(subItem => (
											<SidebarMenuSubItem key={subItem.title}>
												<SidebarMenuSubButton
													asChild
													isActive={isActiveSubItem(subItem.url)}
													className={
														isActiveSubItem(subItem.url) ? 'text-primary' : ''
													}
												>
													<a href={subItem.url}>
														<span>{subItem.title}</span>
													</a>
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										))}
									</SidebarMenuSub>
								</CollapsibleContent>
							</SidebarMenuItem>
						</Collapsible>
					) : (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								asChild
								tooltip={item.title}
								isActive={isItemActive}
								className={isItemActive ? 'text-primary' : ''}
							>
								<a href={item.url}>
									{item.icon && (
										<item.icon className={isItemActive ? 'text-primary' : ''} />
									)}
									<span className={isItemActive ? 'text-primary' : ''}>
										{item.title}
									</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					)
				})}
			</SidebarMenu>
		</SidebarGroup>
	)
}
