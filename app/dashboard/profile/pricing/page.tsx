'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { plans } from '@/constants/profile'

export default function PricingPage() {
	return (
		<div className='container grid gap-6'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<h1 className='text-3xl font-bold'>Pricing Plans</h1>
				<p className='text-muted-foreground'>
					Choose the perfect plan for your learning journey
				</p>
			</motion.div>
			<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
				{plans.map((plan, index) => (
					<motion.div
						key={plan.name}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.2 }}
					>
						<Card className='h-full flex flex-col justify-between'>
							<div>
								<CardHeader>
									<CardTitle>{plan.name}</CardTitle>
									<CardDescription>{plan.description}</CardDescription>
								</CardHeader>
								<CardContent>
									<div className='text-3xl font-bold'>{plan.price}</div>
									<p className='text-sm text-muted-foreground'>per month</p>
									<ul className='mt-4 space-y-2'>
										{plan.features.map(feature => (
											<li key={feature} className='flex items-center text-sm'>
												<Check className='mr-2 h-4 w-4 text-primary' />
												{feature}
											</li>
										))}
									</ul>
								</CardContent>
							</div>
							<CardFooter className='justify-end'>
								<Button className='w-full'>Get Started</Button>
							</CardFooter>
						</Card>
					</motion.div>
				))}
			</div>
		</div>
	)
}
