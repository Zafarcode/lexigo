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

export default function ProfilePage() {
	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold'>Profile</h1>
				<p className='text-muted-foreground'>
					Manage your account settings and preferences.
				</p>
			</div>
			<div className='grid gap-6 md:grid-cols-2'>
				<Card>
					<CardHeader>
						<CardTitle>Personal Information</CardTitle>
						<CardDescription>
							Update your personal details here.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='name'>Name</Label>
								<Input id='name' placeholder='Enter your name' />
							</div>
							<div className='space-y-2'>
								<Label htmlFor='email'>Email</Label>
								<Input id='email' type='email' placeholder='Enter your email' />
							</div>
							<Button>Save Changes</Button>
						</form>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Account Type</CardTitle>
						<CardDescription>Your current subscription plan.</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='rounded-lg bg-secondary p-4'>
							<div className='text-lg font-semibold'>Pro Plan</div>
							<div className='text-sm text-muted-foreground'>
								All features included
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
