import { getModById } from '@/_actions/modAtion'
import UpdateMod from '@/app/shared/UpdateMod'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const UpdateModPage = async ({ params }: { params: { id: string } }) => {
  const { data } = await getModById(params.id)
  return (
    <div className='space-y-6'>
      <Button asChild>
        <Link href={'/admin/mod'}>Back</Link>
      </Button>
      <UpdateMod data={data?.mod} />
    </div>
  )
}

export default UpdateModPage
