'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TypeDispo } from '@/Types'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

const Quantity = ({
  itemProduct,
  selectedvalidation,
  price,
  quantityLiquid,
}: {
  itemProduct: TypeDispo
  selectedvalidation: { key: string; value: string }
  price?: number
  quantityLiquid?: number
}) => {
  const [quantity, setQuantity] = useState(1)
  const initialPrice = price || itemProduct?.price

  const [subtotal, setSubtotal] = useState(initialPrice)
  useEffect(() => {
    setSubtotal(quantity * initialPrice)
  }, [quantity, initialPrice])

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1)
    }
  }

  const handleIncrement = () => {
    if (quantity < itemProduct.quantity || quantityLiquid) {
      setQuantity((prevQuantity) => prevQuantity + 1)
    }
  }

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find(
      (item: any) =>
        item.productId === itemProduct._id &&
        item[selectedvalidation.key] === selectedvalidation?.value
    )

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({
        productId: itemProduct._id,
        quantity,
        price: initialPrice,
        name: itemProduct.productName,
        [selectedvalidation.key]: selectedvalidation?.value,
        img: itemProduct.img,
      })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    const event = new CustomEvent('cartUpdated')
    window.dispatchEvent(event)

    toast.success('Added to cart')
  }

  return (
    <div>
      <div className='flex relative my-2'>
        <Button
          className='absolute hover:bg-transparent left-0'
          variant={'ghost'}
          onClick={handleDecrement}
          disabled={quantity <= 1}
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
          disabled={
            quantity === itemProduct?.quantity || quantity === quantityLiquid
          }
        >
          +
        </Button>
      </div>
      {/* Display Subtotal */}
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
