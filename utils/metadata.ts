import type { Metadata } from 'next/types'

export function createMetadata(override: Metadata): Metadata {
	return {
		...override,
		openGraph: {
			title:
				override.title ??
				'WordWonders - Unlock Your Language Potential with WordWonders: Where English Learning Becomes an Adventure.',
			description:
				override.description ??
				'WordWonders - Unlock Your Language Potential with WordWonders: Where English Learning Becomes an Adventure.',
			url: 'https://wordwonders.uz',
			images: 'https://wordwonders.uz/og.png',
			siteName: 'WordWonders',
			...override.openGraph,
		},
		twitter: {
			card: 'summary_large_image',
			creator: '@miracleprogrammer',
			title:
				override.title ??
				'WordWonders - Unlock Your Language Potential with WordWonders: Where English Learning Becomes an Adventure.',
			description:
				override.description ??
				'WordWonders - Unlock Your Language Potential with WordWonders: Where English Learning Becomes an Adventure.',
			images: 'https://wordwonders.uz/og.png',
			...override.twitter,
		},
	}
}

export const baseURL =
	process.env.NODE_ENV === 'development'
		? new URL('http://localhost:3000')
		: new URL(`https://${process.env.VERCEL_URL!}`)
