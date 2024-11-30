import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export interface InventoryItem {
  id: string
  name: string
  stock: number
}

interface AddItemModalProps {
  onClose: () => void
  onAdd: (item: InventoryItem) => void
}

export function AddItemModal({ onClose, onAdd }: AddItemModalProps) {
  const [item, setItem] = useState<Omit<InventoryItem, 'id'>>({
    name: '',
    stock: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({
      id: crypto.randomUUID(),
      ...item,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        <h2 className="text-lg font-semibold mb-4">Add an item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Item name</Label>
              <Input
                id="name"
                value={item.name}
                onChange={(e) => setItem((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={item.stock}
                onChange={(e) => setItem((prev) => ({ ...prev, stock: parseInt(e.target.value) }))}
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Create</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
