'use client'
import React from 'react'

import { useSelectedLayoutSegment } from 'next/navigation'
import useScroll from '../../hooks/use-scroll'
import { cn } from '../../lib/utils'
import { signIn } from 'next-auth/react'

const Header = () => {
  const scrolled = useScroll(5)
  const selectedLayout = useSelectedLayoutSegment()

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b bg-black`,
        {
          'border-b border-black bg-black backdrop-blur-lg': scrolled,
          'border-b border-black bg-black': selectedLayout
        }
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-4">
        <div className="hidden md:block">
          <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center text-center">
            <button onClick={() => signIn('github')}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
