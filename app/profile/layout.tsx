import { Sidebar } from '@/components/profile/side-bar'

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='flex min-h-screen flex-col md:flex-row'>
			<Sidebar className='w-full md:w-64 flex-shrink-0' />
			<main className='flex-1 overflow-x-hidden p-4 md:p-6'>{children}</main>
		</div>
	)
}
