import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: '',
      clientSecret: ''
    })
  ]
})

export { handler as GET, handler as POST }
