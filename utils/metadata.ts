import type { Metadata } from 'next/types'

export function createMetadata(override: Metadata): Metadata {
	return {
		...override,
		openGraph: {
			title:
				override.title ??
				'LexiGo - Ingliz tilini o‘rganish LexiGo bilan sarguzashtga aylanadi.',
			description:
				override.description ??
				'LexiGo - Ingliz tilini o‘rganish LexiGo bilan sarguzashtga aylanadi.',
			url: 'https://lexigo.uz',
			images: 'https://lexigo.uz/og.png',
			siteName: 'LexiGo',
			...override.openGraph,
		},
		twitter: {
			card: 'summary_large_image',
			creator: '@dilshodbek_kxasanov',
			title:
				override.title ??
				'LexiGo - Ingliz tilini o‘rganish LexiGo bilan sarguzashtga aylanadi.',
			description:
				override.description ??
				'LexiGo - Ingliz tilini o‘rganish LexiGo bilan sarguzashtga aylanadi.',
			images: 'https://lexigo.uz/og.png',
			...override.twitter,
		},
	}
}

export const baseURL =
	process.env.NODE_ENV === 'development'
		? new URL('http://localhost:3000')
		: new URL(`https://${process.env.VERCEL_URL!}`)
