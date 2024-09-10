import { getAllDesposable } from '@/_actions/disposableAction'
import SelectItemPerPage from '@/app/components/SelectItemPerPage'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TypeDispo } from '@/Types'
import Image from 'next/image'
import Link from 'next/link'

const DisposablePage = async ({
  searchParams,
}: {
  searchParams: { page: string; limit: string }
}) => {
  let page = parseInt(searchParams.page) || 1
  let limit = parseInt(searchParams.limit) || 10
  page = !page || page < 1 ? 1 : page
  const { data } = await getAllDesposable(limit, page)
  return (
    <main className='my-20 space-y-10 '>
      <h1 className='text-2xl font-bold border-b-2 pb-4'>Disposable</h1>
      <div className='filtration flex flex-wrap justify-between'>
        <Input
          placeholder='Search'
          className='basis-full mb-5 md:basis-1/2'
        />
        <div className='select flex gap-x-5'>
          <SelectItemPerPage />
          <Select>
            <SelectTrigger >
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='apple'>Apple</SelectItem>
                <SelectItem value='banana'>Banana</SelectItem>
                <SelectItem value='blueberry'>Blueberry</SelectItem>
                <SelectItem value='grapes'>Grapes</SelectItem>
                <SelectItem value='pineapple'>Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 '>
        {data?.disposables.map((disposable: TypeDispo) => {
          const imgSrc = `data:${disposable.img.contentType};base64,${disposable.img.data}`
          return (
            <Card key={disposable._id}>
              <CardContent>
                <div>
                  <Image
                    className='w-full h-52 object-contain'
                    src={imgSrc}
                    alt={disposable.productName}
                    width={'100'}
                    height={'100'}
                  />
                </div>
                <h2 className=' mt-4 my-4'>{disposable.productName}</h2>
                <span className='font-bold '>LE {disposable.price}.00</span>
              </CardContent>
              <CardFooter className='ease-linear duration-300'>
                <Button
                  className='w-full text-black rounded-2xl border-black border mt-4 hover:bg-black hover:text-white ease-linear duration-300 transition'
                  size='sm'
                  variant={'ghost'}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </main>
  )
}

export default DisposablePage
