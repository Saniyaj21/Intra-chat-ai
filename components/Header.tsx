import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <header className='flex z-50 sticky top-0 left-0 bg-slate-300 justify-center items-center'>
            <nav className='flex  justify-between items-center py-4 px-6 w-full max-w-7xl'>
                <Link href={'/'} className="logo text-2xl font-serif text-blue-800">IntraChat AI</Link>
                <div>
                    <SignedIn>
                        <UserButton showName />
                    </SignedIn>

                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                </div>
            </nav>
        </header>
    )
}

export default Header
