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
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { MdOutlineShoppingCart } from 'react-icons/md'

const Cart = () => {
  const [cart, setCart] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [subtotal, setSubtotal] = useState(0)

  const fetchCartFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      try {
        const storage = localStorage.getItem('cart')
        const products = JSON.parse(storage || '[]')
        if (products.length > 0) {
          setOpen(true)
        } else {
          setOpen(false)
        }
        setCart(products)
      } catch (error) {
        setOpen(false)
        setCart([])
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

  useEffect(() => {
    const calculateSubtotal = () => {
      const total = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      )
      setSubtotal(total)
    }

    calculateSubtotal()
  }, [cart])

  const handleRemoveFromCart = (
    productId: string,
    variations: [],
    flavor: string,
    resistance: string
  ) => {
    const updatedCart = cart.filter(
      (item: {
        productId: string
        variations: []
        flavor: string
        resistance: string
      }) =>
        item.productId !== productId ||
        item.variations !== variations ||
        item.flavor !== flavor ||
        item.resistance !== resistance
    )
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  }

  const handleIncrementQuantity = (productId: string) => {
    const updatedCart = cart.map((item: any) => {
      if (
        item.productId === productId &&
        item.limitQuantity !== item.quantity
      ) {
        return { ...item, quantity: item.quantity + 1 }
      }
      return item
    })
    setCart(updatedCart as any)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  }

  const handleDecrementQuantity = (productId: string) => {
    const updatedCart = cart.map((item: any) => {
      if (item.productId === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 }
      }
      return item
    })
    setCart(updatedCart as any)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  }

  return (
    <div className='flex items-center relative'>
      <Sheet
        open={open}
        onOpenChange={setOpen}
      >
        <SheetTrigger className={`flex`}>
          <MdOutlineShoppingCart
            size={25}
            className='text-center'
          />
          {cart.length > 0 && (
            <span className=' w-6 h-6 rounded-full bottom-6 left-3  text-white bg-black absolute'>
              {cart.length}
            </span>
          )}
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
            {cart.length > 0 ? (
              cart.map((cartItem: any, index) => {
                const imgSrc = `data:${cartItem?.img?.contentType};base64,${cartItem?.img?.data}`
                return (
                  <div
                    key={index}
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
                        <p>{cartItem?.name}</p>
                        <p>
                          {cartItem.flavor ||
                            cartItem.resistance ||
                            cartItem.variations ||
                            cartItem.color}
                        </p>
                        <p>LE{cartItem.price}.00</p>
                      </div>
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                      <div className='relative'>
                        <Button
                          className='absolute hover:bg-transparent left-0'
                          variant={'ghost'}
                          onClick={() =>
                            handleDecrementQuantity(cartItem.productId)
                          }
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
                          onClick={() =>
                            handleIncrementQuantity(cartItem.productId)
                          }
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        className='text-2xl '
                        variant={'ghost'}
                        onClick={() =>
                          handleRemoveFromCart(
                            cartItem.productId,
                            cartItem.variations,
                            cartItem.flavor,
                            cartItem.resistance
                          )
                        }
                      >
                        x
                      </Button>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className='text-center'>Your cart is empty</div>
            )}
          </div>
          {cart.length > 0 && (
            <div>
              <div className='mt-5 text-sm font-bold flex justify-between'>
                <p className=''>Subtotal:</p>
                <p className=''> LE {subtotal}.00</p>
              </div>
              <Button
                variant={'default'}
                className='mt-4 w-full'
                asChild
              >
                <Link href={'/checkout'}>Checkout</Link>
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Cart
