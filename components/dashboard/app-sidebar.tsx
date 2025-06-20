'use client'

import {
	Book,
	BookOpen,
	GalleryVerticalEnd,
	ShieldCheckIcon,
	Speech,
} from 'lucide-react'
import * as React from 'react'

import { NavMain } from '@/components/dashboard/nav-main'
import { NavUser } from '@/components/dashboard/nav-user'
import { TeamSwitcher } from '@/components/dashboard/team-switcher'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from '@/components/ui/sidebar'
import { ModeToggle } from '../theme/mode-toggle'

// This is sample data.
const data = {
	user: {
		name: 'Dilshodbek Hasanov',
		email: 'dilshodbek.khasanov@gmail.com',
		avatar: '/avatars/shadcn.jpg',
	},
	teams: [
		{
			name: 'Dilshodbek Hasanov',
			logo: GalleryVerticalEnd,
			plan: 'Pro',
		},
	],
	navMain: [
		{
			title: 'Grammar',
			url: '/dashboard/grammar',
			icon: Book,
		},
		{
			title: 'Vocabulary',
			url: '/dashboard/vocabulary',
			icon: BookOpen,
		},
		{
			title: 'Sounds',
			url: '/dashboard/characters',
			icon: Speech,
		},
		{
			title: 'Leaderboard',
			url: '/dashboard/leaderboard',
			icon: ShieldCheckIcon,
		},
	],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible='icon' {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<ModeToggle />
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
