interface Option {
	id: string
	image: string
	label: string
}

interface QuizStep {
	id: number
	word: string
	question: string
	options: Option[]
	correct: string
}

export const quizData: QuizStep[] = [
	{
		id: 1,
		word: 'le chat',
		question: 'Select the correct image',
		options: [
			{
				id: 'cat',
				image: 'https://picsum.photos/203',
				label: 'the cat',
			},
			{
				id: 'alien',
				image: 'https://picsum.photos/202',
				label: 'the alien',
			},
			{
				id: 'ant',
				image: 'https://picsum.photos/201',
				label: 'the ant',
			},
			{
				id: 'ball',
				image: 'https://picsum.photos/200',
				label: 'the ball',
			},
		],
		correct: 'cat',
	},
	{
		id: 2,
		word: '2',
		question: 'Select the correct image',
		options: [
			{
				id: 'cat',
				image: 'https://picsum.photos/203',
				label: 'the cat',
			},
			{
				id: 'alien',
				image: 'https://picsum.photos/202',
				label: 'the alien',
			},
			{
				id: 'ant',
				image: 'https://picsum.photos/201',
				label: 'the ant',
			},
			{
				id: 'ball',
				image: 'https://picsum.photos/200',
				label: 'the ball',
			},
		],
		correct: 'cat',
	},
	{
		id: 3,
		word: '3',
		question: 'Select the correct image',
		options: [
			{
				id: 'cat',
				image: 'https://picsum.photos/203',
				label: 'the cat',
			},
			{
				id: 'alien',
				image: 'https://picsum.photos/202',
				label: 'the alien',
			},
			{
				id: 'ant',
				image: 'https://picsum.photos/201',
				label: 'the ant',
			},
			{
				id: 'ball',
				image: 'https://picsum.photos/200',
				label: 'the ball',
			},
		],
		correct: 'cat',
	},
	{
		id: 4,
		word: '4',
		question: 'Select the correct image',
		options: [
			{
				id: 'cat',
				image: 'https://picsum.photos/203',
				label: 'the cat',
			},
			{
				id: 'alien',
				image: 'https://picsum.photos/202',
				label: 'the alien',
			},
			{
				id: 'ant',
				image: 'https://picsum.photos/201',
				label: 'the ant',
			},
			{
				id: 'ball',
				image: 'https://picsum.photos/200',
				label: 'the ball',
			},
		],
		correct: 'cat',
	},
	{
		id: 5,
		word: '5',
		question: 'Select the correct image',
		options: [
			{
				id: 'cat',
				image: 'https://picsum.photos/203',
				label: 'the cat',
			},
			{
				id: 'alien',
				image: 'https://picsum.photos/202',
				label: 'the alien',
			},
			{
				id: 'ant',
				image: 'https://picsum.photos/201',
				label: 'the ant',
			},
			{
				id: 'ball',
				image: 'https://picsum.photos/200',
				label: 'the ball',
			},
		],
		correct: 'cat',
	},
	{
		id: 6,
		word: '5',
		question: 'Select the correct image',
		options: [
			{
				id: 'cat',
				image: 'https://picsum.photos/203',
				label: 'the cat',
			},
			{
				id: 'alien',
				image: 'https://picsum.photos/202',
				label: 'the alien',
			},
			{
				id: 'ant',
				image: 'https://picsum.photos/201',
				label: 'the ant',
			},
			{
				id: 'ball',
				image: 'https://picsum.photos/200',
				label: 'the ball',
			},
		],
		correct: 'cat',
	},
]
