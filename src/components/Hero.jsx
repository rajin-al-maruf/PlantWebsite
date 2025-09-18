import React from 'react'
import { GoArrowRight } from 'react-icons/go'
import { PiPhoneCallThin } from 'react-icons/pi'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="w-full h-screen bg-brand-accent relative">
      
      <div className="max-w-7xl mx-auto pt-35 sm:pt-40 px-4 md:px-6 lg:px-8 xl:px-0">
        <div className='sm:max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-3xl'>
          <h1 className="text-4xl lg:text-5xl font-bold text-brand-primary">
            Your Green Corner Starts Here
          </h1>
          <p className="mt-4 max-w-xl text-gray-700 text-sm sm:text-base">
            Discover air purifying low-maintenance indoor plants for your corner.
            We deliver potted plants and plant care essentials anywhere in Dhaka
            with eco-friendly packaging.
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-6 mt-8 items-center">
            <Link to="/shop">
              <button className="flex items-center px-6 py-3 text-sm sm:text-base bg-brand-primary hover:bg-brand-primary-dark hover:scale-105 transition duration-500 text-brand-accent rounded-full cursor-pointer">
                Explore Now
                <div className="pl-2">
                  <GoArrowRight />
                </div>
              </button>
            </Link>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-brand-primary-light rounded-full flex items-center justify-center">
                <PiPhoneCallThin size={20} />
              </div>
              <div className="pl-2">
                <p className="text-[10px] text-brand-primary">Call Now</p>
                <p className="text-xs sm:text-sm font-semibold text-brand-primary">01234-678901</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[35%] sm:w-[35%] sm:h-screen bg-brand-primary absolute bottom-4 sm:right-0 sm:top-0">
        <div className=' bg-brand-primary'>

        </div>
        {/* <img
          src={heroPlant}
          alt="Hero plant"
          className="absolute hidden top-1/2 -translate-y-1/2 -left-24 w-48 sm:w-64 md:w-80 lg:w-[28rem]"
        /> */}
      </div>

    </div>
  )
}

export default Hero

