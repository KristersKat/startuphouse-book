"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface LoginResponse {
  success: boolean
  message?: string
}

function loginUser(name: string, password: string): Promise<LoginResponse> {
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

export default function Login() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const response = await loginUser(name, password)
    if (response.success) {
      localStorage.setItem('name', name)
      localStorage.setItem('password', password)
      router.push('/add-venue')
    } else {
      setError(response.message || 'Login failed')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Login</h1>
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
        <Button type="submit" size="lg">Login</Button>
      </form>
      <p className="text-center mt-4">
        Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register here</a>
      </p>
    </div>
  )
}