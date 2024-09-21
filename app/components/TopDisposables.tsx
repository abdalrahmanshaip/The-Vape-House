import Link from 'next/link'
import CarouselTopItem from '../shared/CarouselTopItem'
import { Button } from '@/components/ui/button'

const TopDisposables = () => {
  return (
    <div className='container mx-auto my-7 px-5'>
      <div className='title flex mb-5 items-center justify-between'>
        <h2 className='text-2xl font-bold '>Top Disposables</h2>
        <Button
          asChild
          variant={'ghost'}
        >
          <Link href={'/collections/disposable'}>see all </Link>
        </Button>
      </div>
      <CarouselTopItem />
    </div>
  )
}

export default TopDisposables
