import { useUser } from '@auth0/nextjs-auth0/client'
import React from 'react'

function page() {
  const { user, isLoading, error } = useUser()
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error</div>
  }
  if (user) {
    return (
      <div>
        welcome to calisthenics {user.name}!{' '}
        <a href="/api/auth/logout">Logout</a>
      </div>
    )
  }
}

export default page
