'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { MdOutlineShoppingCart } from 'react-icons/md'

const Cart = () => {
  const [cart, setCart] = useState([])

  const fetchCartFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const storage = localStorage.getItem('cart')
      if (storage) {
        const products = JSON.parse(storage)
        setCart(products)
      }
    }
  }

  useEffect(() => {
    fetchCartFromLocalStorage()
    window.addEventListener('storage', fetchCartFromLocalStorage)
    window.addEventListener('cartUpdated', fetchCartFromLocalStorage)

    return () => {
      window.removeEventListener('storage', fetchCartFromLocalStorage)
      window.removeEventListener('cartUpdated', fetchCartFromLocalStorage)
    }
  }, [])

  const handleRemoveFromCart = (productId: string) => {
    const updatedCart = cart.filter(
      (item: { productId: string }) => item.productId !== productId
    )
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  }

  return (
    <div className='flex items-center'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline'>
            <MdOutlineShoppingCart
              size={25}
              className='text-center'
            />
            <p className='hidden lg:block'>Cart</p>
          </Button>
        </SheetTrigger>
        <SheetContent
          side={'right'}
          className='max-h-[100%] overflow-y-auto '
        >
          <SheetHeader className='text-start'>
            <SheetTitle>Shopping Cart</SheetTitle>
          </SheetHeader>
          <SheetDescription className='text-start mb-5'>
            {cart.length > 0 && cart.length} items
          </SheetDescription>
          <div className='space-y-5'>
            {cart.length > 0
              ? cart.map((cartItem: any) => {
                  const imgSrc = `data:${cartItem?.img?.contentType};base64,${cartItem?.img?.data}`
                  return (
                    <div
                      key={cartItem.productId}
                      className='border-b pb-4'
                    >
                      <div className='flex'>
                        <div className='img'>
                          <Image
                            src={imgSrc}
                            alt={cartItem.name}
                            width={100}
                            height={100}
                          />
                        </div>
                        <div className='details space-y-3 ms-4'>
                          <p>{cartItem.name}</p>
                          <p>{cartItem.flavor}</p>
                          <p>LE{cartItem.price}.00</p>
                        </div>
                      </div>
                      <div className='flex justify-between items-center mt-2'>
                        <div className='relative'>
                          <Button
                            className='absolute hover:bg-transparent left-0'
                            variant={'ghost'}
                          >
                            -
                          </Button>
                          <Input
                            className='rounded-3xl text-center w-[50%]'
                            type='text'
                            readOnly
                            value={cartItem.quantity}
                          />
                          <Button
                            className='absolute hover:bg-transparent right-[50%] top-0'
                            variant={'ghost'}
                          >
                            +
                          </Button>
                        </div>
                        <Button
                          className='text-2xl '
                          variant={'ghost'}
                          onClick={() =>
                            handleRemoveFromCart(cartItem.productId)
                          }
                        >
                          x
                        </Button>
                      </div>
                    </div>
                  )
                })
              : 'No cart available'}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Cart
