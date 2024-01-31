import NextAuth from 'next-auth'
import { Account, User as AuthUser } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { connectToMongo, users } from '../../../lib/myconnexion'

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: any): Promise<any | null> {
        await connectToMongo()
        try {
          const user = await users.findOne({ email: credentials.email })
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            )
            if (isPasswordCorrect) {
              return user
            }
          }
          return null
        } catch (err: any) {
          throw new Error(err)
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    })
  ],
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      if (account?.provider === 'credentials') {
        return true
      }
      if (account?.provider === 'github') {
        await connectToMongo()
        try {
          const existingUser = await users.findOne({ email: user.email })
          if (!existingUser) {
            const hashedPassword = await bcrypt.hash('someRandomPassword', 5) // You may want to generate a random password for GitHub users.
            const newUser = {
              email: user.email,
              password: hashedPassword,
              createdAt: new Date(),
              updatedAt: new Date()
            }

            await users.insertOne(newUser)
            return true
          }
          return true
        } catch (err) {
          console.log('Error saving user', err)
          return false
        }
      }
    }
  }
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
