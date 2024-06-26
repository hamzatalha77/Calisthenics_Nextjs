import './styles/globals.css'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'
import SessionProvider from './utils/SessionProvider'
import { getServerSession } from 'next-auth'
import toast, { Toaster, ToastBar } from 'react-hot-toast'
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
      <Toaster>
        {(t) => (
          <ToastBar
            toast={t}
            style={{
              ...t.style,
              animation: t.visible
                ? 'custom-enter 1s ease'
                : 'custom-exit 1s ease'
            }}
          />
        )}
      </Toaster>
      ;
    </SessionProvider>
  )
}
