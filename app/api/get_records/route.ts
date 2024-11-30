import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  console.log(`Received ${req.method} request for records`)

  try {
    const response = await fetch('https://pyapi.chudars.lv/record/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.error(`Error fetching records: ${response.statusText}`)
      return new Response(JSON.stringify({ success: false, message: 'Failed to fetch records' }), { status: response.status })
    }

    const data = await response.json()
    console.log(data)
    return new Response(JSON.stringify({ success: true, data }), { status: 200 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), { status: 500 })
  }
}