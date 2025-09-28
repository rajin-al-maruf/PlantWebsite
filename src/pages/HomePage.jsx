import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import Category from '../components/Category'
import Hero from '../components/Hero'
import Spinner from '../components/Spinner'
import PopularProducts from '../components/PopularProducts'

const HomePage = ({plants, setPlants}) => {

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
        <PopularProducts 
          plants={plants}
        />
    </div>
  )
}

export default HomePage