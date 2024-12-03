import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
	interface User {
		id: number | string | unknown
		username?: string | unknown
		firstName: string | unknown
		lastName: string | unknown
		phone: string | unknown
		accessToken: string
		refreshToken: string
	}

	interface Session {
		user: {
			id: number | string | unknown
			username?: string | unknown
			firstName: string | unknown
			lastName: string | unknown
			phone: string | unknown
			accessToken: string | unknown
			refreshToken: string | unknown
			iat?: number | null // Optional
			exp?: number | null // Optional
			jti?: string | null // Optional
		}
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		accessToken?: string
		refreshToken?: string
		accessTokenExpires?: number
		user?: User
		error?: string | null
	}
}
