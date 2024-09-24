import { getAllPodSystems, getPodsystemById } from '@/_actions/podSystemAction'
import Quantity from '@/app/components/Quantity'
import RelatedProducts from '@/app/components/RelatedProducts'
import Variations from '@/app/components/Variations'
import { Button } from '@/components/ui/button'
import { TypePodSystem } from '@/Types'
import Image from 'next/image'
import Link from 'next/link'

const ViewDetailsPodSystem = async ({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { color: string }
}) => {
  const dataItem = await getPodsystemById(params.id)
  const { data } = await getAllPodSystems()
  const imgSrc = `data:${dataItem?.data?.podSystem.img.contentType};base64,${dataItem.data?.podSystem.img.data}`
  const colors = data?.podSystem[0].colors.split(',')
  const maybeLike = data?.podSystem.filter(
    (item: TypePodSystem) => item._id !== dataItem.data?.podSystem._id
  )
  return (
    <div>
      <div className='mt-10  justify-center flex gap-x-10 w-full md:flex-row flex-col'>
        <div className='left  flex md:justify-end'>
          <Image
            src={imgSrc}
            alt={dataItem.data?.podSystem.productName}
            width={500}
            height={500}
            priority
          />
        </div>
        <div className='right w-full'>
          <h2 className='text-2xl font-bold'>
            {dataItem.data?.podSystem.productName}
          </h2>
          <p className='text-lg font-bold '>
            LE {dataItem.data?.podSystem.price}.00
          </p>
          <p className='mt-5 text-sm'>Color: {searchParams.color}</p>
          <div className='mt-2 space-x-4'>
            <Variations
              attribute={'color'}
              values={colors}
            />
          </div>
          <div>
            <h3 className='text-sm mt-10 text-muted-foreground'>Quantity:</h3>
            <Quantity
              itemProduct={dataItem.data?.podSystem}
              selectedvalidation={{
                key: 'color',
                value: searchParams.color || searchParams.color,
              }}
            />
          </div>
        </div>
      </div>
      <div className='Related-Products my-10'>
        <h3 className='border-t text-center font-bold text-xl py-5'>
          Related Products
        </h3>
        <RelatedProducts
          data={maybeLike}
          url={'pod-system'}
        />
      </div>
    </div>
  )
}

export default ViewDetailsPodSystem
