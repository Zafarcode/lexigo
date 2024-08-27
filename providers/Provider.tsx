import AuthProvider from '@/providers/AuthProvider'
import { ThemeProvider } from '@/providers/theme-provider'
import React from 'react'

const Provider = ({ children }: { children: React.ReactNode }) => {
	return (
		<AuthProvider>
			<ThemeProvider
				attribute='class'
				defaultTheme='system'
				enableSystem
				disableTransitionOnChange
			>
				{children}
			</ThemeProvider>
		</AuthProvider>
	)
}

export default Provider
