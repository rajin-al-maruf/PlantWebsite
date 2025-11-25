import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { CiFilter } from 'react-icons/ci'
import Filter from '../components/Filter'
import filterInfo from '../filterInfo'
import { supabase } from '../supabase'
import SkeletonCard from '../components/SkeletonCard'
import Spinner from '../components/Spinner'
import shopPageImg from '/assets/shopPageImg.jpg'
import Breadcrumb from '../components/Breadcrumb'



const ShopPage = ({plants, setPlants}) => {

  const [isLoading, setIsLoading] = useState(false)

  const [filter, setFilter] = useState({
    category: [],
    carelevel: [],
    lightrequirement: [],
    availability: [],
  })
  const [sortBy, setSortBy] = useState("newest")
  const [tempFilter, setTempFilter] = useState(filter)
  
  // console.log(filter[filterInfo[0].id])

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setIsLoading(true)
        let plantData = supabase.from('plants').select('*')

        if(filter.category.length > 0){
          plantData = plantData.in("category", filter.category)
        }
        if(filter.carelevel.length > 0){
          plantData = plantData.in("carelevel", filter.carelevel)
        }
        if(filter.lightrequirement.length > 0){
          plantData = plantData.in("lightrequirement", filter.lightrequirement)
        }
        if(filter.availability.length > 0){
          plantData = plantData.in("availability", filter.availability)
        }

        if(sortBy === "newest"){
          plantData = plantData.order("id", {ascending: true})
        }
        if(sortBy === "low-to-high"){
          plantData = plantData.order("price", {ascending: true})
        }
        if(sortBy === "high-to-low"){
          plantData = plantData.order("price", {ascending: false})
        }

        const {data, error} = await plantData;

        if(error){
          console.error("Supabase error:", error.message);
        }else{
          setPlants(data)
        }

      } catch (error) {
        console.error("Unexpected error:", err);
      }finally{
        setIsLoading(false)
      }
    }
    fetchPlants()
  },[filter, sortBy])

  const [showFilters, setShowFilters] = useState(true)

  if (isLoading) {
    return <Spinner />
  }
  
  return (
    <div className='max-w-6xl 2xl:max-w-7xl mx-auto mt-36 px-4 md:px-6 lg:px-8 xl:px-0'>
      <Breadcrumb/>
      <div className='w-full h-72 relative overflow-hidden bg-neutral-200 my-4 rounded-lg'>
        <img 
          src={shopPageImg} 
          alt="featured plant"
          className='object-cover object-[35%_85%] w-full h-full absolute opacity-80'
        />
      </div>
      <div className='w-full flex items-center justify-between'>
        <div className='hidden md:block'>
          Filters
        </div>
        <div className='flex gap-2 items-center md:hidden'>
          <p>Filter:</p>
          <CiFilter onClick={() => setShowFilters(!showFilters)} size={30} className={showFilters? 'p-1 bg-neutral-200 border border-neutral-200 rounded-md cursor-pointer': 'p-1 border border-neutral-200 rounded-md cursor-pointer'}/>
        </div> 
        <div className='flex items-center gap-4'>
          <p className='text-sm'>Sort by:</p>
          <select 
            className='px-2 py-1 text-sm border border-neutral-200 rounded-full outline-none'
            value={sortBy}
            onChange={(e) => {setSortBy(e.target.value)}}
          >
            <option value="newest">Newest</option>
            <option value="low-to-high">Price(Low to High)</option>
            <option value="high-to-low">Price(High to Low)</option>
          </select>
        </div>
      </div>
      <div className='md:grid grid-cols-4 gap-10 mt-6'>
{/* filter for lg-screen */}
        <div className="hidden md:block">
          {filterInfo.map((filterInfo, index) => {
            return(
              <Filter
                key={index}
                filterType={filterInfo.id}
                title={filterInfo.title}
                options={filterInfo.options}
                filter={filter}
                setFilter={setFilter}
              />
            )
          })}
          <button 
              className='w-full text-sm py-4 underline cursor-pointer'
              onClick={() => {
                setFilter({ category: [], carelevel: [], lightrequirement: [], availability: [] })
              }}
              >
                Clear Filters
          </button>
        </div>
{/* filter for sm-screen */}
        {showFilters && (
          <div className='block md:hidden'>
            {filterInfo.map((filterInfo, index) => {
              return(
                <Filter
                  key={index}
                  filterType={filterInfo.id}
                  title={filterInfo.title}
                  options={filterInfo.options}
                  filter={tempFilter}
                  setFilter={setTempFilter}
                />
              )
            })}
              <button
              className='w-full p-2 text-white text-sm bg-black mt-4 rounded-md cursor-pointer'
              onClick={() => {
                  setFilter(tempFilter)
                  setShowFilters(false)
              }}
              >
                Apply All
              </button>
              <button 
              className='w-full text-sm py-4 underline cursor-pointer'
              onClick={() => {
                setFilter({ category: [], carelevel: [], lightrequirement: [], availability: [] })
              }}
              >
                Clear Filters
              </button>
          </div>
        )}
{/* product cards */}
        {isLoading ? (
          <div className='grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 col-span-4 md:col-span-3'>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : plants.length > 0 ? (
          <div className='grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 col-span-4 md:col-span-3'>
            {plants.map((plant, index) => (
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
        ) : (
          <div className='w-full mt-20 flex justify-center text-2xl text-neutral-600 col-span-3'>
            <h2>NO PRODUCT FOUND</h2>
          </div>
        )}

      </div>
    </div>
  )
}

export default ShopPage
