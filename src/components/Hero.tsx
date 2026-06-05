import { useState, useEffect } from 'react'
import { GoArrowRight } from 'react-icons/go'
import { PiPhoneCallThin } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { TbLeaf, TbTruckDelivery, TbHeartHandshake, TbAward } from 'react-icons/tb';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Add your ad/billboard images here!
  const heroImages = [
    "/assets/bg-web.jpg",
    "/assets/shopPageImg.jpg", 
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Changes every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const qualities = [
    { icon: TbLeaf, title: "100% Organic", desc: "Healthy Plants" },
    { icon: TbTruckDelivery, title: "Fast Delivery", desc: "Inside Dhaka" },
    { icon: TbHeartHandshake, title: "Expert Care", desc: "Free Guidance" },
    { icon: TbAward, title: "Satisfaction", desc: "Guaranteed" },
  ];

  return (
    <div className="w-full relative bg-brand-accent/30 overflow-hidden flex flex-col items-center pt-32 lg:pt-40">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-primary-light/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] bg-brand-secondary/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Text Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary font-medium text-sm mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
          Fresh Arrivals Weekly
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-brand-primary-dark tracking-tight leading-[1.1]"
        >
          Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary-dark">Green Corner</span> <br className="hidden md:block" />Starts Here
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-neutral-600 text-base sm:text-lg max-w-2xl leading-relaxed"
        >
          Discover air purifying, low-maintenance indoor plants tailored for your space. We deliver potted plants and care essentials across Dhaka with eco-friendly packaging.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 mt-10"
        >
          <Link to="/shop">
            <button className="w-full sm:w-auto flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-widest bg-brand-primary hover:bg-brand-primary-dark transition-all duration-300 text-white rounded-full shadow-lg shadow-brand-primary/30 hover:-translate-y-1 cursor-pointer">
              Explore Collection
              <GoArrowRight className="ml-2" size={20} />
            </button>
          </Link>
          <button className="w-full sm:w-auto flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-widest border border-neutral-200 bg-white text-neutral-500 hover:text-brand-primary hover:border-brand-primary transition-all duration-300 rounded-full cursor-pointer shadow-sm">
            <PiPhoneCallThin className="mr-2" size={24} />
            01234-678901
          </button>
        </motion.div>
      </div>

      {/* Hero Bento Layout */}
      <div className="w-full max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pb-12 z-10">
        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8">
          
          {/* Main Image Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="flex-1 relative w-full min-h-[300px] lg:min-h-0 rounded-[2.5rem] overflow-hidden shadow-sm border border-neutral-200/50 group"
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                src={heroImages[currentImageIndex]} 
                alt={`Hero billboard image ${currentImageIndex + 1}`} 
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-brand-primary-dark/5 mix-blend-multiply transition-colors group-hover:bg-transparent duration-700 pointer-events-none" />
            
            {/* Billboard Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
              {heroImages.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === currentImageIndex ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Qualities Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="w-full lg:w-[320px] xl:w-[380px] shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-5"
          >
            {qualities.map((item, idx) => {
                const Icon = item.icon;
                return (
                    <div key={idx} className="flex items-center gap-5 p-5 md:p-6 bg-white/80 backdrop-blur-md border border-neutral-200/50 rounded-[2rem] shadow-sm hover:shadow-md hover:border-brand-primary/30 transition-all duration-300">
                        <div className="bg-brand-primary/10 p-3.5 rounded-2xl text-brand-primary shrink-0">
                            <Icon size={24} />
                        </div>
                        <div className="flex flex-col text-left">
                            <h3 className="text-sm md:text-base font-bold text-brand-primary-dark">{item.title}</h3>
                            <p className="text-xs md:text-sm text-neutral-500 mt-0.5">{item.desc}</p>
                        </div>
                    </div>
                )
            })}
          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default Hero
