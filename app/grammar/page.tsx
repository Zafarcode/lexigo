'use client'
import GrammarList from '@/components/grammar/grammar-list'
import { grammar } from '@/components/grammar/grammar.mock'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'

const Grammar = () => {
	return (
		<section className='pt-5'>
			<div className='container'>
				<h1 className='text-2xl lg:text-[40px] lg:leading-[48px] font-bold mb-10 text-center'>
					Grammar
				</h1>
				<div className='flex flex-col-reverse lg:flex-row gap-5 lg:gap-28'>
					<ScrollArea className='w-full lg:w-1/2 h-[400px] rounded-lg border p-4 bg-white dark:bg-black'>
						<GrammarList grammar={grammar} />
					</ScrollArea>

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
