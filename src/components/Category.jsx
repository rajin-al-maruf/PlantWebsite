import categoryInfo from "../categoryInfo"


const Category = ({plants}) => {

  return (
    <div className='max-w-6xl 2xl:max-w-7xl mx-auto my-32 flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 xl:px-0'>
        <p className="bg-brand-primary-light text-white text-xs p-2 rounded-full">Product Category</p>
        <h2 className='mt-2 text-2xl md:text-3xl font-poppins font-medium'>
            Shop by Category
        </h2>
        <div className='w-full mt-16 grid grid-cols-3 lg:flex items-center justify-between gap-4'>
            {categoryInfo.map((category) => {
                return(
                    <div key={category.id} className='flex flex-col items-center justify-center'>
                        <div className='w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 xl:w-40 xl:h-40 bg-neutral-200 rounded-full overflow-hidden hover:cursor-pointer hover:scale-105 duration-300'>
                            <img src={category.img} alt={category.title} className='h-full w-full object-contain p-2'/>
                        </div>
                        <p className='mt-6 text-xs md:text-sm xl:text-base font-medium hover:cursor-pointer hover:text-brand-primary text-center'>
                            {category.title}
                        </p>
                        <p className="text-xs font-light">
                            {plants ? plants.filter(plant => plant.category === category.title).length : 0} Products
                        </p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Category