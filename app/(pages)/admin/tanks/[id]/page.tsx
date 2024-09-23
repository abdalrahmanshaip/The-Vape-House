import { getTankById } from '@/_actions/tanksAction'
import UpdateTank from '@/app/shared/UpdateTank'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const UpdateTankPage = async ({ params }: { params: { id: string } }) => {
  const { data } = await getTankById(params.id)
  return (
    <div className='space-y-6'>
      <Button asChild>
        <Link href={'/admin/tanks'}>Back</Link>
      </Button>

      <UpdateTank data={data?.tank} />
    </div>
  )
}

export default UpdateTankPage
