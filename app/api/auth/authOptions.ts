import axios from 'axios'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				code: { label: 'Code', type: 'text' },
			},
			async authorize(credentials) {
				if (!credentials?.code) return null

				try {
					const response = await axios.post(
						'http://127.0.0.1:8000/api/accounts/verify-code/',
						{ code: credentials.code }
					)

					const data = response.data

					if (data.success) {
						return {
							id: data.profile_id,
							firstName: data.first_name,
							lastName: data.last_name,
							username: data.username,
							phone: data.phone,
							accessToken: data.access_token,
							refreshToken: data.refresh_token,
						}
					}
				} catch (error) {
					console.error('Error during login:', error)
					throw new Error('Invalid credentials')
				}
				return null
			},
		}),
	],
	session: {
		strategy: 'jwt',
		maxAge: 7 * 24 * 60 * 60,
	},
	callbacks: {
		async jwt({ token, user }) {
			console.log('JWT Callback - token:', token, 'user:', user) // Debug
			if (user) {
				token.accessToken = user.accessToken
				token.refreshToken = user.refreshToken
			}
			return token
		},
		async session({ session, token }) {
			console.log('Session Callback - session:', session, 'token:', token) // Debug
			if (token) {
				session.user = {
					...session.user,
					id: token.sub,
					phone: token.phone,
					username: token.username,
					firstName: token.firstName,
					lastName: token.lastName,
					accessToken: token.accessToken,
					refreshToken: token.refreshToken,
				}
			}
			return session
		},
	},
	cookies: {
		sessionToken: {
			name: 'next-auth.session-token',
			options: {
				httpOnly: true,
				sameSite: 'None',
				// domain: ".udemere.uz",
				path: '/',
				secure: true,
				maxAge: 60 * 60 * 24 * 7,
			},
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/auth/login',
	},
}
