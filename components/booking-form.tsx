import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface BookingFormData {
  date: Date | undefined
  inventory: {
    tables: number
    chairs: number
  }
  services: {
    technicalSupport: boolean
    registrationTools: boolean
  }
}

interface BookingFormProps {
  venue: {
    id: number
    name: string
    inventory: {
      tables: number
      chairs: number
    }
    services: {
      technicalSupport: boolean
      registrationTools: boolean
    }
  }
  onSubmit: (data: BookingFormData) => void
}

export function BookingForm({ venue, onSubmit }: BookingFormProps) {
  const [bookingData, setBookingData] = useState<BookingFormData>({
    date: undefined,
    inventory: {
      tables: 0,
      chairs: 0,
    },
    services: {
      technicalSupport: false,
      registrationTools: false,
    },
  })

  const handleDateSelect = (date: Date | undefined) => {
    setBookingData((prev) => ({ ...prev, date }))
  }

  const handleInventoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBookingData((prev) => ({
      ...prev,
      inventory: { ...prev.inventory, [name]: parseInt(value) },
    }))
  }

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setBookingData((prev) => ({
      ...prev,
      services: { ...prev.services, [name]: checked },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(bookingData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="date">Select Date</Label>
        <Calendar
          mode="single"
          selected={bookingData.date}
          onSelect={handleDateSelect}
          className="rounded-md border"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Inventory</h3>
        <div className="space-y-2">
          <div>
            <Label htmlFor="tables">Tables</Label>
            <Input
              id="tables"
              name="tables"
              type="number"
              value={bookingData.inventory.tables}
              onChange={handleInventoryChange}
              min="0"
              max={venue.inventory.tables}
            />
          </div>
          <div>
            <Label htmlFor="chairs">Chairs</Label>
            <Input
              id="chairs"
              name="chairs"
              type="number"
              value={bookingData.inventory.chairs}
              onChange={handleInventoryChange}
              min="0"
              max={venue.inventory.chairs}
            />
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Services</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Input
              id="technicalSupport"
              name="technicalSupport"
              type="checkbox"
              checked={bookingData.services.technicalSupport}
              onChange={handleServiceChange}
            />
            <Label htmlFor="technicalSupport">Technical Support</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              id="registrationTools"
              name="registrationTools"
              type="checkbox"
              checked={bookingData.services.registrationTools}
              onChange={handleServiceChange}
            />
            <Label htmlFor="registrationTools">Registration Tools</Label>
          </div>
        </div>
      </div>
      <Button type="submit" disabled={!bookingData.date}>
        Book Venue
      </Button>
    </form>
  )
}

