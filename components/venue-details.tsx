import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'

interface VenueDetailsProps {
  id: number
  roomName: string
  description: string
  photo: string | null
}

const bookingSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
})

type BookingFormData = z.infer<typeof bookingSchema>

export function VenueDetails({ id, roomName, description, photo }: VenueDetailsProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<BookingFormData>({
  })

  const onSubmit = (data: BookingFormData) => {
    console.log('Booking data:', data)
    // Handle booking logic here, e.g., send data to an API
  }

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      {photo && <img src={photo} alt={roomName} className="mb-4" />}
      <h2 className="text-xl font-semibold mb-2">{roomName}</h2>
      <p className="mb-4">{description}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            {...register('name')}
            className="w-full border rounded p-2"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full border rounded p-2"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block mb-1">Start Time</label>
          <input
            type="datetime-local"
            {...register('startTime')}
            className="w-full border rounded p-2"
          />
          {errors.startTime && <p className="text-red-500">{errors.startTime.message}</p>}
        </div>
        <div>
          <label className="block mb-1">End Time</label>
          <input
            type="datetime-local"
            {...register('endTime')}
            className="w-full border rounded p-2"
          />
          {errors.endTime && <p className="text-red-500">{errors.endTime.message}</p>}
        </div>
        <Button type="submit">Book Now</Button>
      </form>
    </div>
  )
}