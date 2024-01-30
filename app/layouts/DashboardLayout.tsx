import Header from '../components/dashboard/header'
import HeaderMobile from '../components/dashboard/header-mobile'
import MarginWidthWrapper from '../components/dashboard/margin-width-wrapper'
import PageWrapper from '../components/dashboard/page-wrapper'
import SideNav from '../components/dashboard/side-nav'
import '../styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Calisthenics App',
  description: 'Generated by create next app'
}

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className="flex">
          <main className="flex-1">
            <SideNav />
            <MarginWidthWrapper>
              <Header />
              <HeaderMobile />
              <PageWrapper>{children}</PageWrapper>
            </MarginWidthWrapper>
          </main>
        </div>
      </body>
    </html>
  )
}