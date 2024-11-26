import { Toaster } from '@/components/ui/toaster'
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
				<Toaster />
			</ThemeProvider>
		</AuthProvider>
	)
}

export default Provider
