import { getServerSession } from 'next-auth'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'

import './styles/globals.css'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Calisthenics App',
  description: 'Generated by create next app'
}

export default async function RootLayout({ children }) {
  const session = await getServerSession()

  return (
    <SessionProvider session={session}>
      {session ? (
        <DashboardLayout>{children}</DashboardLayout>
      ) : (
        <AuthLayout>{children}</AuthLayout>
      )}
    </SessionProvider>
  )
}
