import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ReactNode } from 'react'

const AdminDashboard = ({
  title,
  addItemName,
  hrefLink,
  children,
}: {
  title: string
  addItemName: string
  hrefLink: string
  children: ReactNode
}) => {
  return (
    <div className='mt-2'>
      <div className='title flex justify-between items-center'>
        <p className='text-2xl'>{title}</p>
        <Button asChild><Link href={`/admin/${hrefLink}`}>{addItemName}</Link></Button>
      </div>
      {children}
    </div>
  )
}

export default AdminDashboard
