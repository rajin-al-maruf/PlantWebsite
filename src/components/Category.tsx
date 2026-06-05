import categoryInfo from "../categoryInfo"
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";


const Category = () => {

  return (
    <div className='max-w-6xl 2xl:max-w-7xl mx-auto my-24 px-4 md:px-6 lg:px-8 xl:px-0'>
        <div className="flex items-center justify-between mb-12">
            <div>
                <p className="text-brand-primary font-semibold uppercase tracking-wider">Explore Our Range</p>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-primary-dark mt-1">
                    Shop by Category
                </h2>
            </div>
        </div>

        <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-10'>
            {categoryInfo.map((category) => (
                <Link to={`/shop?category=${encodeURIComponent(category.title)}`} key={category.id} className="relative aspect-[4/5] rounded-2xl overflow-hidden group shadow-lg">
                    <img 
                        src={category.img} 
                        alt={category.title} 
                        className="w-full h-full object-contain p-6 md:p-8 group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 text-white w-full">
                        <h3 className="text-base md:text-lg font-bold">{category.title}</h3>
                        <div className="flex items-center justify-between mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-xs text-gray-200">Shop Now</p>
                            <GoArrowRight size={16} />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Category