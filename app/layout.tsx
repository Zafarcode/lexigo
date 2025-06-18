import { cn } from '@/lib/utils'
import Provider from '@/providers/Provider'
import '@/styles/globals.css'
import { baseURL, createMetadata } from '@/utils/metadata'
import type { Viewport } from 'next'
import 'next-docs-ui/style.css'
import { Rubik } from 'next/font/google'

const rubik = Rubik({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800', '900'],
	variable: '--font-sans',
})

export const metadata = createMetadata({
	title: {
		template: '%s | LexiGo - Unlock Your Language Potential with LexiGo',
		default:
			'LexiGo - Unlock Your Language Potential with LexiGo: Where English Learning Becomes an Adventure.',
	},
	description:
		'LexiGo - Unlock Your Language Potential with LexiGo: Where English Learning Becomes an Adventure.',
	metadataBase: baseURL,
})

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
		{ media: '(prefers-color-scheme: light)', color: '#fff' },
	],
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					rubik.variable
				)}
			>
				<Provider>
					<div className='flex flex-col relative min-h-dvh'>
						{children}
						<div className='fixed inset-0 w-full h-full -z-10 bg-pattern' />
					</div>
				</Provider>
			</body>
		</html>
	)
}
