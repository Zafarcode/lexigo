'use client'

import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import * as React from 'react'

const LoginForm = () => {
	const [value, setValue] = React.useState('')
	const router = useRouter()

	const handleLogin = React.useCallback(async () => {
		if (value.length === 6) {
			const result = await signIn('credentials', {
				code: value,
				redirect: false,
			})
			if (result?.ok) {
				router.push('/dashboard')
			} else {
				console.error('Login failed:', result?.error)
			}
		}
	}, [router, value])

	React.useEffect(() => {
		if (value.length === 6) {
			handleLogin()
		}
	}, [handleLogin, value])

	return (
		<div className='space-y-2'>
			<InputOTP
				maxLength={6}
				value={value}
				onChange={newValue => {
					if (newValue.length <= 6) setValue(newValue)
				}}
				disabled={value.length === 6}
			>
				{Array.from({ length: 6 }).map((_, index) => (
					<InputOTPGroup key={index}>
						<InputOTPSlot className='dark:border-white' index={index} />
					</InputOTPGroup>
				))}
			</InputOTP>
		</div>
	)
}

export default LoginForm
