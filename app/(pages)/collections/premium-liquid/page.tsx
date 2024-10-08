import { getAllPremiumLiquids } from '@/_actions/premiumLiquidAction'
import SidebarFilteration from '@/app/components/SidebarFilteration'
import UserLayout from '@/app/shared/UserLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination'
import { TypeLiquid, TypeVariation } from '@/Types'
import { linesPremiumVape } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { IoFilterOutline } from 'react-icons/io5'

const PremiumLiquidPage = async ({
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
  let limit = parseInt(searchParams.limit || '10') || 10
  let search = searchParams.search || ''
  const sort = searchParams.sort || ''
  const nicotine = searchParams.nicotine || ''
  const nicotineType = searchParams.nicotineType || ''
  const size = searchParams.size || ''
  const line = searchParams.line || ''

  page = !page || page < 1 ? 1 : page
  limit = !limit || limit < 1 ? 10 : limit

  const { data, totalCount } = await getAllPremiumLiquids(
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
    <UserLayout PageTitle='Premium Liquid'>
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
            <SidebarFilteration lineVape={linesPremiumVape} />
          </SheetContent>
        </Sheet>
      </div>
      <div className='flex'>
        <div className='w-[25%] me-10 hidden lg:block'>
          <SidebarFilteration lineVape={linesPremiumVape} />
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 w-full gap-4'>
          {data?.premiumLiquids.length > 0 ? (
            data?.premiumLiquids.map((premiumLiquid: TypeLiquid) => {
              const imgSrc = `data:${premiumLiquid.img.contentType};base64,${premiumLiquid.img.data}`
              return (
                <Card key={premiumLiquid._id}>
                  <CardContent>
                    <div className='flex justify-center'>
                      <Image
                        src={imgSrc}
                        alt={premiumLiquid.productName}
                        width={200}
                        height={200}
                        loading='lazy'
                      />
                    </div>
                    <h2 className=' mt-4 my-4'>{premiumLiquid.productName}</h2>
                    <span className='font-bold '>
                      <span className='text-gray-400 pe-2'>From:</span> LE{' '}
                      {Math.min(
                        ...premiumLiquid?.variations.map(
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
                        href={`/collections/premium-liquid/${premiumLiquid._id}?variationsId=${premiumLiquid.variations[0]._id}`}
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
              No premium liquid available
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

export default PremiumLiquidPage
