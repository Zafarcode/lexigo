'use client'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const GrammarDetail = ({ params: { slug } }: { params: { slug: string } }) => {
	const router = useRouter()

	return (
		<section>
			<div className='container'>
				<div className='flex flex-col lg:flex-row items-start justify-center gap-5 lg:gap-10'>
					<Button className='gap-2' onClick={() => router.back()}>
						<ArrowLeft /> <span>Back</span>
					</Button>

					<div className='flex flex-col space-y-3'>
						<h1 className='text-2xl'>{slug}</h1>

						<hr />

						<p>
							{slug} {slug} {slug} {slug} {slug} {slug} {slug} {slug} {slug}
							{slug} {slug} {slug}
							{slug} {slug} {slug} {slug}
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default GrammarDetail
