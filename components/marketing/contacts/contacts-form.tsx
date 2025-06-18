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
		message: 'Ism kamida 2 ta belgidan iborat bo‘lishi kerak.',
	}),
	email: z.string().email({
		message: 'Iltimos, haqiqiy email manzilini kiriting.',
	}),
	message: z.string().min(5, {
		message: 'Xabar kamida 5 ta belgidan iborat bo‘lishi kerak.',
	}),
})

const ContactsForm = () => {
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
**Ism:** ${values.name}
**Email:** ${values.email}
**Xabar:** ${values.message}
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
						title: 'Xabaringiz yuborildi!',
						description: 'Xabaringiz jamoamizga yetkazildi. Rahmat!',
					})

					if (data.ok) {
						form.reset()
					}
				})
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Xato',
				description:
					'Xabarni yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.',
			})
		}
	}

	return (
		<section className='relative'>
			<div className='container px-5 py-10 lg:py-24 mx-auto'>
				<div className='flex flex-col text-center w-full mb-12'>
					<h1 className='sm:text-3xl text-2xl font-medium mb-4'>
						Biz bilan bog‘laning
					</h1>
					<p className='lg:w-2/3 mx-auto leading-relaxed text-base'>
						Doimo siz bilan aloqa qilishga tayyormiz.
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
											<FormLabel>Ism</FormLabel>
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
											<FormLabel>Xabar</FormLabel>
											<FormControl>
												<Textarea className='dark:border-white' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className='w-full flex justify-center'>
								<Button type='submit'>Yuborish</Button>
							</div>
						</form>
					</Form>

					<div className='flex flex-col items-center p-2 w-full mt-8 border-t border-gray-200 text-center'>
						<p className='leading-normal my-5'>
							Toshkent shahar, Mirobod Tumani, Temir yo`lchilar ko`chasi
						</p>

						<Socials />
					</div>
				</div>
			</div>
		</section>
	)
}

export default ContactsForm
