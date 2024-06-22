'use client'
import GrammarList from '@/components/grammar/grammar-list'
import { grammar } from '@/components/grammar/grammar.mock'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'

const GrammarPage = () => {
	return (
		<main className='w-full pt-28 md:pt-20 pb-10 lg:pb-20'>
			<section>
				<div className='container'>
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
		</main>
	)
}

export default GrammarPage
