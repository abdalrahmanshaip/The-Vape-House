'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type VariationsProps = {
  attribute: string
  values: string[]
}

const Variations = ({ attribute, values }: VariationsProps) => {
  const router = useRouter()
  const [selectedValue, setSelectedValue] = useState<string>()

  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search)
    if (selectedValue) {
      currentParams.set(attribute, selectedValue)
    }
    router.push(`?${currentParams.toString()}`)
  }, [selectedValue, attribute, router])

  return (
    <div className='flex flex-wrap gap-2'>
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
  )
}

export default Variations
