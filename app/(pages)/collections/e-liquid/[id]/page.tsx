import { getAllLiquids, getLiquidById } from '@/_actions/liquidAtion'
import Quantity from '@/app/components/Quantity'
import RelatedProducts from '@/app/components/RelatedProducts'
import { Button } from '@/components/ui/button'
import { TypeLiquid, TypeVariation } from '@/Types'
import Image from 'next/image'
import Link from 'next/link'

const ViewDetailsliquid = async ({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { variationsId: string }
}) => {
  const dataItem = await getLiquidById(params.id)
  const { data } = await getAllLiquids()

  const imgSrc = `data:${dataItem?.data?.liquid.img.contentType};base64,${dataItem.data?.liquid.img.data}`
  const variations = dataItem.data?.liquid.variations.map(
    (variation: TypeVariation) => variation
  )
  const selectedVariation = variations.find(
    (variation: TypeVariation) => variation._id === searchParams.variationsId
  )
  const defaultVariation = variations[0] || {}
  const variationToUse = selectedVariation || defaultVariation
  const maybeLike = data?.liquids.filter(
    (item: TypeLiquid) => item._id !== dataItem.data?.liquid._id
  )

  return (
    <div>
      <div className='mt-10 justify-center flex gap-x-10 w-full md:flex-row flex-col'>
        <div className='left  flex md:justify-end'>
          <Image
            src={imgSrc}
            alt={dataItem.data?.liquid.productName}
            width={700}
            height={700}
            priority
          />
        </div>
        <div className='right w-full'>
          <h2 className='text-2xl font-bold'>
            {dataItem.data?.liquid.productName}
          </h2>
          <p className='text-lg font-bold'>
            LE {variationToUse.price ? variationToUse.price : 'NA'}.00
          </p>
          <p className='mt-5 text-sm'>
            Size: {variationToUse.nicotineType} {variationToUse.size}ml -{' '}
            {variationToUse.nicotine} nic
          </p>
          <div className='mt-2 space-x-4'>
            {variations.map((item: TypeVariation) => {
              return (
                <Button
                  key={item._id}
                  variant={'ghost'}
                  className={`p-2 border-gray-300 border ${
                    searchParams.variationsId === item._id ? 'border-black' : ''
                  }`}
                  asChild
                >
                  <Link href={`?variationsId=${item._id}`}>
                    {item.nicotineType} {item.size}ml - {item.nicotine} Nic
                  </Link>
                </Button>
              )
            })}
          </div>
          <div>
            <h3 className='text-sm mt-10 text-muted-foreground'>Quantity:</h3>
            <Quantity
              itemProduct={dataItem.data?.liquid}
              selectedvalidation={{
                key: 'variations',
                value: `${variationToUse.nicotineType} ${variationToUse.size} ml - ${variationToUse.nicotine} nic`,
              }}
              price={variationToUse.price}
              quantityLiquid={variationToUse.quantity}
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
          url={'e-liquid'}
        />
      </div>
    </div>
  )
}

export default ViewDetailsliquid
