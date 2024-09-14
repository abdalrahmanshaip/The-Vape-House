import { getAllMod } from '@/_actions/modAtion'
import UserDashboard from '@/app/shared/UserLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { TypeMod } from '@/Types'
import Image from 'next/image'

const ModPage = async ({
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

  const { data } = await getAllMod(limit, page, search, sort)

  return (
    <UserDashboard PageTitle='Disposable'>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {data?.mods.length > 0 ? (
          data?.mods.map((mod: TypeMod) => {
            const imgSrc = `data:${mod.img.contentType};base64,${mod.img.data}`
            return (
              <Card key={mod._id}>
                <CardContent>
                  <div>
                    <Image
                      className='w-full h-52 object-contain'
                      src={imgSrc}
                      alt={mod.productName}
                      width={100}
                      height={100}
                    />
                  </div>
                  <h2 className=' mt-4 my-4'>{mod.productName}</h2>
                  <span className='font-bold '>LE {mod.price}.00</span>
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
            No Disposable available
          </div>
        )}
      </div>
    </UserDashboard>
  )
}

export default ModPage
