import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface VenueCardProps {
  id: number
  roomName: string
}

export function VenueCard({ id, roomName }: VenueCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h2 className="text-xl font-semibold mb-2">{roomName}</h2>
      <Link href={`/book-venue/${id}`}>
        <Button>View Details</Button>
      </Link>
    </div>
  )
}

