import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const GrammarItem = ({ name, slug }: { name: string; slug: string }) => {
	return (
		<li>
			<Link
				href={`/grammar/${slug}`}
				className={cn(
					buttonVariants({
						variant: 'outline',
						size: 'lg',
					}),
					'w-full text-xl visited:text-gray-400 font-semibold rounded-lg'
				)}
			>
				{name}
			</Link>
		</li>
	)
}

export default GrammarItem
