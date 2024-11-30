'use client'

import { VenueForm } from '@/components/venue-form'

export default function AddVenue() {
  const handleSubmit = async (venueData: any) => {
    // Here you would typically send the data to your backend
    console.log('Submitting venue data:', venueData)
    // Redirect to the venue management page or show a success message
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add Your Venue</h1>
      <VenueForm onSubmit={handleSubmit} />
    </div>
  )
}

