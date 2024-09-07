'use client'
import { createDesposable } from '@/_actions/disposableAction'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React, { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { FaToggleOff, FaToggleOn } from 'react-icons/fa6'
import { toast } from 'sonner'

const initialstate = {
  status: 0,
  message: '',
}

const SubmitButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button
      className='col-span-2'
      type='submit'
      disabled={pending}
    >
      {pending ? 'Creating...' : 'Create'}
    </Button>
  )
}

const AddDisposablePage = () => {
  const [state, formAction] = useFormState(createDesposable, initialstate)
  if (state.status === 201) {
    toast.success('Disposable created successfully')
  } else if (state.status === 400) {
    toast.error(state.message)
  }

  const [topDispo, setTopDispo] = useState(false)
  return (
    <div className='space-y-10'>
      <Button asChild>
        <Link href={'/admin/disposable'}>Back</Link>
      </Button>
      <h1 className='text-3xl'>Add Disposable</h1>
      <div className='form'>
        <form action={formAction}>
          <div className='top_10'>
            <label className='inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                value={topDispo ? 'true' : 'false'}
                name='topDispo'
                className='sr-only peer'
                onClick={() => setTopDispo(!topDispo)}
              />
              <span className='me-4 text-sm text-gray-600 dark:text-gray-400'>
                Top 10 dispo?
              </span>
              {topDispo ? (
                <FaToggleOn
                  size={40}
                  className='text-green-400 '
                />
              ) : (
                <FaToggleOff
                  size={40}
                  className='text-red-400'
                />
              )}
            </label>
          </div>
          
          <div className='grid lg:grid-cols-2 gap-5 grid-cols-1'>
            <Input
              type='text'
              placeholder='Name'
              name='productName'
              required
            />
            <Input
              type='number'
              placeholder='Price'
              name='price'
              required
            />
            <Input
              type='text'
              placeholder='Flavor'
              name='flavor'
              required
            />
            <Input
              type='number'
              placeholder='Maximum quantity'
              name='quantity'
              required
            />
            <Input
              type='file'
              placeholder='Image URL'
              className='col-span-2'
              name='img'
              required
            />
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddDisposablePage
