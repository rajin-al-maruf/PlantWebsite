import React, { useState } from 'react'
import ProductCard from '../components/ProductCard'
import plantInfo from '../plantInfo'
import { CiFilter } from 'react-icons/ci'
import Filter from '../components/Filter'
import filterInfo from '../filterInfo'

const ShopPage = () => {

  const [showFilters, setShowFilters] = useState(false)
  
  return (
    <div className='max-w-7xl mx-auto mt-35'>
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
      <p className='text-xs py-4'>ALL RESULTS</p>
      <div className='grid grid-cols-4 gap-10'>
        <div className={showFilters? 'hidden' : 'col-span-1'}>
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
            <button className='w-full text-sm mt-4 underline cursor-pointer'>Clear Filters</button>
        </div>
        <div className={showFilters? 'grid grid-cols-4 gap-10 col-span-4' : 'grid grid-cols-3 gap-10 col-span-3'}>
          {plantInfo.map((plantInfo, index) => {
            return(
              <ProductCard
                key={index}
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