import React from 'react'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
const Dashboard = async () => {
  const session = await getServerSession()
  if (!session) {
    redirect('/interfaces/auth/login')
  }
  return <div>Dashboard</div>
}

export default Dashboard
