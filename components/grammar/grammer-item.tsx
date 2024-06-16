const GrammerItem = ({ name, slug }: { name: string, slug: string }) => {
	return <li
		className='flex flex-col items-start hover:bg-gray-700 hover:text-white border rounded'
	>
		<a
			href={`/grammer/${slug}`}
			className='text-xl visited:text-gray-400 font-semilbold w-full py-2 px-3 '
		>
			{name}
		</a>
	</li>
}

export default GrammerItem
