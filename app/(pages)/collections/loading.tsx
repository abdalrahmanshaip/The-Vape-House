'use client'

import animationloading from '@/animation/AnimationLoading.json'
import Lottie from 'lottie-react'

const Loading = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center bg-transparent'>
      <Lottie
        animationData={animationloading}
        loop={true}
        className='w-[40%]'
      />
    </div>
  )
}

export default Loading
