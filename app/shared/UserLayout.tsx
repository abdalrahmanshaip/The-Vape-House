import React, { ReactNode } from 'react'
import Filteration from '../components/Filtertion'



const UserDashboard = ({
  PageTitle,
  children,
}: {
  PageTitle: string
  children: ReactNode
}) => {
  return (
    <main className='my-20 space-y-10'>
      <h1 className='text-2xl font-bold border-b-2 pb-4'>{PageTitle}</h1>
      <Filteration />
      <div className=''>
        {children}
      </div>
    </main>
  )
}

export default UserDashboard
