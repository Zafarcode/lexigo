import AuthProvider from '@/providers/AuthProvider'
import { ThemeProvider } from '@/providers/theme-provider'
import React from 'react'
import { RootProvider } from 'next-docs-ui/provider'

const Provider = ({ children }: { children: React.ReactNode }) => {
	return (
		<AuthProvider>
			<ThemeProvider
				attribute='class'
				defaultTheme='system'
				enableSystem
				disableTransitionOnChange
			>
				<RootProvider>{children}</RootProvider>
			</ThemeProvider>
		</AuthProvider>
	)
}

export default Provider
