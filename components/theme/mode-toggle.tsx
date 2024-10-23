'use client'
import { CheckIcon, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoonIcon, SunIcon, SystemIcon } from '@/components/utils/icons'

export function ModeToggle() {
	const { setTheme, theme } = useTheme()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon'>
					<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
					<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem
					className='flex justify-between items-center'
					onClick={() => setTheme('light')}
				>
					<span className='flex gap-2'>
						<SunIcon width={20} height={20} /> Light
					</span>
					{theme === 'light' && <CheckIcon className='h-4 w-4' />}
				</DropdownMenuItem>
				<DropdownMenuItem
					className='flex justify-between items-center'
					onClick={() => setTheme('dark')}
				>
					<span className='flex gap-2'>
						<MoonIcon width={20} height={20} /> Dark
					</span>
					{theme === 'dark' && <CheckIcon className='h-4 w-4' />}
				</DropdownMenuItem>
				<DropdownMenuItem
					className='flex justify-between items-center'
					onClick={() => setTheme('system')}
				>
					<span className='flex gap-2'>
						<SystemIcon width={20} height={20} /> System
					</span>
					{theme === 'system' && <CheckIcon className='h-4 w-4' />}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
