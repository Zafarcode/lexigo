'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { notifications } from '@/constants/profile'

export default function NotificationsPage() {
	return (
		<div className='container grid gap-6'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='flex flex-wrap items-center justify-between'
			>
				<div>
					<h1 className='text-3xl font-bold'>Notifications</h1>
					<p className='text-muted-foreground'>
						Stay updated with your learning progress
					</p>
				</div>
				<Button variant='outline' size='sm'>
					Mark all as read
				</Button>
			</motion.div>
			<div className='grid gap-4'>
				{notifications.map((notification, index) => (
					<motion.div
						key={notification.id}
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: index * 0.1 }}
					>
						<Card>
							<CardHeader className='flex flex-row items-center gap-4'>
								<div className='rounded-full bg-primary/10 p-2'>
									<notification.icon className='h-4 w-4 text-primary' />
								</div>
								<div className='grid gap-1'>
									<CardTitle className='text-base'>
										{notification.title}
									</CardTitle>
									<CardDescription>{notification.description}</CardDescription>
								</div>
							</CardHeader>
							<CardContent>
								<p className='text-sm text-muted-foreground'>
									{notification.time}
								</p>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</div>
		</div>
	)
}
