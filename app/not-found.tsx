import { NotFoundIcon } from '@/components/utils/icons'
import Link from 'next/link'

const NotFound = () => {
	return (
		<main className='w-full h-full py-20'>
			<div className='container'>
				<div className='w-full h-full flex flex-col gap-10 justify-center items-center'>
					<NotFoundIcon className='w-full lg:w-[750px] h-auto' />

					<Link
						className='text-sm lg:text-2xl hover:text-primary hover:underline'
						href='/'
					>
						Back to Home
					</Link>
				</div>
			</div>
		</main>
	)
}

export default NotFound
