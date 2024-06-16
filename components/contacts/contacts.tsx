'use client'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import Socials from '@/components/utils/socials'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Name must be at least 2 characters.',
	}),
	email: z.string().email({
		message: 'Please enter a valid email address.',
	}),
	message: z.string().min(5, {
		message: 'Message must be at least 5 characters.',
	}),
})

const Contacts = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			message: '',
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const formattedMessage = `
**Name:** ${values.name}
**Email:** ${values.email}
**Message:** ${values.message}
`

		const encodedMessage = encodeURIComponent(formattedMessage)
		const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
		const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID
		const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodedMessage}`

		try {
			await fetch(url)
				.then(res => res.json())
				.then(data => {
					toast({
						title: 'Your message has been sent!',
						description: 'Your message has been sent to our team. Thank you!',
					})

					if (data.ok) {
						form.reset()
					}
				})
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Error',
				description:
					'There was an error sending your message. Please try again.',
			})
		}
	}

	return (
		<section className='relative'>
			<div className='container px-5 py-10 lg:py-24 mx-auto'>
				<div className='flex flex-col text-center w-full mb-12'>
					<h1 className='sm:text-3xl text-2xl font-medium mb-4'>Contact Us</h1>
					<p className='lg:w-2/3 mx-auto leading-relaxed text-base'>
						We are always open to connect with you.
					</p>
				</div>
				<div className='lg:w-1/2 md:w-2/3 mx-auto'>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='flex flex-wrap'
						>
							<div className='w-full mb-2 lg:mb-0 lg:w-1/2 lg:pr-2'>
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input className='dark:border-white' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='w-full mb-2 lg:mb-0 lg:w-1/2 lg:pl-2'>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													className='dark:border-white'
													type='email'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='w-full mb-3 lg:my-3'>
								<FormField
									control={form.control}
									name='message'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Message</FormLabel>
											<FormControl>
												<Textarea className='dark:border-white' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className='w-full flex justify-center'>
								<Button type='submit'>Submit</Button>
							</div>
						</form>
					</Form>

					<div className='flex flex-col items-center p-2 w-full mt-8 border-t border-gray-200 text-center'>
						<p className='leading-normal my-5'>
							Toshkent shahar, Amir Temur k.
						</p>

						<Socials />
					</div>
				</div>
			</div>
		</section>
	)
}

export default Contacts
