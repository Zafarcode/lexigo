'use client'

import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp'
import { signIn } from 'next-auth/react'
import * as React from 'react'

const LoginForm = () => {
	const [value, setValue] = React.useState('')

	const handleLogin = React.useCallback(async () => {
		if (value.length === 6) {
			await signIn('credentials', { code: value, redirect: false })
		}
	}, [value])

	React.useEffect(() => {
		handleLogin()
	}, [value, handleLogin])

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
