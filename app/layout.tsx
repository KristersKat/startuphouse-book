"use client"

import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

interface LoginResponse {
  success: boolean
  message?: string
}

const inter = Inter({ subsets: ['latin'] })

function getUserCredentials() {
  const name = localStorage.getItem('name') || ''
  const password = localStorage.getItem('password') || ''
  return { name, password }
}

function checkUserLoggedIn(): Promise<LoginResponse> {
  const { name, password } = getUserCredentials()
  
  if (!name || !password) {
    return Promise.resolve({ success: false })
  }

  return fetch('api/login', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, password })
  })
  .then(response => response.json())
  .catch(() => ({ success: false }))
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    checkUserLoggedIn().then(response => {
      setIsLoggedIn(response.success)
    })
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="text-black p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <a href="/" className="flex items-center">
              <img src="/logo.svg" alt="Logo" className="h-24 mr-2" />
            </a>
            <div>
              {!isLoggedIn && (
                <>
                  <Link href="/login" passHref>
                    <Button variant="outline" className="mr-4">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/register" passHref>
                    <Button>
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </header>
        <div className="bg-black text-center h-[1px]"></div>
        <main>{children}</main>
        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            &copy; 2023 Venue Booking System. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}
