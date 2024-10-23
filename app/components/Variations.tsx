'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Quantity from './Quantity'

type VariationsProps = {
  attribute: string
  values: string[]
  dataItem: any
  variantItem: string
}

const Variations = ({
  dataItem,
  attribute,
  values,
  variantItem,
}: VariationsProps) => {
  const router = useRouter()
  const [selectedValue, setSelectedValue] = useState<string>(values[0])

  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search)
    if (selectedValue) {
      currentParams.set(attribute, selectedValue)
    }
    router.push(`?${currentParams.toString()}`)
  }, [selectedValue, attribute, router])

  return (
    <>
      <p className='mt-5 text-sm'>
        {variantItem}: {selectedValue}
      </p>
      <div className='flex flex-wrap gap-2 mt-4'>
        {values.map((value) => {
          return (
            <Button
              key={value}
              variant={'ghost'}
              className={`p-2 border-gray-300 border ${
                selectedValue === value ? 'border-black' : ''
              }`}
              onClick={() => setSelectedValue(value)}
            >
              {value}
            </Button>
          )
        })}
      </div>
      <div>
        <h3 className='text-sm mt-10 text-muted-foreground'>Quantity:</h3>
        <Quantity
          itemProduct={dataItem}
          selectedvalidation={{ key: attribute, value: selectedValue! }}
        />
      </div>
    </>
  )
}

export default Variations
