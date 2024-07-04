'use client'
import Nexus from "@/components/games/nexus"
import WordGame from "@/components/games/nexusWords"
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

const VocabularyPage = () => {
	return (
		<main className='pt-24 md:pt-28'>
			<div className='container'>
				<h1 className='text-2xl lg:text-[40px] lg:leading-[48px] font-bold mb-10 text-center my-5'>
					Vocabulary
				</h1>
        
        		<Nexus />

				<ol className='flex flex-col gap-5 w-full max-w-2xl mx-auto'>
					<li>
						<Card>
							<CardHeader>
								<Progress value={0} />
							</CardHeader>
							<CardContent></CardContent>
							<CardFooter></CardFooter>
						</Card>
					</li>
				</ol>
			</div>
		</main>
	)
}

export default VocabularyPage
