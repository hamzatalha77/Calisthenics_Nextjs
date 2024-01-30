import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import { connectToMongo } from '../../../lib/myconnexion'
import Users from '../../../models/Users'
import bcrypt from 'bcryptjs'

const handler = NextAuth({
  providers: [
    Credentials({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { lable: 'Email', type: 'text' },
        password: { lable: 'Password', type: 'password' }
      },
      async authorize(credentials: any) {
        await connectToMongo()
        try {
          const user = await Users.findOne({ email: credentials.email })
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            )
            if (isPasswordCorrect) {
              return user
            }
          }
        } catch (error) {
          throw new Error(error)
        }
      }
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID ?? '',
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? ''
    })
  ]
})

export { handler as GET, handler as POST }
