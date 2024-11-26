import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const CTA = () => {
	return (
		<section className='pb-10'>
			<div className='container'>
				<div className='flex flex-col items-center'>
					<h2 className='w-full max-w-96 text-2xl lg:text-[40px] lg:leading-[48px] font-bold mb-10 text-center bg-gradient-to-r from-primary from-30% dark:to-white to-black lg:to-secondary to-50% bg-clip-text text-transparent hover:to-primary'>
						Learn a language with WordWonders
					</h2>

					<Link
						className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}
						href='/auth/login'
					>
						Get Started
					</Link>
				</div>
			</div>
		</section>
	)
}

export default CTA
