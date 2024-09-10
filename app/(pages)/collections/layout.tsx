import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
  return <div className='container mx-auto p-4 sm:p-0'>
    {children}
  </div>
}

export default layout
