'use client'
import { createTank } from '@/_actions/tanksAction'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
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
      className='col-span-3'
      type='submit'
      disabled={pending}
    >
      {pending ? 'Creating...' : 'Create'}
    </Button>
  )
}

const AddTankPage = () => {
  const [state, formAction] = useFormState(createTank, initialstate)
  if (state.status === 201) {
    toast.success('Disposable created successfully')
  } else if (state.status === 400) {
    toast.error(state.message)
  }
  return (
    <div className='space-y-10'>
      <Button asChild>
        <Link href={'/admin/tanks'}>Back</Link>
      </Button>
      <h1 className='text-3xl'>Add Tank</h1>
      <div className='form'>
        <form action={formAction}>
          <div className='grid lg:grid-cols-3  gap-5 '>
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
              step='any'
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
              className='col-span-3'
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

export default AddTankPage
