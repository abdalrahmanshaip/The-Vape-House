'use client'
import { updateTank } from '@/_actions/tanksAction'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TypeTanks } from '@/Types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { toast } from 'sonner'
const initialstate = {
  status: 0,
  message: '',
  path: '',
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
const UpdateTank = ({ data }: { data: TypeTanks }) => {
  const router = useRouter()
  const [state, formAction] = useFormState(updateTank, initialstate)
  if (state.status === 200) {
    toast.success(state.message)
    router.push(state.path!)
  } else if (state.status === 400) {
    toast.error(state.message)
  }
  return (
    <div className='space-y-10'>
      <h1 className='text-3xl'>Edit Tank: {data.productName}</h1>
      <div className='form'>
        <form action={formAction}>
          <input
            type='hidden'
            name='_id'
            value={data._id}
          />

          <div className='grid lg:grid-cols-2 gap-5 grid-cols-1'>
            <Input
              type='text'
              placeholder='Name'
              name='productName'
              required
              defaultValue={data.productName}
            />
            <Input
              type='price'
              placeholder='Price'
              name='price'
              required
              defaultValue={data.price}
            />
            <Input
              type='text'
              placeholder='Maximum quantity'
              name='quantity'
              required
              defaultValue={data.quantity}
            />
            <Input
              type='file'
              placeholder='Image URL'
              className='col-span-2'
              name='img'
              required
            />
            <Image
              src={`data:${data.img.contentType};base64,${data.img.data}`}
              alt={data.productName}
              width={300}
              height={300}
            />
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateTank
