import Image from 'next/image'
import heroImg from '@/assets/tvubmKCpaZoTv0bQyBaLb0JsTqqYkg4YlF6gAcux.webp'

const Hero = () => {
  return (
    <div className='container mx-auto bg-muted mt-5 rounded-3xl h-[50vh]'>
      <div className='h-full flex justify-between items-center px-10'>
        <div className='title space-y-5'>
          <h1 className='md:text-6xl font-bold'>Unleash the Vape Experiene</h1>
          <p className='text-gray-500'>
            discover deals on premium vaping products and e-liquids at the vape
            house. your go-to for top vaping gear.
          </p>
        </div>
        <div className='flex justify-end'>
          <Image
            src={heroImg}
            alt='hero image'
            className='md:w-[50%]'
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
