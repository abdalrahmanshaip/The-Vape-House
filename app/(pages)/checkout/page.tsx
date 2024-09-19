'use client'
import { sendEmail } from '@/_actions/sendEmailAtions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '@/components/ui/select'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { toast } from 'sonner'
const initialstate = {
  status: 0,
  message: '',
}

const SubmitButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button
      className='w-full mt-6'
      type='submit'
      disabled={pending}
    >
      {pending ? (
        <div className='flex'>
          <p>Completing order </p>
          <AiOutlineLoading3Quarters className='ms-2 h-4 w-4 animate-spin' />
        </div>
      ) : (
        'Complete order'
      )}
    </Button>
  )
}

const CheckoutPage = () => {
  const [state, formAction] = useFormState(sendEmail, initialstate)
  if (state.status === 200) {
    toast.success('Your order has been send successfully')
  } else if (state.status === 500) {
    toast.error('Error sending email')
  }
  const [cart, setCart] = useState<any[]>([])
  const [subtotal, setSubtotal] = useState(0)
  const [delivery, setDelivery] = useState(70)

  const fetchCartFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      try {
        const storage = localStorage.getItem('cart')
        const products = JSON.parse(storage || '[]')
        setCart(products)
      } catch (error) {
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

  return (
    <div className='container mx-auto px-4 py-10'>
      <h1 className='text-2xl font-bold mb-8'>Checkout</h1>
      <form action={formAction}>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2'>
            <div className='mb-6'>
              <h2 className='text-xl font-semibold'>Contact</h2>
              <Input
                type='email'
                placeholder='Email or mobile phone number'
                className='w-full mt-2'
                name='email'
                required
              />
            </div>
            <div className='mb-6'>
              <h2 className='text-xl font-semibold mb-2'>Delivery</h2>
              <div className='grid grid-cols-2 gap-4'>
                <Input
                  placeholder='First name (optional)'
                  name='firstName'
                  required
                />
                <Input
                  placeholder='Last name'
                  name='lastName'
                  required
                />
              </div>
              <Input
                placeholder='Address'
                className='w-full mt-2'
                name='address'
                required
              />
              <div className='grid grid-cols-2 gap-4 mt-2'>
                <Input
                  placeholder='City'
                  name='city'
                  required
                />
                <Select>
                  <SelectTrigger className='w-full'>
                    6th of October
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Governorate</SelectLabel>
                      <SelectItem value='6th of October'>
                        6th of October
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Input
                placeholder='Phone'
                className='w-full mt-2'
                name='phoneNumber'
                type='number'
                required
              />
            </div>
            <div className='mb-6'>
              <h2 className='text-xl font-semibold mb-2'>Shipping method</h2>
              <div className='border p-4 rounded-lg flex justify-between '>
                <label className='block'>6th of October</label>
                <p className='text-right'>EGP {delivery.toFixed(2)}</p>
              </div>
            </div>
            <div className='mb-6'>
              <h2 className='text-xl font-semibold mb-2'>Payment</h2>
              <div className='p-4 border rounded-lg'>
                <label className='block'>Cash on Delivery (COD)</label>
              </div>
            </div>
            <SubmitButton />
          </div>
          <div className='lg:col-span-1 bg-gray-50 p-6 rounded-lg'>
            <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>
            <ul className='space-y-5 mb-2'>
              {cart.map((item, index) => {
                const imgSrc = `data:${item?.img?.contentType};base64,${item?.img?.data}`
                return (
                  <li
                    key={index}
                    className='flex justify-between items-center mb-4'
                  >
                    <div>
                      <div className='flex items-center space-x-2 '>
                        <Image
                          src={imgSrc}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                        <div>
                          {item.name}
                          <p className='text-gray-500 text-xs '>
                            {item.flavor ||
                              item.resistance ||
                              item.variations ||
                              item.color}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p>EGP {item.price.toFixed(2)}</p>
                  </li>
                )
              })}
              <Input
                type='hidden'
                value={JSON.stringify(cart)}
                name='cart'
              />
            </ul>

            <div className='border-t border-gray-300 pt-4'>
              <div className='flex justify-between items-center mb-2'>
                <p>Subtotal</p>
                <p>EGP {subtotal.toFixed(2)}</p>
                <Input
                  type='hidden'
                  name='subtotal'
                  value={subtotal.toFixed(2)}
                />
              </div>
              <div className='flex justify-between items-center mb-2'>
                <p>Delivery</p>
                <p>EGP {delivery.toFixed(2)}</p>
                <Input
                  type='hidden'
                  name='delivery'
                  value={delivery.toFixed(2)}
                />
              </div>
              <div className='flex justify-between items-center font-semibold'>
                <p>Total</p>
                <p>EGP {(subtotal + delivery).toFixed(2)}</p>
                <Input
                  type='hidden'
                  name='total'
                  value={(subtotal + delivery).toFixed(2)}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CheckoutPage
