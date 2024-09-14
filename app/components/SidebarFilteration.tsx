'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { TypeLiquid } from '@/Types'
import {
  linesEgyptVape,
  nicotineLevelFilterLiquid,
  sizeForFilterLiquid,
} from '@/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const SidebarFilteration = ({ lineVape }: { lineVape: { name: string }[] }) => {
  const liquidType = [
    { id: 'mtl', value: 'MTL', label: 'MTL' },
    { id: 'dl', value: 'DL', label: 'DL' },
    { id: 'salt nic', value: 'SaltNic', label: 'SaltNic' },
  ]
  const router = useRouter()
  const [nicotineType, setNicotineType] = useState('')
  const [liquidsize, setLiquidsize] = useState('')
  const [nicotineLevel, setNicotineLevel] = useState('')
  const [line, setLine] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (nicotineType) {
      params.set('nicotineType', nicotineType)
    } else {
      params.delete('nicotineType')
    }
    if (liquidsize.trim()) {
      params.set('size', liquidsize)
    } else {
      params.delete('size')
    }
    if (nicotineLevel.trim()) {
      params.set('nicotine', nicotineLevel)
    } else {
      params.delete('nicotine')
    }
    if (line.trim()) {
      params.set('line', line)
    } else {
      params.delete('line')
    }
    router.push(`?${params.toString()}`)
  }, [nicotineType, liquidsize, nicotineLevel, line, router])

  const resetFilter = () => {
    setNicotineType('')
    setLiquidsize('')
    setNicotineLevel('')
    setLine('')
  }

  return (
    <div className=''>
      <div className='flex justify-between items-center'>
        <div className='text-xl'>Filter</div>
        <Button
          onClick={resetFilter}
          size={'sm'}
          className=''
        >
          Reset Filter
        </Button>
      </div>
      <Accordion
        type='multiple'
        className='w-full'
      >
        <form action=''>
          <AccordionItem value='item-1'>
            <AccordionTrigger>Liquid Type</AccordionTrigger>
            <AccordionContent>
              <div className='max-h-[300px] overflow-y-auto space-y-4'>
                {liquidType.map((item) => {
                  return (
                    <div
                      className='flex items-center space-x-2'
                      key={item.id}
                    >
                      <Checkbox
                        name='myCheckbox'
                        onCheckedChange={() => setNicotineType(item.value)}
                        checked={nicotineType === item.value}
                      />
                      <label
                        htmlFor={item.id}
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      >
                        {item.label}
                      </label>
                    </div>
                  )
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger>Size</AccordionTrigger>
            <AccordionContent>
              <div className='max-h-[300px] overflow-y-auto space-y-4'>
                {sizeForFilterLiquid.map((size, index) => {
                  return (
                    <div
                      className='flex items-center space-x-2'
                      key={index}
                    >
                      <Checkbox
                        id='size'
                        onCheckedChange={() => setLiquidsize(size.size)}
                        checked={liquidsize === size.size}
                      />
                      <label
                        htmlFor={size.size}
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      >
                        {size.size} ML
                      </label>
                    </div>
                  )
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-3'>
            <AccordionTrigger>Nicotine level</AccordionTrigger>
            <AccordionContent>
              <div className='max-h-[300px] overflow-y-auto space-y-4'>
                {nicotineLevelFilterLiquid.map((nic, index) => {
                  return (
                    <div
                      className='flex items-center space-x-2'
                      key={index}
                    >
                      <Checkbox
                        id={nic.label}
                        onCheckedChange={() => setNicotineLevel(nic.label)}
                        checked={nicotineLevel === nic.label}
                      />
                      <label
                        htmlFor={nic.label}
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      >
                        {nic.label} Nic
                      </label>
                    </div>
                  )
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-4'>
            <AccordionTrigger>Brand</AccordionTrigger>
            <AccordionContent>
              <div className='max-h-[300px] overflow-y-auto space-y-4'>
                {lineVape.map((brand, index) => {
                  return (
                    <div
                      className='flex items-center space-x-2'
                      key={index}
                    >
                      <Checkbox
                        id='size'
                        onCheckedChange={() => setLine(brand.name)}
                        checked={line === brand.name}
                      />
                      <label
                        htmlFor={brand.name}
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize'
                      >
                        {brand.name}
                      </label>
                    </div>
                  )
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </form>
      </Accordion>
    </div>
  )
}

export default SidebarFilteration
