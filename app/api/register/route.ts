import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  console.log(`Received ${req.method} request`)

  try {
    const body = await req.json()
    const response = await fetch('https://pyapi.chudars.lv/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return new Response(JSON.stringify(data), { status: response.status })
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), { status: 500 })
  }
}