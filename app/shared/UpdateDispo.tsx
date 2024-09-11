'use client'
import { TypeDispo } from '@/Types'
import { updateDisposable } from '@/_actions/disposableAction'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { FaToggleOff, FaToggleOn } from 'react-icons/fa6'
import { toast } from 'sonner'

const initialstate = {
  path: '',
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
      {pending ? 'Updateing...' : 'Update'}
    </Button>
  )
}
const UpdateDispo = ({ data }: { data: TypeDispo }) => {
  const router = useRouter()
  const [state, formAction] = useFormState(updateDisposable, initialstate)
  if (state.status === 200) {
    toast.success('Disposable created successfully')
    router.push(state.path!)
  } else if (state.status === 400) {
    toast.error(state.message)
  }

  const [topDispo, setTopDispo] = useState(data.topDispo ? true : false)
  return (
    <div className='space-y-10'>
      <h1 className='text-3xl'>Edit Disposable: {data.productName}</h1>
      <div className='form'>
        <form action={formAction}>
          <input
            type='hidden'
            name='_id'
            value={data._id}
          />
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
              defaultValue={data.productName}
            />
            <Input
              type='number'
              placeholder='Price'
              name='price'
              required
              defaultValue={data.price}
            />
            <Input
              type='text'
              placeholder='Flavor'
              name='flavor'
              required
              defaultValue={data.flavor}
            />
            <Input
              type='number'
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

export default UpdateDispo
