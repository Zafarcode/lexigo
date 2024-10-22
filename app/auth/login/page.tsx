'use client'

import LoginComponent from '@/components/auth/login'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'

const Login = () => {
	return (
		<section>
			<LoginComponent />
			<Button variant='outline' onClick={() => signIn('google')}>
				Login with Google
			</Button>
		</section>
	)
}

export default Login
