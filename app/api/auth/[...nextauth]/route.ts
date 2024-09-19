import axiosInstance from '@/lib/axios'
import { CustomUser } from '@/types/next-auth'
import NextAuth, { AuthOptions, Session, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions: AuthOptions = {
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				code: { label: 'Code', type: 'number' },
			},
			async authorize(credentials) {
				if (!credentials) {
					return null // If credentials are not provided, return null
				}

				try {
					const response = await axiosInstance.post('/auth/login', credentials)

					const data = response.data

					if (response.status === 200 && data.access) {
						return {
							...data.user,
							accessToken: data.access,
							refreshToken: data.refresh,
						}
					} else {
						throw new Error('Invalid credentials')
					}
				} catch (error) {
					console.error('Error during login:', error)
					return null
				}
			},
		}),
	],
	callbacks: {
		async jwt({
			token,
			user,
		}: {
			token: JWT
			user?: CustomUser | User | undefined
		}) {
			if (user && (user as CustomUser).accessToken) {
				token.accessToken = (user as CustomUser).accessToken
				token.refreshToken = (user as CustomUser).refreshToken
				token.user = user as CustomUser
			}
			return token
		},
		async session({ session, token }: { session: Session; token: JWT }) {
			session.user = token.user as CustomUser // Assuming `user` exists on `token`
			session.accessToken = token.accessToken // Assuming `accessToken` exists on `token`
			return session
		},
	},
	cookies: {
		sessionToken: {
			name: 'next-auth.session-token',
			options: {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				maxAge: 30 * 24 * 60 * 60, // 30 days
				path: '/',
			},
		},
	},
	pages: {
		signIn: '/auth/login', // Correct path for the sign-in page
	},
	secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
