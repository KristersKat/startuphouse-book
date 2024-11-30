import { useState } from 'react'
import { Plus, Headphones, Clipboard, Accessibility, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { AddItemModal, type InventoryItem } from './add-item-modal'
import { useRouter } from 'next/navigation'

interface VenueFormData {
  name: string
  description: string
  photo: File | null
  inventory: InventoryItem[]
}

interface VenueFormProps {
  onSubmit: (data: VenueFormData) => void
}

const steps = ['Basic Info', 'Photos', 'Inventory']

export function VenueForm({ onSubmit }: VenueFormProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [showAddItem, setShowAddItem] = useState(false)
  const [venueData, setVenueData] = useState<VenueFormData>({
    name: '',
    description: '',
    photo: null,
    inventory: [],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setVenueData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type.startsWith('image/')) {
        setVenueData(prev => ({
          ...prev,
          photo: file,
        }))
      }
    }
  }

  const handleAddItem = (item: InventoryItem) => {
    setVenueData((prev) => ({
      ...prev,
      inventory: [...prev.inventory, item],
    }))
  }

  const handleRemoveItem = (id: string) => {
    setVenueData((prev) => ({
      ...prev,
      inventory: prev.inventory.filter((item) => item.id !== id),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { name, description, photo, inventory } = venueData
    const roomName = name
    const storedName = localStorage.getItem('name') || ''
    const storedPassword = localStorage.getItem('password') || ''

    try {
      const response = await fetch('/api/room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomName,
          description,
          photo,
          inventory,
          name: storedName,
          password: storedPassword,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit venue data')
      }

      const result = await response.json()
      console.log('Venue data submitted successfully:', result)
      onSubmit(venueData)
      router.push('/')
    } catch (error) {
      console.error('Error submitting venue data:', error)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Venue Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={venueData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={venueData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </>
        )
      case 1:
        return (
          <div>
            <Label htmlFor="photo">Upload Photo</Label>
            <Input
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
            />
            {venueData.photo && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(venueData.photo)}
                  alt="Venue photo"
                  className="w-full h-32 object-cover rounded"
                />
              </div>
            )}
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Inventory Items</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowAddItem(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {venueData.inventory.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-500">Stock: {item.stock}</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4">
            {steps.map((step, index) => (
              <li
                key={index}
                className={`flex items-center ${
                  index <= currentStep ? 'text-blue-600 dark:text-blue-500' : ''
                }`}
              >
                <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
                  {index + 1}
                </span>
                {step}
                {index < steps.length - 1 && (
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 ml-2 sm:ml-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    ></path>
                  </svg>
                )}
              </li>
            ))}
          </ol>
        </div>
        {renderStep()}
        <div className="mt-8 flex justify-between">
          <Button
            type="button"
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            type={currentStep === steps.length - 1 ? 'submit' : 'button'}
            onClick={() => {
              if (currentStep < steps.length - 1) {
                setCurrentStep((prev) => prev + 1)
              }
            }}
          >
            {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </div>
      </form>
      {showAddItem && (
        <AddItemModal
          onClose={() => setShowAddItem(false)}
          onAdd={handleAddItem}
        />
      )}
    </>
  )
}