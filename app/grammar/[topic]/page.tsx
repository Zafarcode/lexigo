'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const GrammarDetailPage = ({
	params: { topic },
}: {
	params: { topic: string }
}) => {
	const router = useRouter()

	return (
		<main className='pt-28 md:pt-36 pb-10 lg:pb-10'>
			<div className='container'>
				<section className='flex flex-col lg:flex-row items-start justify-center gap-5 lg:gap-10'>
					<Button onClick={() => router.back()}>Back to Grammar</Button>

					<div className='flex flex-col space-y-3'>
						<h1 className='text-2xl'>{topic}</h1>

						<hr />

						<p>
							{topic} {topic} {topic} {topic} {topic} {topic} {topic} {topic}{' '}
							{topic} {topic} {topic} {topic} {topic}{' '}
						</p>
					</div>
				</section>
			</div>
		</main>
	)
}

export default GrammarDetailPage
