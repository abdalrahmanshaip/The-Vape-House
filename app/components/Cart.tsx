'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { linesEgyptVape } from '@/utils'
import React, { useEffect, useState } from 'react'
import { MdOutlineShoppingCart } from 'react-icons/md'
import SidebarFilteration from './SidebarFilteration'

const Cart = () => {
  const [cart, setCart] = useState<any[]>([])
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedValue = window.localStorage.getItem('cart')
      if (savedValue) {
        setCart(JSON.parse(savedValue))
      }
    }
  }, [])
  useEffect(() => {
    if (typeof window !== 'undefined' && cart.length > 0) {
      window.localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart])
  return (
    <div className='flex items-center'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline'>
            <MdOutlineShoppingCart
              size={25}
              className='text-center'
            />
            <p className='hidden lg:block'>Cart {cart.length > 0 && cart.length}</p>
          </Button>
        </SheetTrigger>
        <SheetContent
          side={'right'}
          className='max-h-[100%] overflow-y-auto '
        >
          <SheetHeader className='text-start'>
            <SheetTitle>Filtertion list</SheetTitle>
          </SheetHeader>
          <SheetDescription className='text-start mb-5'>
            Filter Item to get what you want
          </SheetDescription>
          <SidebarFilteration lineVape={linesEgyptVape} />
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Cart
