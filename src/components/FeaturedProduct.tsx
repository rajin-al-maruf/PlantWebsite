import featuredProduct from '/assets/plants/aloevera.png'
import { GoArrowRight } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const FeaturedProduct = () => {
  return (
    <div className='w-full relative overflow-hidden bg-brand-primary-dark my-32'>
        
        {/* Massive Background Typography Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] md:text-[200px] lg:text-[250px] font-black text-white/[0.03] whitespace-nowrap pointer-events-none select-none tracking-tighter">
            ALOE VERA
        </div>

        <div className='max-w-6xl 2xl:max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-0 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-12 lg:gap-20 relative z-10'>
            
            {/* Left: Content Area */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className='flex flex-col items-center lg:items-start justify-center text-center lg:text-left order-2 lg:order-1'
            >
                <div className="mb-6 inline-flex items-center gap-3">
                    <span className="h-[1px] w-12 bg-brand-primary-light"></span>
                    <span className="text-brand-primary-light uppercase tracking-[0.2em] text-xs font-bold">Featured Plant</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight">
                    Nature's <br className="hidden lg:block" /> Healing Touch
                </h2>
                <p className="text-gray-300 leading-relaxed mt-6 mb-10 text-sm md:text-base max-w-lg">
                    Aloe Vera is not just beautiful — it’s a natural air purifier and a
                    healing plant. Perfect for your home or office to bring freshness
                    and a modern green vibe.
                </p>
                <Link to="/product/43ecd2d4-bedb-41b3-b034-c8b5cbe0bb26">
                    <button className="group flex items-center px-8 py-4 text-xs sm:text-sm bg-white text-black hover:bg-brand-primary hover:text-white transition-all duration-300 uppercase font-bold tracking-widest cursor-pointer rounded-full">
                        SHOP ALOE VERA
                        <GoArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform" size={20} />
                    </button>
                </Link>
            </motion.div>

            {/* Right: Image Area */}
            <div className='w-full flex items-center justify-center order-1 lg:order-2 relative'>
                {/* Soft glow behind the plant */}
                <div className="absolute inset-0 bg-brand-primary-light/20 blur-[100px] rounded-full pointer-events-none" />
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    className="relative z-10"
                >
                    <img 
                        src={featuredProduct} 
                        alt="featured plant"
                        className='w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
                    />
                </motion.div>
            </div>
            
        </div>
    </div>
  )
}

export default FeaturedProduct