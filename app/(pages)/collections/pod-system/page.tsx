import { getAllPodSystems } from '@/_actions/podSystemAction'
import UserDashboard from '@/app/shared/UserDashboard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { TypePodSystem } from '@/Types'
import Image from 'next/image'

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
      {data?.podSystem.length > 0 ? (
        data?.podSystem.map((pod: TypePodSystem) => {
          const colors = pod.colors.split(',')
          console.log(colors)
          const imgSrc = `data:${pod.img.contentType};base64,${pod.img.data}`
          return (
            <Card key={pod._id}>
              <CardContent>
                <div>
                  <Image
                    className='w-full h-52 object-contain'
                    src={imgSrc}
                    alt={pod.productName}
                    width={100}
                    height={100}
                  />
                </div>
                <h2 className=' mt-4 my-4'>{pod.productName}</h2>
                <span className='font-bold '>LE {pod.price}.00</span>
                <div className='flex gap-x-2 mt-4'>
                  <div>colors: </div>
                  {colors.map((color: string, index) => {
                    console.log(color)
                    return <p key={index}>{color}</p>
                  })}
                </div>
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
        })
      ) : (
        <div className='col-span-4 text-center text-2xl'>
          No Pod system available
        </div>
      )}
    </UserDashboard>
  )
}

export default PodSystemPage
