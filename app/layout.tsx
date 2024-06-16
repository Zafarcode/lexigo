import SiteHeader from '@/components/global/site-header'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import './globals.css'

const rubik = Rubik({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800', '900'],
	variable: '--font-sans',
})

export const metadata: Metadata = {
	title:
		'WordWonders - Unlock Your Language Potential with WordWonders: Where English Learning Becomes an Adventure!',
	description:
		'Unlock Your Language Potential with WordWonders: Where English Learning Becomes an Adventure!',
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
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<SiteHeader />
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
