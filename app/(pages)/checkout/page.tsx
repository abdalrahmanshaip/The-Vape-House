'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const CheckoutPage = () => {
  const [cart, setCart] = useState<any[]>([])
  const [subtotal, setSubtotal] = useState(0)
  const [delivery, setDelivery] = useState(65)

  // Fetch cart from localStorage
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
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2'>
          <div className='mb-6'>
            <h2 className='text-xl font-semibold'>Contact</h2>
            <Input
              type='email'
              placeholder='Email or mobile phone number'
              className='w-full mt-2'
            />
          </div>
          <div className='mb-6'>
            <h2 className='text-xl font-semibold mb-2'>Delivery</h2>
            <div className='grid grid-cols-2 gap-4'>
              <Input placeholder='First name (optional)' />
              <Input placeholder='Last name' />
            </div>
            <Input
              placeholder='Address'
              className='w-full mt-2'
            />
            <div className='grid grid-cols-2 gap-4 mt-2'>
              <Input placeholder='City' />
              <Select>
                <SelectTrigger className='w-full'>Cairo</SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Governorate</SelectLabel>
                    <SelectItem value='apple'>6th of October</SelectItem>
                    <SelectItem value='banana'>Giza</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Input
              placeholder='Postal code (optional)'
              className='w-full mt-2'
            />
            <Input
              placeholder='Phone'
              className='w-full mt-2'
            />
          </div>

          {/* Shipping method */}
          <div className='mb-6'>
            <h2 className='text-xl font-semibold mb-2'>Shipping method</h2>
            <div className='border p-4 rounded-lg flex justify-between '>
              <label className='block'>Cairo</label>
              <p className='text-right'>EGP {delivery.toFixed(2)}</p>
            </div>
          </div>

          {/* Payment */}
          <div className='mb-6'>
            <h2 className='text-xl font-semibold mb-2'>Payment</h2>
            <div className='p-4 border rounded-lg'>
              <label className='block'>Cash on Delivery (COD)</label>
            </div>
          </div>
          <Button className='w-full mt-6'>Complete order</Button>
        </div>

        {/* Right Side (Cart Summary) */}
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
          </ul>

          <div className='border-t border-gray-300 pt-4'>
            <div className='flex justify-between items-center mb-2'>
              <p>Subtotal</p>
              <p>EGP {subtotal.toFixed(2)}</p>
            </div>
            <div className='flex justify-between items-center mb-2'>
              <p>Delivery</p>
              <p>EGP {delivery.toFixed(2)}</p>
            </div>
            <div className='flex justify-between items-center font-semibold'>
              <p>Total</p>
              <p>EGP {(subtotal + delivery).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
