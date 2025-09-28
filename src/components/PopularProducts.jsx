import ProductCard from "./ProductCard"

const PopularProducts = ({plants}) => {
  return (
    <div className='max-w-6xl 2xl:max-w-7xl mx-auto my-32 flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-0'>
        <p className="bg-brand-primary-light text-white text-xs p-2 rounded-full">Most Popular</p>
        <h2 className='mt-2 text-2xl md:text-3xl font-poppins font-medium'>
            Discover Our Products
        </h2>
        <div className='w-full mt-16 grid grid-cols-5 gap-4'>
            {plants.slice(0,5).map((plant, index) => (
              <ProductCard
                key={index}
                id={plant.id}
                name={plant.name}
                price={plant.price}
                imgurl={plant.imgurl}
                availability={plant.availability}
                carelevel={plant.carelevel}
              />
            ))}
        </div>
    </div>
  )
}

export default PopularProducts