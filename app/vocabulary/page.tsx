'use client'
import Nexus from '@/components/vocabulary/game-words/nexus'
import Module from '@/components/vocabulary/game-words/module'


const VocabularyPage = () => {
	return (
		<main className='pt-24 md:pt-28'>
			<div className='container'>
				<h1 className='text-2xl lg:text-[40px] lg:leading-[48px] font-bold text-center'>
					Vocabulary
				</h1>

				<Nexus />

				<Module />


			</div>
		</main>
	)
}

export default VocabularyPage
