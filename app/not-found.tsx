import { buttonVariants } from '@/components/ui/button'
import { NotFoundIcon } from '@/components/utils/icons'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const NotFound = () => {
	return (
		<main className='w-full h-full pt-32 py-20'>
			<div className='container'>
				<div className='w-full h-full flex flex-col gap-10 justify-center items-center'>
					<NotFoundIcon className='w-full lg:w-[550px] h-auto' />

					<Link className={cn(buttonVariants())} href='/'>
						Back to Home
					</Link>
				</div>
			</div>
		</main>
	)
}

export default NotFound
