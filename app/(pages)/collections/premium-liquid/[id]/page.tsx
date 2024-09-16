import { getAllLiquids, getLiquidById } from '@/_actions/liquidAtion'
import {
  getAllPremiumLiquids,
  getPremiumLiquidById,
} from '@/_actions/premiumLiquidAction'
import Quantity from '@/app/components/Quantity'
import RelatedProducts from '@/app/components/RelatedProducts'
import { Button } from '@/components/ui/button'
import { TypeVariation } from '@/Types'
import Image from 'next/image'
import Link from 'next/link'

const ViewDetailsPremiumliquid = async ({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { variationsId: string }
}) => {
  const dataItem = await getPremiumLiquidById(params.id)
  const { data } = await getAllPremiumLiquids()
  const imgSrc = `data:${dataItem?.data?.premiumLiquid.img.contentType};base64,${dataItem.data?.premiumLiquid.img.data}`
  const variations = dataItem?.data?.premiumLiquid.variations.map(
    (variation: TypeVariation) => variation
  )
  const selectedVariation = variations?.filter(
    (variation: TypeVariation) => variation._id == searchParams.variationsId
  )

  return (
    <div>
      <div className='mt-10 justify-center flex gap-x-10 w-full md:flex-row flex-col'>
        <div className='left w-full flex md:justify-end'>
          <Image
            src={imgSrc}
            alt={dataItem.data?.premiumLiquid.productName}
            width={500}
            height={500}
          />
        </div>
        <div className='right w-full'>
          <h2 className='text-2xl font-bold'>
            {dataItem.data?.premiumLiquid.productName}
          </h2>
          <p className='text-lg font-bold'>
            LE {selectedVariation[0]?.price ? selectedVariation[0].price : 'NA'}
            .00
          </p>
          <p className='mt-5 text-sm'>
            Size: {selectedVariation.nicotineType}
            {selectedVariation[0]?.size}ml - {selectedVariation[0]?.nicotine}{' '}
            nic
          </p>
          <div className='mt-2 space-x-4'>
            {dataItem.data?.premiumLiquid.variations.map(
              (item: TypeVariation) => {
                return (
                  <Button
                    key={item._id}
                    variant={'ghost'}
                    className={`p-2 border-gray-300 border ${
                      searchParams.variationsId == item._id && 'border-black'
                    }`}
                    asChild
                  >
                    <Link href={`?variationsId=${item._id}`}>
                      {item.nicotineType} {item.size}ml - {item.nicotine} Nic
                    </Link>
                  </Button>
                )
              }
            )}
          </div>
          <div>
            <h3 className='text-sm mt-10 text-muted-foreground'>Quantity:</h3>
            <Quantity
              itemProduct={selectedVariation[0] && selectedVariation[0]}
            />
          </div>
        </div>
      </div>
      <div className='Related-Products my-10'>
        <h3 className='border-t text-center font-bold text-xl py-5'>
          Related Products
        </h3>
        <RelatedProducts
          data={data?.premiumLiquids}
          url={'premium-liquid'}
          params={`variationsId=${data?.premiumLiquids[0].variations[0]._id}`}
        />
      </div>
    </div>
  )
}

export default ViewDetailsPremiumliquid
