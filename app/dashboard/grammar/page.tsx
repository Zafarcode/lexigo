import { grammar } from '@/app/source'
import { LibraryIcon } from 'lucide-react'
import { Card, Cards } from 'next-docs-ui/mdx/card'
import Image from 'next/image'

const Grammar = () => {
	const pages = grammar
		.getPages()
		.filter(page => page.data.published)
		.sort((a, b) => Number(a.data.sortedNumber) - Number(b.data.sortedNumber))

	return (
		<section className='pt-5'>
			<div className='container'>
				<h1 className='text-2xl lg:text-[40px] lg:leading-[48px] font-bold mb-10 text-center'>
					English Grammar
				</h1>

				<div className='flex flex-col-reverse lg:flex-row items-start justify-between gap-5 lg:gap-5'>
					<Cards className='w-full grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-3'>
						{pages.map(page => (
							<Card
								className='w-full hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800 grammar-card'
								key={page.url}
								href={page.url}
								icon={<LibraryIcon />}
								title={page.data.title}
								description={page.data.description ?? ''}
							/>
						))}
					</Cards>
					<Image
						className='w-full lg:w-[450px] h-auto'
						src='/assets/images/grammar.svg'
						width={450}
						height={200}
						alt='grammar'
						priority
					/>
				</div>
			</div>
		</section>
	)
}

export default Grammar
