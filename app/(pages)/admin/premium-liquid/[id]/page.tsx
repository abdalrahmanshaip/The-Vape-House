import { getPremiumLiquidById } from '@/_actions/premiumLiquidAction'
import UpdatePremiumLiquid from '@/app/shared/UpdatePremiumLiquid'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const UpdatePremiumLiquidPage =async ({ params }: { params: { id: string } }) => {
  const { data } = await getPremiumLiquidById(params.id)
  return (
    <div className='space-y-6'>
      <Button asChild>
        <Link href={'/admin/premium-liquid'}>Back</Link>
      </Button>
      <UpdatePremiumLiquid data={data?.premiumLiquid} />
    </div>
  )
}

export default UpdatePremiumLiquidPage