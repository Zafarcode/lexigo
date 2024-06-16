import GrammarT from "./grammar-item.types"
import GrammerItem from "./grammer-item"

const GrammerList = ({ grammar }: { grammar: GrammarT[] }) => {
	return <ul className='grid grid-cols-1 md:grid-cols-2 gap-5'>
		{grammar.map((item: GrammarT) => (
			<GrammerItem key={item.id} {...item} />
		))}
	</ul>
}

export default GrammerList
