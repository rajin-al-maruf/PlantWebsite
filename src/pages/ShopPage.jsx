import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { CiFilter } from 'react-icons/ci'
import Filter from '../components/Filter'
import filterInfo from '../filterInfo'
import { supabase } from '../supabase'


const ShopPage = () => {

  const [plants, setPlants] = useState([])
  const [filter, setFilter] = useState({
    category: [],
    carelevel: [],
    lightrequirement: [],
    availability: [],
  })
  const [tempFilter, setTempFilter] = useState(filter)
  
  // console.log(filter[filterInfo[0].id])

  useEffect(() => {
    const fetchPlants = async () => {
      try {
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

        const {data, error} = await plantData;

        if(error){
          console.error("Supabase error:", error.message);
        }else{
          setPlants(data)
        }

      } catch (error) {
        console.error("Unexpected error:", err);
      }
    }
    fetchPlants()
  },[filter])
  


  const [showFilters, setShowFilters] = useState(true)
  
  return (
    <div className='max-w-7xl mx-auto mt-35 px-4 md:px-6 lg:px-8 xl:px-0'>
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
          <select className='px-2 py-1 text-sm border border-neutral-200 rounded-full outline-none'>
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
        {plants.length > 0 ?
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 col-span-4 md:col-span-3'>
          {plants.map((plant, index) => {
            return(
              <ProductCard
                key={index}
                id={plant.id}
                name={plant.name}
                price={plant.price}
                plantImg={plant.imgurl}
              />
            )
          })}
        </div>:
        <div className='w-full mt-20 flex justify-center text-2xl text-neutral-600 col-span-3'>
          <h2>NO PRODUCT FOUND</h2>
        </div>
        }
      </div>
    </div>
  )
}

export default ShopPage
