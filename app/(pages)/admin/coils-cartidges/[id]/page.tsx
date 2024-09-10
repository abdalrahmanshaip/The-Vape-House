import { getCoilsCartidgeById } from '@/_actions/coilsCartidgeAction'
import { getDispoById } from '@/_actions/disposableAction'
import UpdateCoilCartidge from '@/app/shared/UpdateCoilCartidge'
import UpdateDispo from '@/app/shared/UpdateDispo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const UpdateCoilsCartidge = async ({ params }: { params: { id: string } }) => {
  const { data } = await getCoilsCartidgeById(params.id)
  return (
    <div className='space-y-6'>
      <Button asChild>
        <Link href={'/admin/coils-cartidges'}>Back</Link>
      </Button>
      <UpdateCoilCartidge data={data?.coildsCartidge} />
    </div>
  )
}

export default UpdateCoilsCartidge
