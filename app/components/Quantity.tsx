'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TypeDispo } from '@/Types'
import { useState } from 'react'

const Quantity = ({ quantityOfItem }: { quantityOfItem: TypeDispo }) => {
  const [quantity, setQuantity] = useState(1)
  const [subtotal, setSubtotal] = useState(quantityOfItem.price)

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
      setSubtotal((prev) => prev - quantityOfItem.price)
    }
  }
  const handleIncrement = () => {
    if (quantity < quantityOfItem.quantity) {
      setQuantity(quantity + 1)
      setSubtotal((prev) => prev + quantityOfItem.price)
    }
  }

  return (
    <div>
      <div className='flex relative my-2'>
        <Button
          className='absolute hover:bg-transparent left-0'
          variant={'ghost'}
          onClick={handleDecrement}
        >
          -
        </Button>
        <Input
          className='rounded-3xl text-center w-[20%]'
          value={quantity}
        />
        <Button
          className='absolute hover:bg-transparent right-[80%]'
          variant={'ghost'}
          onClick={handleIncrement}
          disabled={quantity === quantityOfItem.quantity}
        >
          +
        </Button>
      </div>
      <p className='text-sm'>Subtotal: LE {subtotal}.00</p>
      <Button
        variant={'default'}
        className='mt-4 w-full'
      >
        Add to Cart
      </Button>
    </div>
  )
}

export default Quantity
