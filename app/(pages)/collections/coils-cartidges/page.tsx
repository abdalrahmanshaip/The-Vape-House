import { getAllCoilsCartidges } from '@/_actions/coilsCartidgeAction'
import UserDashboard from '@/app/shared/UserLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { TypeCoildsCartidge } from '@/Types'
import Image from 'next/image'
import Link from 'next/link'

const CoilsCartidgesPage = async ({
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

  const { data } = await getAllCoilsCartidges(limit, page, search, sort)

  return (
    <UserDashboard PageTitle='Coils - Cartidges'>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {data?.coildsCartidges.length > 0 ? (
          data?.coildsCartidges.map((coildsCartidge: TypeCoildsCartidge) => {
            const imgSrc = `data:${coildsCartidge.img.contentType};base64,${coildsCartidge.img.data}`
            const resistance = coildsCartidge.resistance.split(',')
            return (
              <Card key={coildsCartidge._id}>
                <CardContent>
                  <div>
                    <Image
                      className='w-full h-52 object-contain'
                      src={imgSrc}
                      alt={coildsCartidge.productName}
                      width={100}
                      height={100}
                    />
                  </div>
                  <h2 className=' mt-4 my-4'>{coildsCartidge.productName}</h2>
                  <span className='font-bold '>
                    LE {coildsCartidge.price}.00
                  </span>
                </CardContent>
                <CardFooter className='ease-linear duration-300'>
                  <Button
                    className='w-full text-black rounded-2xl border-black border mt-4 hover:bg-black hover:text-white ease-linear duration-300 transition'
                    size='sm'
                    variant={'ghost'}
                  >
                    <Link
                      href={`/collections/coils-cartidges/${coildsCartidge._id}/?resistance=${resistance[0]}`}
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
            No coilds or cartidges available
          </div>
        )}
      </div>
    </UserDashboard>
  )
}

export default CoilsCartidgesPage
