import { getAllDesposable } from '@/_actions/disposableAction'
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
const CarouselTopItem = async () => {
  const { data } = await getAllDesposable()
  const filterWithTopTen = data?.disposables
    .filter((item: TypeDispo) => item.topDispo === 'true')
    .slice(0, 12)
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className='w-full'
    >
      <CarouselContent>
        {filterWithTopTen.map((item: TypeDispo, index: number) => {
          const imgSrc = `data:${item.img.contentType};base64,${item.img.data}`
          return (
            <CarouselItem
              key={index}
              className='md:basis-1/2 lg:basis-1/6'
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
                  <p className='text-start  capitalize'>
                    {item.productName}
                  </p>
                  <p className='text-start font-bold'>LE {item.price}.00</p>
                </div>
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

export default CarouselTopItem
