import { ReactNode } from 'react'

export default function RootGrammarLayout({
	children,
}: {
	children: ReactNode
}) {
	return <main>{children}</main>
}
