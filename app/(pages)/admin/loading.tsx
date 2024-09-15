'use client'

import dynamic from 'next/dynamic'
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

import animationloading from '@/animation/AnimationLoading.json'

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
