import { getLiquidById } from '@/_actions/liquidAtion'
import UpdateLiquid from '@/app/shared/UpdateLiquid'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const UpdateLiquidPage =async ({ params }: { params: { id: string } }) => {
  const { data } = await getLiquidById(params.id)
  return (
    <div className='space-y-6'>
      <Button asChild>
        <Link href={'/admin/e-liquid'}>Back</Link>
      </Button>
      <UpdateLiquid data={data?.liquid} />
    </div>
  )
}

export default UpdateLiquidPage