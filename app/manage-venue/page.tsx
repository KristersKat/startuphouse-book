'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

// This would typically come from a database
const myVenue = {
  id: 1,
  name: 'Grand Ballroom',
  description: 'A luxurious ballroom for grand events',
  capacity: 500,
  inventory: { tables: 50, chairs: 500 },
  services: { technicalSupport: true, registrationTools: true },
}

// This would typically come from a database
const bookings = [
  { id: 1, date: new Date(2023, 5, 15), clientName: 'John Doe', attendees: 200 },
  { id: 2, date: new Date(2023, 6, 1), clientName: 'Jane Smith', attendees: 350 },
]

export default function ManageVenue() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const filteredBookings = selectedDate
    ? bookings.filter((booking) => booking.date.toDateString() === selectedDate.toDateString())
    : bookings

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Your Venue</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Venue Details</h2>
          <p><strong>Name:</strong> {myVenue.name}</p>
          <p><strong>Description:</strong> {myVenue.description}</p>
          <p><strong>Capacity:</strong> {myVenue.capacity}</p>
          <p><strong>Tables:</strong> {myVenue.inventory.tables}</p>
          <p><strong>Chairs:</strong> {myVenue.inventory.chairs}</p>
          <p><strong>Technical Support:</strong> {myVenue.services.technicalSupport ? 'Yes' : 'No'}</p>
          <p><strong>Registration Tools:</strong> {myVenue.services.registrationTools ? 'Yes' : 'No'}</p>
          <Button className="mt-4">Edit Venue Details</Button>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Bookings</h2>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border mb-4"
          />
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="border rounded-lg p-4">
                <p><strong>Date:</strong> {booking.date.toDateString()}</p>
                <p><strong>Client:</strong> {booking.clientName}</p>
                <p><strong>Attendees:</strong> {booking.attendees}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

