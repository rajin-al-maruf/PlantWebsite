import React from 'react'
import Category from '../components/Category'
import FeaturedProducts from '../components/FeaturedProducts'
import Hero from '../components/Hero'

const HomePage = () => {
  return (
    <div>
        <Hero />
        <Category />
        <FeaturedProducts />
    </div>
  )
}

export default HomePage