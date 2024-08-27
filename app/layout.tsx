import SiteFooter from '@/components/global/site-footer'
import SiteHeader from '@/components/global/site-header'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { baseURL, createMetadata } from '@/utils/metadata'
import type { Viewport } from 'next'
import { Rubik } from 'next/font/google'

const rubik = Rubik({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800', '900'],
	variable: '--font-sans',
})

export const metadata = createMetadata({
	title: {
		template: '%s | WordWonders',
		default:
			'WordWonders - Unlock Your Language Potential with WordWonders: Where English Learning Becomes an Adventure.',
	},
	description:
		'WordWonders - Unlock Your Language Potential with WordWonders: Where English Learning Becomes an Adventure.',
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
				{/* Theme Provider */}
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<div className='flex flex-col relative min-h-dvh'>
						{/* Site Header */}
						<SiteHeader />
						<main className='flex-1 pt-20 md:pt-24 pb-3 lg:pb-20'>
							{children}
						</main>
						{/* Background Pattern */}
						<div className='fixed inset-0 w-full h-full -z-10 bg-pattern' />
						{/* Site Footer */}
						<SiteFooter />
					</div>
				</ThemeProvider>
				<Toaster />
			</body>
		</html>
	)
}
