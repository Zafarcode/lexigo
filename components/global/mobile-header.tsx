import { navList } from '@/components/global/site-header.mock'
import { ModeToggle } from '@/components/theme/mode-toggle'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { MenuIcon } from '@/components/utils/icons'
import Link from 'next/link'
import React from 'react'

const MobileHeader = () => {
	const [open, setOpen] = React.useState(false)

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger className='lg:hidden'>
				<MenuIcon />
			</SheetTrigger>
			<SheetContent className='flex flex-col justify-between'>
				<SheetHeader>
					<SheetTitle className='text-primary'>WordWonders</SheetTitle>
					<SheetDescription>
						Unlock Your Language Potential with WordWonders: Where English
						Learning Becomes an Adventure!
					</SheetDescription>
				</SheetHeader>

				<ul className='flex flex-col items-center gap-5'>
					{navList.map(item => (
						<li key={item.id}>
							<Link
								className='text-lg font-normal px-0 hover:text-primary'
								href={item.href}
								onClick={() => setOpen(false)}
							>
								{item.label}
							</Link>
						</li>
					))}
				</ul>

				<SheetFooter>
					<ModeToggle />
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}

export default MobileHeader
