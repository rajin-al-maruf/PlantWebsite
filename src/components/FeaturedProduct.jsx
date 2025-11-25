import featuredProduct from '/assets/plants/aloevera.png'
import { GoArrowRight } from 'react-icons/go'
import { Link } from 'react-router-dom'

const FeaturedProduct = () => {
  return (
    <div className='w-full relative overflow-hidden bg-neutral-200 my-32 px-4 md:px-6 lg:px-8 xl:px-0'>
        <img 
            src={featuredProduct} 
            alt="featured plant"
            className='object-cover object-center w-full h-full absolute opacity-10'
        />
        <div className='max-w-6xl 2xl:max-w-7xl mx-auto h-full grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-16 relative'>
            <div className='w-full flex items-center justify-center'>
                <img 
                    src={featuredProduct} 
                    alt="featured plant"
                    className='w-full h-[500px] object-contain'
                />
            </div>

            <div className='flex flex-col items-center lg:items-start justify-center text-center lg:text-start pb-10 lg:pb-0'>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-primary-dark">
                    Aloe Vera
                </h2>
                <p className="text-neutral-600 leading-relaxed mt-2">
                    Aloe Vera is not just beautiful — it’s a natural air purifier and a
                    healing plant. Perfect for your home or office to bring freshness
                    and a modern green vibe.
                </p>
                <Link to="/product/43ecd2d4-bedb-41b3-b034-c8b5cbe0bb26">
                    <button className="flex items-center px-4 py-2 mt-8 text-xs sm:text-base border border-brand-primary hover:bg-brand-primary text-brand-primary hover:text-brand-accent hover:scale-105 transition duration-300 rounded-full cursor-pointer">
                        Buy Now
                        <div className="pl-2">
                        <GoArrowRight />
                        </div>
                    </button>
                </Link>
            </div>
            
        </div>
    </div>
  )
}

export default FeaturedProduct