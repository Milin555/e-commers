  import React from 'react'
  import HeroImg from '../../assets/img/hero-img.png'

  const HeroSection = () => {
    return (
      <div className='relative flex items-center bg-cover justify-start bg-center text-left h-[60vh] md:h-svh w-full' style={{backgroundImage
      : `url(${HeroImg})`}}>
          <div className='absolute top-0 right-0 bottom-0 left-0'></div>
              <main className='px-6 md:px-10 lg:px-24 z-10'>
                  <div className='text-left'>
                      <h2 className='text-lg md:text-2xl text-white'>T-shirt / Tops</h2>
                  </div>
                  <p className='mt-3 text-white sm:mt-5 sm:max-w-xl text-3xl md:text-6xl'>
                  Summer 
                  Value Pack
                  </p>
                  <p className='mt-3 text-white sm:mt-5 sm:max-w-xl text-lg md:text-2xl'>
                  cool / colorful / comfy
                  </p>
                  <button className='border rounded mt-4 md:mt-6 border-black hover:bg-white hover:text-black hover:border-black text-white bg-black w-36 md:w-44 h-10 md:h-12 text-sm md:text-base'>
                      Shop Now
                  </button>
              </main>
          
      </div>
    )
  }

  export default HeroSection