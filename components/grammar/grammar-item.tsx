import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const GrammarItem = ({
	id,
	name,
	slug,
}: {
	id: number
	name: string
	slug: string
}) => {
	return (
		<li>
			<Link
				href={`/grammar/${slug}`}
				className={cn(
					buttonVariants({
						variant: 'outline',
						size: 'lg',
					}),
					'w-full text-lg justify-start visited:text-gray-400 rounded-lg'
				)}
			>
				{name}
			</Link>
		</li>
	)
}

export default GrammarItem
