import { Bell, Settings } from 'lucide-react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export default function NotificationsPage() {
	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold'>Notifications</h1>
				<p className='text-muted-foreground'>
					Manage your notification preferences.
				</p>
			</div>
			<div className='grid gap-6'>
				<Card>
					<CardHeader>
						<CardTitle>Notification Settings</CardTitle>
						<CardDescription>
							Choose what notifications you want to receive.
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='flex items-center justify-between space-x-2'>
							<div className='flex items-center space-x-4'>
								<Bell className='h-5 w-5' />
								<div>
									<Label htmlFor='push'>Push Notifications</Label>
									<p className='text-sm text-muted-foreground'>
										Receive notifications even when you are not active.
									</p>
								</div>
							</div>
							<Switch id='push' />
						</div>
						<div className='flex items-center justify-between space-x-2'>
							<div className='flex items-center space-x-4'>
								<Settings className='h-5 w-5' />
								<div>
									<Label htmlFor='email'>Email Notifications</Label>
									<p className='text-sm text-muted-foreground'>
										Get important updates via email.
									</p>
								</div>
							</div>
							<Switch id='email' />
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
