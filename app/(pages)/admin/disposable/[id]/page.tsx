import { getDispoById } from '@/_actions/disposableAction'
import UpdateDispo from '@/app/shared/UpdateDispo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const UpdateDispPage = async ({ params }: { params: { id: string } }) => {
  const { data } = await getDispoById(params.id)
  return (
    <div className='space-y-6'>
      <Button asChild>
        <Link href={'/admin/disposable'}>Back</Link>
      </Button>
      <UpdateDispo data={data?.disposable} />
    </div>
  )
}

export default UpdateDispPage
