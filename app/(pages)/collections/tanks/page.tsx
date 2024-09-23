import { getAllTanks } from '@/_actions/tanksAction'
import UserDashboard from '@/app/shared/UserLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { TypeTanks } from '@/Types'
import Image from 'next/image'
import Link from 'next/link'

const TanksPage = async ({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string; search?: string; sort: string }
}) => {
  let page = parseInt(searchParams.page || '1') || 1
  let limit = parseInt(searchParams.limit || '10') || 10
  let search = searchParams.search || ''
  const sort = searchParams.sort || ''

  page = !page || page < 1 ? 1 : page
  limit = !limit || limit < 1 ? 10 : limit

  const { data } = await getAllTanks(limit, page, search, sort)

  return (
    <UserDashboard PageTitle='Tanks'>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {data?.tanks.length > 0 ? (
          data?.tanks.map((tank: TypeTanks) => {
            const imgSrc = `data:${tank.img.contentType};base64,${tank.img.data}`
            return (
              <Card key={tank._id}>
                <CardContent>
                <div className='flex justify-center'>
                      <Image
                        src={imgSrc}
                        alt={tank.productName}
                        width={200}
                        height={200}
                        loading='lazy'
                      />
                    </div>
                  <h2 className=' mt-4 my-4'>{tank.productName}</h2>
                  <span className='font-bold '>LE {tank.price}.00</span>
                </CardContent>
                <CardFooter className='ease-linear duration-300'>
                  <Button
                    className='w-full text-black rounded-2xl border-black border mt-4 hover:bg-black hover:text-white ease-linear duration-300 transition'
                    size='sm'
                    variant={'ghost'}
                    asChild
                  >
                    <Link
                      href={`/collections/tanks/${tank._id}`}
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
            No Tanks available
          </div>
        )}
      </div>
    </UserDashboard>
  )
}

export default TanksPage
