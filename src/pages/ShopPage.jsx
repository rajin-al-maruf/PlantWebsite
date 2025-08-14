import React from 'react'
import ProductCard from '../components/ProductCard'
import plantInfo from '../plantInfo'

const ShopPage = () => {
  return (
    <div className='max-w-7xl mx-auto mt-35'>
      <div className='w-full flex items-center justify-between'>
        <p>Filters:</p>
        <p>Sort by</p>
      </div>
      <p className='text-xs py-4'>ALL RESULTS</p>
      <div className='grid grid-cols-4 gap-10'>
        {plantInfo.map((plantInfo) => {
          return(
            <ProductCard 
              name={plantInfo.name}
              price={plantInfo.price}
              plantImg={plantInfo.imgURL}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ShopPage