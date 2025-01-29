'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

export default function AccountPage() {
	const [profileImage, setProfileImage] = useState<string>(
		'https://picsum.photos/200'
	)

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = () => {
				if (reader.result) {
					setProfileImage(reader.result.toString())
				}
			}
			reader.readAsDataURL(file)
		}
	}

	return (
		<div className='container grid gap-6'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<h1 className='text-3xl font-bold'>Account Settings</h1>
				<p className='text-muted-foreground'>
					Manage your account settings and learning preferences
				</p>
			</motion.div>
			<div className='grid gap-6'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
					<Card className=''>
						<CardHeader>
							<CardTitle>Profile</CardTitle>
							<CardDescription>
								Update your profile information and avatar
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-6'>
							<div className='flex items-center gap-4'>
								<div className='relative'>
									<Image
										width={80}
										height={80}
										src={profileImage}
										alt='Avatar'
										className='md:h-20 md:w-20 rounded-full object-cover'
									/>
									<Button
										size='icon'
										variant='outline'
										className='absolute -bottom-2 -right-2 h-6 w-6 md:h-8 md:w-8 rounded-full'
									>
										<Camera className='h-4 w-4' />
										{/* Hidden file input for image upload */}
										<input
											type='file'
											accept='image/*'
											className='absolute inset-0 opacity-0 cursor-pointer'
											onChange={handleImageChange}
										/>
									</Button>
								</div>
								<div className='grid gap-1'>
									<h3 className='font-semibold'>Profile Picture</h3>
									<p className='text-sm text-muted-foreground'>
										Click the camera icon to update your profile picture
									</p>
								</div>
							</div>
							<Separator />
							<div className='grid gap-4'>
								<div className='grid gap-2'>
									<Label htmlFor='name'>Full Name</Label>
									<Input
										className='focus-visible:ring-1 focus-visible:ring-offset-1'
										id='name'
										placeholder='Enter your full name'
									/>
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='email'>Email</Label>
									<Input
										className='focus-visible:ring-1 focus-visible:ring-offset-1'
										id='email'
										type='email'
										placeholder='Enter your email'
									/>
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='language'>Preferred Language</Label>
									<Select>
										<SelectTrigger className='focus:ring-1 focus:ring-offset-1'>
											<SelectValue placeholder='Select language' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='en'>English</SelectItem>
											<SelectItem value='uz'>Uzbek</SelectItem>
											<SelectItem value='ru'>Russian</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className='flex justify-end'>
								<Button>Save Changes</Button>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</div>
	)
}
