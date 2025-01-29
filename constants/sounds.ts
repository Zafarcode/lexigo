interface Pronunciation {
	symbol: string
	example: string
	image?: string
}

export const pronunciations: Pronunciation[] = [
	{ symbol: 'ɑ', example: 'hot' },
	{ symbol: 'æ', example: 'cat' },
	{ symbol: 'ʌ', example: 'but' },
	{ symbol: 'ɛ', example: 'bed' },
	{ symbol: 'eɪ', example: 'say' },
	{ symbol: 'ɜː', example: 'bird' },
	{ symbol: 'ɪ', example: 'ship' },
	{ symbol: 'iː', example: 'sheep' },
	{ symbol: 'ə', example: 'about' },
	{ symbol: 'əʊ', example: 'boat' },
	{ symbol: 'ʊ', example: 'foot' },
	{ symbol: 'uː', example: 'food' },
	{ symbol: 'aʊ', example: 'cow' },
	{ symbol: 'aɪ', example: 'time' },
	{ symbol: 'ɔɪ', example: 'boy' },
]

export const consonantPronunciations: Pronunciation[] = [
	{ symbol: 'b', example: 'book' },
	{ symbol: 'tʃ', example: 'chair' },
	{ symbol: 'd', example: 'day' },
	{ symbol: 'f', example: 'fish' },
	{ symbol: 'g', example: 'go' },
	{ symbol: 'h', example: 'home' },
	{ symbol: 'dʒ', example: 'job' },
	{ symbol: 'k', example: 'key' },
	{ symbol: 'l', example: 'lion' },
	{ symbol: 'm', example: 'moon' },
	{ symbol: 'n', example: 'nose' },
	{ symbol: 'ŋ', example: 'sing' },
	{ symbol: 'p', example: 'pig' },
	{ symbol: 'r', example: 'red' },
	{ symbol: 's', example: 'see' },
	{ symbol: 'ʒ', example: 'measure' },
	{ symbol: 'ʃ', example: 'shoe' },
	{ symbol: 't', example: 'time' },
	{ symbol: 'ð', example: 'then' },
	{ symbol: 'θ', example: 'think' },
	{ symbol: 'v', example: 'very' },
	{ symbol: 'w', example: 'water' },
	{ symbol: 'j', example: 'you' },
	{ symbol: 'z', example: 'zoo' },
]
