import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import Category from '../components/Category'
import Hero from '../components/Hero'
import Spinner from '../components/Spinner'
import PopularProducts from '../components/PopularProducts'
import FeaturedProduct from '../components/FeaturedProduct'
import type { Plant } from '../App'
import type { Dispatch, SetStateAction } from 'react'

interface HomePageProps {
  plants: Plant[]
  setPlants: Dispatch<SetStateAction<Plant[]>>
}

const HomePage = ({plants, setPlants}: HomePageProps) => {

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
      const fetchProduct = async () => {
        setIsLoading(true)
        const { data, error } = await supabase .from("plants").select("*");
  
        if (error) console.error(error);
        else setPlants(data);
        setIsLoading(false)
      };
  
      fetchProduct();
    }, []);

    if (isLoading) {
      return <Spinner />
    }

  return (
    <div>
        <Hero />
        <Category 
          plants={plants}
        />
        <FeaturedProduct />
        <PopularProducts 
          plants={plants}
        />
    </div>
  )
}

export default HomePage