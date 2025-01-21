import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

const plans = [
	{
		name: 'Basic',
		description: 'Essential features for individuals',
		price: '$9',
		features: ['5 Projects', 'Basic Analytics', '24/7 Support'],
	},
	{
		name: 'Pro',
		description: 'Perfect for professionals',
		price: '$19',
		features: [
			'Unlimited Projects',
			'Advanced Analytics',
			'Priority Support',
			'Custom Domain',
		],
	},
	{
		name: 'Enterprise',
		description: 'For large organizations',
		price: '$49',
		features: [
			'Everything in Pro',
			'Custom Solutions',
			'Dedicated Support',
			'SLA Agreement',
		],
	},
]

export default function PricingPage() {
	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold'>Pricing Plans</h1>
				<p className='text-muted-foreground'>
					Choose the perfect plan for your needs.
				</p>
			</div>
			<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
				{plans.map(plan => (
					<Card
						key={plan.name}
						className={cn(
							'flex flex-col',
							plan.name === 'Pro' && 'border-primary shadow-lg'
						)}
					>
						<CardHeader>
							<CardTitle>{plan.name}</CardTitle>
							<CardDescription>{plan.description}</CardDescription>
						</CardHeader>
						<CardContent className='flex-1'>
							<div className='text-3xl font-bold'>{plan.price}</div>
							<div className='text-sm text-muted-foreground'>per month</div>
							<ul className='mt-4 space-y-2'>
								{plan.features.map(feature => (
									<li key={feature} className='flex items-center'>
										<Check className='mr-2 h-4 w-4 text-primary' />
										{feature}
									</li>
								))}
							</ul>
						</CardContent>
						<CardFooter>
							<Button
								className='w-full'
								variant={plan.name === 'Pro' ? 'default' : 'outline'}
							>
								Get Started
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	)
}
