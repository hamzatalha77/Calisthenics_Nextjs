import { Inter } from 'next/font/google'
import '../styles/globals.css'
import LoginDashboardScreen from '../interfaces/auth/login/page'
import RegisterDashboardScreen from '../interfaces/auth/register/page'

const inter = Inter({ subsets: ['latin'] })

const AuthLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <LoginDashboardScreen />
        <RegisterDashboardScreen />
        {children}
      </body>
    </html>
  )
}

export default AuthLayout
