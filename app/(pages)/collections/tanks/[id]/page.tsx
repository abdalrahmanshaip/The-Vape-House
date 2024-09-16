import { getAllDesposable, getDispoById } from '@/_actions/disposableAction'
import { getAllTanks, getTankById } from '@/_actions/tanksAction'
import Quantity from '@/app/components/Quantity'
import RelatedProducts from '@/app/components/RelatedProducts'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

const ViewDetailsTanks = async ({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { color: string }
}) => {
  const dataItem = await getTankById(params.id)
  const { data } = await getAllTanks()
  const imgSrc = `data:${dataItem?.data?.tank.img.contentType};base64,${dataItem.data?.tank.img.data}`
  return (
    <div>
      <div className='mt-10  justify-center flex gap-x-10 w-full md:flex-row flex-col'>
        <div className='left w-full flex md:justify-end'>
          <Image
            src={imgSrc}
            alt={dataItem.data?.tank.productName}
            width={400}
            height={400}
          />
        </div>
        <div className='right w-full'>
          <h2 className='text-2xl font-bold'>
            {dataItem.data?.tank.productName}
          </h2>
          <p className='text-lg font-bold '>
            LE {dataItem.data?.tank.price}.00
          </p>
          <div>
            <h3 className='text-sm mt-10 text-muted-foreground'>Quantity:</h3>
            <Quantity itemProduct={dataItem.data?.tank} />
          </div>
        </div>
      </div>
      <div className='Related-Products my-10'>
        <h3 className='border-t text-center font-bold text-xl py-5'>
          Related Products
        </h3>
        <RelatedProducts
          data={data?.tanks}
          url={'tanks'}
          params=''
        />
      </div>
    </div>
  )
}

export default ViewDetailsTanks
