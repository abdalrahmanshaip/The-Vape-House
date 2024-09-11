import Loading from '@/app/loading'
import { ReactNode, Suspense } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='container mx-auto p-4 sm:p-0'>
      <Suspense fallback={<Loading />}>
      {children}
      </Suspense>
    </div>
  )
}

export default Layout
