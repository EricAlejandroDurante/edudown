import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { publicInstance } from 'axios-instance'

export default function auth (req, res) {
  const options = {
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' }
        },
        async authorize (credentials) {
          try {
            const response = await publicInstance.post('api/user/sign-in',
              {
                email: credentials.email,
                password: credentials.password
              }
            )
            return response.data
          } catch(e) {
            return null
          }
        }
      })
    ],
    secret: 'RTq+fNFrGRRwudfer2D0QuTRh+itYG69JpQj9S7/fiE=',
    callbacks: {
      async jwt ({ token, user, account }) {
        if (user) {
          token.sessionId = user.sessionId
          token.accessToken = user.accessToken
        }
        return token
      },
      async session ({ session, token, user }) {
        session.sessionId = token.sessionId
        session.accessToken = token.accessToken
        return session
      }
    },
    events: {
      async signOut ({ token }) {
        await publicInstance.delete(`sessions/${token.sessionId}`, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`
          }
        })
      }
    }
  }
  NextAuth(req, res, options)
}
