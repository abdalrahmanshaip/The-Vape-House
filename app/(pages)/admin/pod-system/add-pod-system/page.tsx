'use client'
import { createPodSystem } from '@/_actions/podSystemAction'
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
const AddPodSystemPage = () => {
  const [state, formAction] = useFormState(createPodSystem, initialstate)
  if (state.status === 201) {
    toast.success(state.message)
  } else if (state.status === 400) {
    toast.error(state.message)
  }
  return (
    <div className='space-y-10'>
      <Button asChild>
        <Link href={'/admin/pod-system'}>Back</Link>
      </Button>
      <h1 className='text-3xl'>Add Pod System</h1>
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
              type='text'
              placeholder='colors'
              name='colors'
              required
              step='any'
            />

            <Input
              type='number'
              placeholder='Maximum quantity'
              name='quantity'
              required
              className='col-span-3'
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

export default AddPodSystemPage
