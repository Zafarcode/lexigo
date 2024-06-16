import GrammarItem from './grammar-item'
import IGrammar from './grammar.types'

const GrammarList = ({ grammar }: { grammar: IGrammar[] }) => {
	return (
		<ul className='grid grid-cols-1 md:grid-cols-2 gap-5'>
			{grammar.map((item: IGrammar) => (
				<GrammarItem key={item.id} {...item} />
			))}
		</ul>
	)
}

export default GrammarList
