import {
  getAllCoilsCartidges,
  getCoilsCartidgeById,
} from '@/_actions/coilsCartidgeAction'
import Quantity from '@/app/components/Quantity'
import RelatedProducts from '@/app/components/RelatedProducts'
import Variations from '@/app/components/Variations'
import { Button } from '@/components/ui/button'
import { TypeCoildsCartidge } from '@/Types'
import Image from 'next/image'
import Link from 'next/link'

const ViewDetailsCoilsCartidge = async ({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { resistance: string }
}) => {
  const dataItem = await getCoilsCartidgeById(params.id)
  const { data } = await getAllCoilsCartidges()
  const imgSrc = `data:${dataItem?.data?.img.contentType};base64,${dataItem.data?.img.data}`
  const resistance = dataItem.data?.coildsCartidge.resistance.split(',')
  const maybeLike = data?.coildsCartidges.filter(
    (item: TypeCoildsCartidge) => item._id !== dataItem.data?.coildsCartidge._id
  )
  return (
    <div>
      <div className='mt-10  justify-center flex gap-x-10 w-full md:flex-row flex-col'>
        <div className='left w-full flex md:justify-end'>
          <Image
            src={imgSrc}
            alt={dataItem.data?.coildsCartidge.productName}
            width={500}
            height={500}
          />
        </div>
        <div className='right w-full'>
          <h2 className='text-2xl font-bold'>
            {dataItem.data?.coildsCartidge.productName}
          </h2>
          <p className='text-lg font-bold '>
            LE {dataItem.data?.coildsCartidge.price}.00
          </p>
          <p className='mt-5 text-sm'>Resistance: {searchParams.resistance}</p>
          <Variations
            attribute={'resistance'}
            values={resistance}
            dataItem={dataItem.data?.coildsCartidge}
          />
        </div>
      </div>
      <div className='Related-Products my-10'>
        <h3 className='border-t text-center font-bold text-xl py-5'>
          Related Products
        </h3>
        <RelatedProducts
          data={maybeLike}
          url={'coils-cartidges'}
        />
      </div>
    </div>
  )
}

export default ViewDetailsCoilsCartidge
