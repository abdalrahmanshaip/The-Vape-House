import React, { ReactNode } from 'react'
import SelectItemPerPage from '../components/SelectItemPerPage'

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
      <SelectItemPerPage />
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 '>
        {children}
      </div>
    </main>
  )
}

export default UserDashboard
