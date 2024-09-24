import { getAllLiquids } from '@/_actions/liquidAtion'
import SidebarFilteration from '@/app/components/SidebarFilteration'
import UserLayout from '@/app/shared/UserLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { TypeLiquid, TypeVariation } from '@/Types'
import { linesEgyptVape } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { IoFilterOutline } from 'react-icons/io5'

const LiquidPage = async ({
  searchParams,
}: {
  searchParams: {
    page?: string
    limit?: string
    search?: string
    sort: string
    nicotine: string
    nicotineType: string
    size: string
    line: string
  }
}) => {
  let page = parseInt(searchParams.page || '1') || 1
  let limit = parseInt(searchParams.limit || '12') || 10
  let search = searchParams.search || ''
  const sort = searchParams.sort || ''
  const nicotine = searchParams.nicotine || ''
  const nicotineType = searchParams.nicotineType || ''
  const size = searchParams.size || ''
  const line = searchParams.line || ''

  page = !page || page < 1 ? 1 : page
  limit = !limit || limit < 1 ? 10 : limit

  const { data, totalCount } = await getAllLiquids(
    limit,
    page,
    search,
    sort,
    nicotine,
    nicotineType,
    size,
    line
  )
  const totalPages = Math.ceil(totalCount! / limit)

  return (
    <UserLayout PageTitle='Liquid'>
      <div className='lg:hidden -mt-4'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline'>
              Filter <IoFilterOutline className='ms-2' />
            </Button>
          </SheetTrigger>
          <SheetContent
            side={'left'}
            className='max-h-[100%] overflow-y-auto '
          >
            <SheetHeader className='text-start'>
              <SheetTitle>Filtertion list</SheetTitle>
            </SheetHeader>
            <SheetDescription className='text-start mb-5'>
              Filter Item to get what you want
            </SheetDescription>
            <SidebarFilteration lineVape={linesEgyptVape} />
          </SheetContent>
        </Sheet>
      </div>
      <div className='flex'>
        <div className=' w-[25%] me-10 hidden lg:block'>
          <SidebarFilteration lineVape={linesEgyptVape} />
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 w-full gap-4'>
          {data?.liquids.length > 0 ? (
            data?.liquids.map((liquid: TypeLiquid) => {
              const imgSrc = `data:${liquid.img.contentType};base64,${liquid.img.data}`

              return (
                <Card key={liquid._id}>
                  <CardContent>
                    <div className='flex justify-center'>
                      <Image
                        src={imgSrc}
                        alt={liquid.productName}
                        width={200}
                        height={200}
                        loading='lazy'
                      />
                    </div>
                    <h2 className=' mt-4 my-4'>{liquid.productName}</h2>
                    <span className='font-bold '>
                      <span className='text-gray-400 pe-2'>From:</span> LE{' '}
                      {Math.min(
                        ...liquid?.variations.map(
                          (variation: TypeVariation) => variation.price
                        )
                      )}
                      .00
                    </span>
                  </CardContent>
                  <CardFooter className='ease-linear duration-300'>
                    <Button
                      className='w-full text-black rounded-2xl border-black border mt-4 hover:bg-black hover:text-white ease-linear duration-300 transition'
                      size='sm'
                      variant={'ghost'}
                      asChild
                    >
                      <Link
                        href={`/collections/e-liquid/${liquid._id}?variationsId=${liquid.variations[0]._id}`}
                      >
                        View Details
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })
          ) : (
            <div className='col-span-4 text-center text-2xl'>
              No Liquid available
            </div>
          )}
        </div>
      </div>
      <Pagination className='mt-10'>
        <PaginationContent>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <PaginationItem key={p}>
              <Button
                className={`${
                  p === page && 'border bg-blue-500 text-white'
                } rounded-full`}
                variant={'ghost'}
                asChild
              >
                <Link
                  href={`?page=${p}`}
                  scroll={false}
                >
                  {p}
                </Link>
              </Button>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </UserLayout>
  )
}

export default LiquidPage
