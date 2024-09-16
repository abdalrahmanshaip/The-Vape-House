'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TypeDispo } from '@/Types'
import { useState } from 'react'
import { toast } from 'sonner'

const Quantity = ({
  itemProduct,
  selectedFlavor,
}: {
  itemProduct: TypeDispo
  selectedFlavor?: string
}) => {
  const [quantity, setQuantity] = useState(1)
  const [subtotal, setSubtotal] = useState(itemProduct?.price)

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
      setSubtotal((prev) => prev - itemProduct.price)
    }
  }
  const handleIncrement = () => {
    if (quantity < itemProduct.quantity) {
      setQuantity(quantity + 1)
      setSubtotal((prev) => prev + itemProduct.price)
    }
  }

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find(
      (item: any) =>
        item.productId === itemProduct._id && item.flavor === selectedFlavor
    )
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({
        productId: itemProduct._id,
        quantity,
        price: itemProduct.price,
        name: itemProduct.productName,
        flavor: selectedFlavor,
        img: itemProduct.img,
      })
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    toast.success('Added to cart')
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
          className='rounded-3xl text-center w-[25%]'
          value={quantity}
          type='text'
          readOnly
        />
        <Button
          className='absolute hover:bg-transparent right-[75%]'
          variant={'ghost'}
          onClick={handleIncrement}
          disabled={quantity === itemProduct?.quantity}
        >
          +
        </Button>
      </div>
      <p className='text-sm'>Subtotal: LE {subtotal}.00</p>
      <Button
        variant={'default'}
        className='mt-4 w-full'
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
    </div>
  )
}

export default Quantity
