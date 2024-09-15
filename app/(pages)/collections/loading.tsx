'use client'  // Ensures client-side rendering

import dynamic from 'next/dynamic'

// Dynamically import Lottie for client-side only, SSR disabled
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

import animationloading from '@/animation/AnimationLoading.json'

const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-transparent">
      {/* Lottie animation */}
      <Lottie animationData={animationloading} loop={true} className="w-[40%]" />
      {/* Alternative loading text */}
      {/* <p>Loading...</p> */}
    </div>
  )
}

export default Loading
