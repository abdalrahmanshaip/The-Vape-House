import { getPodsystemById } from '@/_actions/podSystemAction'
import UpdatePodSystem from '@/app/shared/UpdatePodSystem'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const UpdatePodSystemPage = async({ params }: { params: { id: string } }) => {
  const { data } = await getPodsystemById(params.id)
  return (
    <div className='space-y-6'>
      <Button asChild>
        <Link href={'/admin/pod-system'}>Back</Link>
      </Button>
      <UpdatePodSystem data={data?.podSystem} />
    </div>
  )
}

export default UpdatePodSystemPage