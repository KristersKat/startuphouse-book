'use client'

import { useState, useEffect } from 'react'
import { VenueCard } from '@/components/venue-card'
import { useParams, useRouter } from 'next/navigation'

interface Venue {
  id: string
  roomName: string
  description: string
  photo: string | null
}

export default function BookVenue() {
  const { id } = useParams()
  const [venues, setVenues] = useState<Venue[]>([])
  const [loading, setLoading] = useState(true)
  const venueId = Array.isArray(id) ? id[0] : id

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await fetch('/api/get_records')
        if (!res.ok) throw new Error('Failed to fetch venues')
        const response = await res.json()
        const data = response.data
        const filteredVenues = data
          .filter((item: Record<string, any>) => item.hasOwnProperty(venueId))
          .flatMap((item: Record<string, any>) => {
            const venue = item[venueId]
            return venue.rooms ? Object.values(venue.rooms) : []
          })
        console.log(data)
        console.log(filteredVenues)
        setVenues(filteredVenues)
      } catch (error) {
        console.error('Error fetching venues:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVenues()
  }, [venueId])

  if (loading) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Venues</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <VenueCard key={venue.id} {...venue} id={Number(venue.id)} />
        ))}
      </div>
    </div>
  )
}


