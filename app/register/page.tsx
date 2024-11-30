"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface RegisterResponse {
  success: boolean
  message?: string
}

function registerUser(name: string, password: string): Promise<RegisterResponse> {
  return fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, password })
  })
  .then(response => response.json())
  .catch(() => ({ success: false }))
}

export default function Register() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const response = await registerUser(name, password)
    if (response.success) {
      localStorage.setItem('name', name)
      localStorage.setItem('password', password)
      router.push('/')
    } else {
      setError(response.message || 'Registration failed')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Register</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-2 border"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Button type="submit" size="lg">Register</Button>
      </form>
    </div>
  )
}