import { NextRequest } from 'next/server'

export async function PUT(req: NextRequest) {
  console.log(`Received ${req.method} request for login`)

  try {
    const body = await req.json()
    const response = await fetch('https://pyapi.chudars.lv/user/login', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    console.log(data)
    console.log(response.status)
    return new Response(JSON.stringify({ success: true }), { status: response.status })
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error }), { status: 500 })
  }
}