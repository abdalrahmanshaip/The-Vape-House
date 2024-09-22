import { getAllDesposable } from '@/_actions/disposableAction'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { TypeDispo } from '@/Types'
import Image from 'next/image'
import Link from 'next/link'

const RelatedProducts = ({ data, url }: { data: any; url: string }) => {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className='w-full'
    >
      <CarouselContent>
        {data.map((item: any, index: number) => {
          const imgSrc = `data:${item.img.contentType};base64,${item.img.data}`
          const queryParams = []
          if (item?.flavor)
            queryParams.push(`flavor=${item.flavor.split(',')[0]}`)
          if (item?.color) queryParams.push(`color=${item.color.split(',')[0]}`)
          if (item?.resistance)
            queryParams.push(`resistance=${item.resistance.split(',')[0]}`)
          if (item?.variations)
            queryParams.push(`variationsId=${item.variations[0]._id}`)
          const queryString =
            queryParams.length > 0 ? `?${queryParams.join('&')}` : ''

          return (
            <CarouselItem
              key={item._id}
              className='md:basis-1/2 lg:basis-1/4'
            >
              <div className='p-1'>
                <Card>
                  <CardContent className='flex flex-col  items-center justify-center p-0'>
                    <Image
                      className='w-full h-52 object-contain'
                      src={imgSrc}
                      alt={item.productName}
                      width={400} // You can adjust the width and height as needed
                      height={300}
                    />
                  </CardContent>
                </Card>
                <div className='title mt-2'>
                  <p className='text-start  capitalize'>{item.productName}</p>
                  <p className='text-start font-bold'>LE {item.price}.00</p>
                </div>
                <Button
                  className='w-full text-black rounded-2xl border-black border mt-4 hover:bg-black hover:text-white ease-linear duration-300 transition'
                  size='sm'
                  variant={'ghost'}
                  asChild
                >
                  <Link href={`/collections/${url}/${item._id}`}>
                    View Details
                  </Link>
                </Button>
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious className='hidden lg:flex' />
      <CarouselNext className='hidden lg:flex' />
      <div className=' space-x-4 absolute left-1/2 -bottom-5  lg:hidden '>
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  )
}

export default RelatedProducts
