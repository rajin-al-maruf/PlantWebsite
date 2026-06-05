import ProductCard from "./ProductCard"
import { GoArrowRight } from "react-icons/go"
import { Link } from "react-router-dom"
import type { Plant } from "../App";

interface PopularProductsProps {
  plants: Plant[];
}

const PopularProducts = ({plants}: PopularProductsProps) => {
  return (
    <div className='max-w-6xl 2xl:max-w-7xl mx-auto my-32 px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-0'>
        
        {/* Header Section */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="flex flex-col items-start text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary font-medium text-xs md:text-sm mb-4">
                    <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
                    Top Sellers
                </div>
                <h2 className='text-3xl md:text-4xl font-bold text-brand-primary-dark'>
                    Discover Our Products
                </h2>
            </div>
            
            {/* Desktop 'View All' Button */}
            <Link to="/shop" className="hidden md:block">
                <button className="flex items-center justify-center px-6 py-3 text-sm font-medium bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 rounded-full cursor-pointer group">
                    View All Collection
                    <GoArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
                </button>
            </Link>
        </div>

        {/* Product Grid */}
        <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8'>
            {plants.slice(0,8).map((plant) => (
              <ProductCard
                key={plant.id}
                plant={plant}
              />
            ))}
        </div>

        {/* Mobile 'View All' Button */}
        <div className="w-full mt-10 flex justify-center md:hidden">
            <Link to="/shop" className="w-full sm:w-auto">
                <button className="w-full flex items-center justify-center px-6 py-3 text-sm font-medium bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 rounded-full cursor-pointer group">
                    View All Collection
                    <GoArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
                </button>
            </Link>
        </div>

    </div>
  )
}

export default PopularProducts