'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Quantity = ({quantityOfItem}: {quantityOfItem: number}) => {
  console.log(quantityOfItem)
  return (
    <div className='flex relative my-2'>
      <Button
        className='absolute hover:bg-transparent left-0'
        variant={'ghost'}
      >
        -
      </Button>
      <Input
        className='rounded-3xl text-center w-[50%]'
        defaultValue={1}
      />
      <Button
        className='absolute hover:bg-transparent right-[50%]'
        variant={'ghost'}
      >
        +
      </Button>
    </div>
  )
}

export default Quantity
