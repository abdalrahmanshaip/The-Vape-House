import { getAllDesposable, getDispoById } from '@/_actions/disposableAction'
import Quantity from '@/app/components/Quantity'
import RelatedProducts from '@/app/components/RelatedProducts'
import Variations from '@/app/components/Variations'
import { Button } from '@/components/ui/button'
import { TypeDispo } from '@/Types'
import Image from 'next/image'
import Link from 'next/link'

const ViewDetailsDisposable = async ({
  params,
}: {
  params: { id: string }
}) => {
  const dataItem = await getDispoById(params.id)
  const flavorsItem = dataItem.data?.disposable.flavor.split(',')
  const { data } = await getAllDesposable()
  const imgSrc = `data:${dataItem?.data?.img.contentType};base64,${dataItem.data?.img.data}`
  const maybeLike = data?.disposables.filter(
    (item: TypeDispo) => item._id !== dataItem.data?.disposable._id
  )
  return (
    <div>
      <div className='mt-10  justify-center flex gap-x-10 w-full md:flex-row flex-col'>
        <div className='left flex md:justify-end'>
          <Image
            src={imgSrc}
            alt={dataItem.data?.disposable.productName}
            width={700}
            height={700}
            priority
          />
        </div>
        <div className='right w-full mt-6'>
          <h2 className='text-2xl font-bold'>
            {dataItem.data?.disposable.productName}
          </h2>
          <p className='text-lg font-bold '>
            LE {dataItem.data?.disposable.price}.00
          </p>
          <Variations
            attribute={'flavor'}
            values={flavorsItem}
            dataItem={dataItem.data?.disposable}
            variantItem='Flavors'
          />
        </div>
      </div>
      <div className='Related-Products my-10'>
        <h3 className='border-t text-center font-bold text-xl py-5'>
          Related Products
        </h3>
        <RelatedProducts
          data={maybeLike}
          url={'disposable'}
        />
      </div>
    </div>
  )
}

export default ViewDetailsDisposable
