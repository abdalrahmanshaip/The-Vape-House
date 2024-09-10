'use client'
import { updatePremiumLiquid } from '@/_actions/premiumLiquidAction'
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
import { TypeLiquid } from '@/Types'
import { linesEgyptVape } from '@/utils'
import Image from 'next/image'
import React, { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'

const UpdateButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button
      className='col-span-3'
      type='submit'
      disabled={pending}
    >
      {pending ? 'Updateing...' : 'Update'}
    </Button>
  )
}

const UpdatePremiumLiquid = ({ data }: { data: TypeLiquid }) => {
  const [line, setLine] = useState<string>(data.line || '')
  const { pending } = useFormStatus()
  const [formState, setFormState] = useState({
    productName: data.productName || '',
    variations: data.variations || [
      { size: '', nicotineType: '', quantity: '', nicotine: '', price: '' },
    ],
    img: data.img || '',
  })

  const imgSrc = `data:${formState.img.contentType};base64,${formState.img.data}`
  // Handle changing variation input
  const handleVariationChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement> | string
  ) => {
    const updatedVariations = [...formState.variations]
    if (typeof e === 'string') {
      updatedVariations[index] = {
        ...updatedVariations[index],
        nicotineType: e,
      }
    } else {
      const { name, value } = e.target
      updatedVariations[index] = { ...updatedVariations[index], [name]: value }
    }
    setFormState({ ...formState, variations: updatedVariations })
  }

  // Handle general form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState({ ...formState, [name]: value })
  }

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    formData.append('variations', JSON.stringify(formState.variations))
    formData.append('_id', data._id)
    formData.append('line', line)
    if (e.currentTarget.img.files.length > 0) {
      formData.append('img', e.currentTarget.img.files[0])
    }

    const response = await updatePremiumLiquid(formData)

    if (response.status === 200) {
      toast.success(response.message)
    } else {
      toast.error(response.message)
    }
  }

  return (
    <div className='space-y-10'>
      <h1 className='text-3xl'>Update Liquid</h1>
      <div className='form'>
        <form onSubmit={handleFormSubmit}>
          <div className='grid lg:grid-cols-3 gap-5'>
            <Input
              type='text'
              placeholder='Product Name'
              name='productName'
              value={formState.productName}
              onChange={handleInputChange}
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
            <Select
              onValueChange={(value) => setLine(value)}
              value={line}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select Line' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Line</SelectLabel>
                  {linesEgyptVape.map((item) => (
                    <SelectItem
                      key={item.name}
                      value={item.name}
                    >
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Image
              src={imgSrc}
              alt={formState.productName}
              width={80}
              height={80}
            />

            {/* Variations */}
            <div className='col-span-3'>
              <h3 className='text-xl mb-2'>Variations</h3>
              {formState.variations.map((variation, index) => (
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
                    type='number'
                    placeholder='Quantity'
                    name='quantity'
                    defaultValue={variation.quantity}
                    onChange={(e) => handleVariationChange(index, e)}
                    required
                  />
                </div>
              ))}
            </div>
            <UpdateButton />
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdatePremiumLiquid
