"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface LoginResponse {
  success: boolean
  message?: string
}

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


  console.log(name, password)
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

export default function Home() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    checkUserLoggedIn().then(response => {
      console.log(response, 12)
      setIsLoggedIn(response.success)
    })
  }, [])

  const handleAddVenueClick = () => {
    if (isLoggedIn) {
      router.push('/add-venue')
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Venue Booking System</h1>
      <div className="flex justify-center space-x-4">
        <Button size="lg" onClick={handleAddVenueClick}>Add Your Venue</Button>
        <Link href="/book-venue">
          <Button size="lg" variant="outline">Book a Venue</Button>
        </Link>
      </div>
    </div>
  )
}
