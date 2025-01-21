import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

export default function SettingsPage() {
	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold'>Settings</h1>
				<p className='text-muted-foreground'>
					Manage your account settings and preferences.
				</p>
			</div>

			<Tabs defaultValue='general' className='space-y-4'>
				<TabsList>
					<TabsTrigger value='general'>General</TabsTrigger>
					<TabsTrigger value='appearance'>Appearance</TabsTrigger>
					<TabsTrigger value='notifications'>Notifications</TabsTrigger>
					<TabsTrigger value='security'>Security</TabsTrigger>
				</TabsList>

				<TabsContent value='general' className='space-y-4'>
					<Card>
						<CardHeader>
							<CardTitle>Profile Settings</CardTitle>
							<CardDescription>
								Update your personal information and preferences.
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='grid gap-4 md:grid-cols-2'>
								<div className='space-y-2'>
									<Label htmlFor='name'>Display Name</Label>
									<Input id='name' placeholder='Enter your name' />
								</div>
								<div className='space-y-2'>
									<Label htmlFor='username'>Username</Label>
									<Input id='username' placeholder='@username' />
								</div>
								<div className='space-y-2'>
									<Label htmlFor='email'>Email</Label>
									<Input
										id='email'
										type='email'
										placeholder='Enter your email'
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='language'>Language</Label>
									<Select>
										<SelectTrigger id='language'>
											<SelectValue placeholder='Select language' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='en'>English</SelectItem>
											<SelectItem value='fr'>French</SelectItem>
											<SelectItem value='de'>German</SelectItem>
											<SelectItem value='es'>Spanish</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className='flex justify-end'>
								<Button>Save Changes</Button>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value='appearance' className='space-y-4'>
					<Card>
						<CardHeader>
							<CardTitle>Appearance Settings</CardTitle>
							<CardDescription>
								Customize how the dashboard looks and feels.
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='space-y-4'>
								<div className='flex items-center justify-between'>
									<div className='space-y-0.5'>
										<Label htmlFor='dark-mode'>Dark Mode</Label>
										<p className='text-sm text-muted-foreground'>
											Toggle dark mode on or off
										</p>
									</div>
									<Switch id='dark-mode' />
								</div>
								<Separator />
								<div className='flex items-center justify-between'>
									<div className='space-y-0.5'>
										<Label htmlFor='dense-mode'>Dense Mode</Label>
										<p className='text-sm text-muted-foreground'>
											Show more content by reducing padding
										</p>
									</div>
									<Switch id='dense-mode' />
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value='security' className='space-y-4'>
					<Card>
						<CardHeader>
							<CardTitle>Security Settings</CardTitle>
							<CardDescription>
								Manage your security preferences and two-factor authentication.
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='space-y-4'>
								<div className='flex items-center justify-between'>
									<div className='space-y-0.5'>
										<Label>Two-Factor Authentication</Label>
										<p className='text-sm text-muted-foreground'>
											Add an extra layer of security to your account
										</p>
									</div>
									<Button variant='outline'>Enable 2FA</Button>
								</div>
								<Separator />
								<div className='space-y-4'>
									<Label>Change Password</Label>
									<div className='grid gap-4'>
										<Input type='password' placeholder='Current password' />
										<Input type='password' placeholder='New password' />
										<Input type='password' placeholder='Confirm new password' />
									</div>
									<Button>Update Password</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value='notifications' className='space-y-4'>
					<Card>
						<CardHeader>
							<CardTitle>Email Preferences</CardTitle>
							<CardDescription>
								Choose what types of emails you want to receive.
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='space-y-4'>
								<div className='flex items-center justify-between'>
									<div className='space-y-0.5'>
										<Label>Marketing Emails</Label>
										<p className='text-sm text-muted-foreground'>
											Receive emails about new products and features
										</p>
									</div>
									<Switch />
								</div>
								<Separator />
								<div className='flex items-center justify-between'>
									<div className='space-y-0.5'>
										<Label>Security Updates</Label>
										<p className='text-sm text-muted-foreground'>
											Important notifications about your account security
										</p>
									</div>
									<Switch defaultChecked />
								</div>
								<Separator />
								<div className='flex items-center justify-between'>
									<div className='space-y-0.5'>
										<Label>Account Activity</Label>
										<p className='text-sm text-muted-foreground'>
											Get notified about account login activity
										</p>
									</div>
									<Switch defaultChecked />
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
