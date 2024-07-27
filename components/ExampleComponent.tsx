import useTTS from '@/hooks/useTTS'
import React from 'react'

const ExampleComponent: React.FC = () => {
	const { handleNormalSpeech, handleSlowSpeech } = useTTS('Bread')

	return (
		<div>
			<button onClick={handleNormalSpeech}>Play Normal</button>
			<button onClick={handleSlowSpeech}>Play Slow</button>
		</div>
	)
}

export default ExampleComponent
