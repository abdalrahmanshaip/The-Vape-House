import { getCoilsCartidgeById } from '@/_actions/coilsCartidgeAction'
import UpdateCoilCartidge from '@/app/shared/UpdateCoilCartidge'
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
