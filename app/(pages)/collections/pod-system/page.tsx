import { getAllPodSystems } from '@/_actions/podSystemAction'
import UserDashboard from '@/app/shared/UserLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { TypePodSystem } from '@/Types'
import Image from 'next/image'
import Link from 'next/link'

const PodSystemPage = async ({
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

  const { data } = await getAllPodSystems(limit, page, search, sort)

  return (
    <UserDashboard PageTitle='Pod system'>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {data?.podSystem.length > 0 ? (
          data?.podSystem.map((pod: TypePodSystem) => {
            const colors = pod.colors.split(',')
            const imgSrc = `data:${pod.img.contentType};base64,${pod.img.data}`
            return (
              <Card key={pod._id}>
                <CardContent>
                  <div className='flex justify-center'>
                    <Image
                      src={imgSrc}
                      alt={pod.productName}
                      width={200}
                      height={200}
                      loading='lazy'
                    />
                  </div>
                  <h2 className=' mt-4 my-4'>{pod.productName}</h2>
                  <span className='font-bold '>LE {pod.price}.00</span>
                  <div className='flex gap-x-2 mt-2'>
                    <div>colors: </div>
                    {colors.map((color: string, index) => {
                      return <p key={index}>{color}</p>
                    })}
                  </div>
                </CardContent>
                <CardFooter className='ease-linear duration-300'>
                  <Button
                    className='w-full text-black rounded-2xl border-black border mt-4 hover:bg-black hover:text-white ease-linear duration-300 transition'
                    size='sm'
                    variant={'ghost'}
                    asChild
                  >
                    <Link
                      href={`/collections/pod-system/${pod._id}?color=${colors[0]}`}
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
            No Pod system available
          </div>
        )}
      </div>
    </UserDashboard>
  )
}

export default PodSystemPage
