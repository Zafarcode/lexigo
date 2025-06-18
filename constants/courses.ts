export const images: Record<string, string> = {
	vocabulary: '/assets/images/words.svg',
	game: '/assets/images/game.svg',
	grammar: '/assets/images/grammar.svg',
	reading: '/assets/icons/reading.svg',
	listening: '/assets/icons/listening.svg',
	speaking: '/assets/icons/speaking.svg',
	writing: '/assets/icons/writing.svg',
	test: '/assets/images/online-test.svg',
}

export const courses: {
	id: number
	title: string
	description: string
	icon: string
}[] = [
	{
		id: 1,
		title: 'Vocabulary',
		description:
			'Leksika bo‘limimiz bilan so‘z va iboralaringiz boyligini oshiring. Darslarimiz yangi so‘zlarni tushunish va yodlab qolishingizga yordam beradi, til ko‘nikmalaringizni boyitadi.',
		icon: 'vocabulary',
	},
	{
		id: 2,
		title: 'Vocabulary Game',
		description:
			'Interaktiv o‘yinlarimiz bilan o‘rganishni qiziqarli qiling. Bu o‘yinlar so‘z bilimlaringizni mustahkamlashga yordam beradi va o‘rganganlaringizni eslab qolishingizni ta’minlaydi.',
		icon: 'game',
	},
	{
		id: 3,
		title: 'Grammar',
		description:
			'Ingliz tilining qoidalarini batafsil tushuntiradigan grammatika darslarimiz bilan mukammallikka erishing. Aniq tushuntirishlar va amaliy misollar eng murakkab tushunchalarni ham tushunishingizga yordam beradi.',
		icon: 'grammar',
	},
	{
		id: 4,
		title: 'Reading',
		description:
			'Turmush darajangizga mos matnlar bilan o‘qish ko‘nikmalaringizni rivojlantiring. Mashqlarimiz tushunish, tezlik va inglizcha matnlarni umumiy tushunish qobiliyatingizni oshiradi.',
		icon: 'reading',
	},
	{
		id: 5,
		title: 'Listening',
		description:
			'Turli audio materiallar orqali tinglash ko‘nikmalaringizni rivojlantiring. Oddiy suhbatlardan tortib murakkab ma’ruzalarigacha bo‘lgan mashqlar turli kontekstlarda ingliz tilini tushunishga yordam beradi.',
		icon: 'listening',
	},
	{
		id: 6,
		title: 'Speaking',
		description:
			'Praktik mashqlar bilan so‘zlashish mahoratingizni oshiring. Talaffuz, ravonlik yoki suhbat ko‘nikmalarini mashq qilish orqali ingliz tilida ishonch bilan muloqot qilishingizga yordam beramiz.',
		icon: 'speaking',
	},
	{
		id: 7,
		title: 'Writing',
		description:
			'Yozish ko‘nikmalaringizni chuqurlashtiring. Oddiy gap tuzishdan tortib murakkab insho yozishgacha bo‘lgan darslarimiz sizga ingliz tilida mohir yozuvchi bo‘lishingiz uchun yo‘l ko‘rsatadi.',
		icon: 'writing',
	},
	{
		id: 8,
		title: 'Online Tests',
		description:
			'Har bir mavzudan keyingi onlayn testlar bilan rivojlanishingizni baholang. Bu testlar tushunishingiz va eslab qolish qobiliyatingizni baholab, darhol fikr-mulohaza va shaxsiy takliflar beradi.',
		icon: 'test',
	},
]
