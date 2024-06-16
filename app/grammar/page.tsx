'use client'
import GrammarList from '@/components/grammar/grammar-list'
import { grammar } from '@/components/grammar/grammar.mock'
import { ScrollArea } from '@/components/ui/scroll-area'

const GrammarPage = () => {
	return (
		<main className='w-full min-h-[85vh] pt-[250px] bg-[url("/assets/images/grammar-bg.jpeg")] bg-cover bg-[-150px_-350px] lg:bg-[center_-400px] xl:bg-[center_-600px] bg-no-repeat'>
			<section className='mx-auto flex items-center justify-center'>
				<div className='container'>
					<ScrollArea className='w-full h-[400px] rounded-lg border p-4 bg-white dark:bg-black'>
						<GrammarList grammar={grammar} />
					</ScrollArea>
				</div>
			</section>
		</main>
	)
}

export default GrammarPage
