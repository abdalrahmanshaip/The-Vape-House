'use client'

import { createPremiumLiquid } from '@/_actions/premiumLiquidAction'
import { Button } from '@/components/ui/button'
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
import { linesPremiumVape } from '@/utils'
import Link from 'next/link'
import { useState } from 'react'
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

const AddPremiumLiquidPage = () => {
  const [line, setLine] = useState<string>('')
  const [state, formAction] = useFormState(createPremiumLiquid, initialstate)
  const [variations, setVariations] = useState([
    { size: '', nicotineType: '', quantity: '', nicotine: '', price: '' },
  ])
  const [errors, setErrors] = useState(false) // To handle validation errors

  // Handle adding a new variation
  const addVariation = () => {
    // Ensure the last variation is filled before adding a new one
    if (
      variations.some(
        (v) =>
          !v.size || !v.nicotineType || !v.quantity || !v.nicotine || !v.price
      )
    ) {
      setErrors(true)
      return
    }
    setErrors(false)
    setVariations([
      ...variations,
      { size: '', nicotineType: '', quantity: '', nicotine: '', price: '' },
    ])
  }

  // Handle removing a variation
  const removeVariation = (index: number) => {
    const updatedVariations = variations.filter((_, i) => i !== index)
    setVariations(updatedVariations)
  }

  // Handle changing variation input
  const handleVariationChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement> | string
  ) => {
    const updatedVariations = [...variations]
    if (typeof e === 'string') {
      updatedVariations[index] = {
        ...updatedVariations[index],
        nicotineType: e,
      }
    } else {
      const { name, value } = e.target
      updatedVariations[index] = { ...updatedVariations[index], [name]: value }
    }
    setVariations(updatedVariations)
  }

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Check if variations are valid (none should be empty)
    if (
      variations.some(
        (v) => !v.size || !v.nicotineType || !v.nicotine || !v.price
      )
    ) {
      setErrors(true)
      toast.error('Please fill all the variation fields.')
      return
    }

    const formData = new FormData(e.currentTarget)
    formData.set('variations', JSON.stringify(variations))

    await formAction(formData)
  }

  if (state.status === 201) {
    toast.success(state.message)
  } else if (state.status === 400) {
    toast.error(state.message)
  }

  return (
    <div className='space-y-10'>
      <Button asChild>
        <Link href={'/admin/premium-liquid'}>Back</Link>
      </Button>
      <h1 className='text-3xl'>Add Liquid</h1>
      <div className='form'>
        <form onSubmit={handleFormSubmit}>
          <div className='grid lg:grid-cols-3 gap-5 '>
            <Input
              type='text'
              placeholder='Product Name'
              name='productName'
              required
              className='col-span-3'
            />

            <Input
              type='file'
              placeholder='Image'
              className='col-span-3'
              name='img'
              required
            />
            <Select onValueChange={(e) => setLine(e)}>
              <SelectTrigger>
                <SelectValue placeholder='Select line liquid' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>line</SelectLabel>
                  {linesPremiumVape.map((item) => (
                    <SelectItem
                      key={item.name}
                      value={item.name}
                    >
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
              <Input
                value={line}
                name='line'
                type='hidden'
              />
            </Select>
            {/* Variations */}
            <div className='col-span-3'>
              <h3 className='text-xl mb-2'>Variations</h3>
              {variations.map((variation, index) => (
                <div
                  key={index}
                  className='grid grid-cols-3 gap-3 mb-4'
                >
                  <Input
                    type='text'
                    placeholder='Size'
                    name='size'
                    value={variation.size}
                    onChange={(e) => handleVariationChange(index, e)}
                    required
                  />
                  <Select
                    onValueChange={(value) =>
                      handleVariationChange(index, value)
                    }
                    value={variation.nicotineType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select Nicotine Type' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Nicotine Type</SelectLabel>
                        <SelectItem value='MTL'>MTL</SelectItem>
                        <SelectItem value='DL'>DL</SelectItem>
                        <SelectItem value='Salt'>Salt</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Input
                    type='text'
                    placeholder='Nicotine Level'
                    name='nicotine'
                    value={variation.nicotine}
                    onChange={(e) => handleVariationChange(index, e)}
                    required
                  />
                  <Input
                    type='number'
                    placeholder='Price'
                    name='price'
                    value={variation.price}
                    onChange={(e) => handleVariationChange(index, e)}
                    required
                    step='any'
                  />
                  <Input
                    type='text'
                    placeholder='Quantity'
                    name='quantity'
                    value={variation.quantity}
                    onChange={(e) => handleVariationChange(index, e)}
                    required
                  />
                  <Button
                    type='button'
                    onClick={() => removeVariation(index)}
                    className='col-span-3 text-red-300'
                  >
                    Remove Variation
                  </Button>
                </div>
              ))}
              <Button
                type='button'
                onClick={addVariation}
                className='mb-4'
              >
                Add Variation
              </Button>
              {errors && (
                <p className='text-red-500'>
                  Please fill out all fields before adding another variation.
                </p>
              )}
            </div>

            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPremiumLiquidPage
