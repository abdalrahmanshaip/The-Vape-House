import { getDispoById } from '@/_actions/disposableAction'
import Quantity from '@/app/components/Quantity'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ViewDetailsDisposable = async ({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { flavor: string }
}) => {
  const dataItem = await getDispoById(params.id)
  const imgSrc = `data:${dataItem?.data?.img.contentType};base64,${dataItem.data?.img.data}`
  const flavors = dataItem.data?.disposable.flavor.split(',')
  return (
    <div className='mt-10 mx-32 flex space-x-20'>
      <div className='left'>
        <Image
          src={imgSrc}
          alt={dataItem.data?.disposable.productName}
          width={500}
          height={500}
        />
      </div>
      <div className='right '>
        <h2 className='text-2xl font-bold'>
          {dataItem.data?.disposable.productName}
        </h2>
        <p className='text-lg font-bold'>
          LE {dataItem.data?.disposable.price}.00
        </p>
        <p className='mt-5 text-sm'>Flavors: {searchParams.flavor}</p>
        <div className='mt-2 space-x-4'>
          {flavors.map((item: string) => {
            return (
              <Button
                key={item}
                variant={'ghost'}
                className={`p-2 border-gray-300 border ${
                  searchParams.flavor === item && 'border-black'
                }`}
                asChild
              >
                <Link href={`?flavor=${item}`}>{item}</Link>
              </Button>
            )
          })}
        </div>
        <div>
          <h3 className='text-sm mt-10 text-muted-foreground'>Quantity:</h3>
          <Quantity quantityOfItem={dataItem.data?.disposable.quantity}/>
        </div>
      </div>
    </div>
  )
}

export default ViewDetailsDisposable
