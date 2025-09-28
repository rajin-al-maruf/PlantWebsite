import { GoArrowRight } from 'react-icons/go'
import { PiPhoneCallThin } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import bg from '../assets/bg-web.jpg'

const Hero = () => {
  return (
    <div className="w-full h-screen bg-brand-accent relative overflow-hidden">

      <img 
        src={bg} 
        alt="" 
        className='absolute top-0 left-0 w-full h-full object-cover z-0'
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/0 z-10" />
      
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-0 relative z-20 h-full flex items-center">
        <div className='sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl'>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-brand-accent">
            Your Green Corner Starts Here
          </h1>
          <p className="mt-4 max-w-xl text-neutral-500 text-sm sm:text-base">
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
              <div className="w-10 h-10 bg-brand-primary text-brand-accent rounded-full flex items-center justify-center">
                <PiPhoneCallThin size={20} />
              </div>
              <div className="pl-2">
                <p className="text-[10px] text-brand-accent">Call Now</p>
                <p className="text-xs sm:text-sm font-semibold text-brand-accent">01234-678901</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

