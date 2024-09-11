import SelectItemPerPage from '@/app/components/SelectItemPerPage'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className='container mx-auto p-4 sm:p-0'>{children}</div>
}

export default Layout
