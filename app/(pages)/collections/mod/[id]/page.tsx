import { getAllMod, getModById } from '@/_actions/modAtion'
import Quantity from '@/app/components/Quantity'
import RelatedProducts from '@/app/components/RelatedProducts'
import Variations from '@/app/components/Variations'
import { Button } from '@/components/ui/button'
import { TypeMod } from '@/Types'
import Image from 'next/image'
import Link from 'next/link'

const ViewDetailsMod = async ({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { color: string }
}) => {
  const dataItem = await getModById(params.id)
  const { data } = await getAllMod()
  const imgSrc = `data:${dataItem?.data?.mod.img.contentType};base64,${dataItem.data?.mod.img.data}`
  const colors = dataItem.data?.mod.colors.split(',')
  const maybeLike = data?.mods.filter(
    (item: TypeMod) => item._id !== dataItem.data?.mod._id
  )
  return (
    <div>
      <div className='mt-10  justify-center flex gap-x-10 w-full md:flex-row flex-col'>
        <div className='left  flex md:justify-end'>
          <Image
            src={imgSrc}
            alt={dataItem.data?.mod.productName}
            width={700}
            height={700}
            priority
          />
        </div>
        <div className='right w-full'>
          <h2 className='text-2xl font-bold'>
            {dataItem.data?.mod.productName}
          </h2>
          <p className='text-lg font-bold '>LE {dataItem.data?.mod.price}.00</p>
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
              itemProduct={dataItem.data?.mod}
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
          url={'mod'}
        />
      </div>
    </div>
  )
}

export default ViewDetailsMod
