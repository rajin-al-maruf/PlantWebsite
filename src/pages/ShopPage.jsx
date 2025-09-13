import React, { useState } from 'react'
import ProductCard from '../components/ProductCard'
import plantInfo from '../plantInfo'
import { CiFilter } from 'react-icons/ci'
import Filter from '../components/Filter'
import filterInfo from '../filterInfo'

const ShopPage = () => {

  const [showFilters, setShowFilters] = useState(false)
  
  return (
    <div className='max-w-7xl mx-auto mt-35 px-4 md:px-6 lg:px-8 xl:px-0'>
      <div className='w-full flex items-center justify-between'>
        <div className='flex gap-2 items-center'>
          <p>Filter:</p>
          <CiFilter onClick={() => setShowFilters(!showFilters)} size={30} className={showFilters? 'p-1 border border-neutral-200 rounded-md cursor-pointer': 'p-1 bg-neutral-200 border border-neutral-200 rounded-md cursor-pointer'}/>
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
        <div className={showFilters ? 'hidden' : ''}>
          {filterInfo.map((filterInfo, index) => {
            return(
              <Filter
                key={index}
                id={filterInfo.id}
                title={filterInfo.title}
                options={filterInfo.options}
              />
            )
          })}
            <button className='w-full p-2 text-white text-sm bg-black mt-4 rounded-md cursor-pointer'>
              Apply All
            </button>
            <button className='w-full text-sm py-4 underline cursor-pointer'>
              Clear Filters
            </button>
        </div>
        <div className={showFilters ? 
            'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8 col-span-4' : 
            'grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 col-span-4 md:col-span-3'}>
          {plantInfo.map((plantInfo, index) => {
            return(
              <ProductCard
                key={index}
                id={plantInfo.id}
                name={plantInfo.name}
                price={plantInfo.price}
                plantImg={plantInfo.imgURL}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ShopPage
