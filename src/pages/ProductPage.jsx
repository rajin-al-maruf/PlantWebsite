import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IoIosArrowDown } from 'react-icons/io'
import useCartStore from '../store/cartStore'
import useWishlistStore from '../store/wishlistStore'
import { supabase } from '../supabase'
import { useEffect } from 'react'
import SkeletonCard from '../components/SkeletonCard'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { CiHeart } from 'react-icons/ci'
import ProductCard from '../components/ProductCard'

const ProductPage = ({plants, setPlants}) => {

  const [isLoading, setIsLoading] = useState(false)
  //it will get the id from the url ex: /product/1  then id=1
  const { id } = useParams()
  const [product, setProduct] = useState();

  const navigate = useNavigate()

  //that retrived {id} will be used to fetch the product from the database whenever the id changes
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      const { data, error } = await supabase .from("plants").select("*").eq("id", id).single();

      if (error) console.error(error);
      else setProduct(data);
      setIsLoading(false)
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchAllPlants = async () => {
      if (!product) return;
      try {
        setIsLoading(true)

        const {data, error} = await supabase
          .from('plants')
          .select('*')
          .eq('category', product.category)
          .neq('id', product.id)
          .limit(8);

        if(error){
          console.error("Supabase error:", error.message);
        }else{
          setPlants(data)
        }

      } catch (error) {
        console.error("Unexpected error:", error);
      }finally{
        setIsLoading(false)
      }
    }
    fetchAllPlants()
  },[product])
console.log(plants)

  //get the function from the store
  const addToCart = useCartStore((state) => state.addToCart)
  const addToWishlist = useWishlistStore((state) => state.addToWishlist)
  const [qty, setQty] = useState(1);
  const [showDescription, setShowDescription] = useState(true);
  const [showCare, setShowCare] = useState(true);

  if (isLoading) {
    return <SkeletonCard />;
  }
  if (!product) {
    return <p>Product Not Found</p>
  }

  return (
    <div className="max-w-6xl 2xl:max-w-7xl mx-auto mt-36 px-4 md:px-6 lg:px-8 xl:px-0">
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div className='w-full h-full aspect-square overflow-hidden flex items-center justify-center bg-neutral-100'>
          <img
            src={product.imgurl}
            alt={product.name}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>

        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="mt-2 text-xl">Tk {product.price}</p>

          <div className="flex items-center gap-4 mt-6">
            <p className='font-semibold'>Quantity</p>
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-8 h-8 flex items-center justify-center border border-neutral-300 rounded-md text-lg cursor-pointer"
            >
              –
            </button>
            <span className="text-lg font-medium">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-8 h-8 flex items-center justify-center border border-neutral-300 rounded-md text-lg cursor-pointer"
            >
              +
            </button>
          </div>

          <div className='mt-6'>
            <div className='py-4 border-y border-y-neutral-200'>
              <h3 onClick={()=> setShowDescription(!showDescription)} className='flex items-center justify-between cursor-pointer'>
                Description
                <IoIosArrowDown
                  size={20} 
                  className={showDescription? 
                    'transform rotate-180 duration-300 ease-in-out' : 
                    ' rotate-0 duration-300 ease-in-out'}
                />
              </h3>
              {showDescription && 
                <p className='text-neutral-600 text-sm pt-4'>{product.description}</p>
              }
            </div>
            <div className='py-4 border-y border-y-neutral-200'>
              <h3 onClick={()=> setShowCare(!showCare)} className='flex items-center justify-between cursor-pointer'>
                Care Guidance 
                <IoIosArrowDown
                  size={20} 
                  className={showCare? 
                    'transform rotate-180 duration-300 ease-in-out' : 
                    ' rotate-0 duration-300 ease-in-out'}
                />
              </h3>
              {showCare && 
                <div>
                  <p className='text-neutral-600 text-sm pt-4'><span className='text-black'>Light Requirement:</span> {product.lightrequirement}</p>
                  <p className='text-neutral-600 text-sm pt-4'><span className='text-black'>Water Requirement:</span> {product.waterrequirement}</p> 
                </div>          
              }
            </div>
          </div>
          <div className='mt-4'>
            <div className='grid grid-cols-10 gap-4'>
              <button
                onClick={(e) => {
                  addToCart({id: product.id, name: product.name, price: product.price, imgurl: product.imgurl, availability: product.availability, carelevel: product.carelevel}, qty)
                }}
                className="w-full col-span-9 p-2 text-brand-primary hover:text-neutral-100 border-2 border-brand-primary hover:bg-brand-primary duration-300 text-xs md:text-sm rounded-md cursor-pointer active:scale-95"
              >
                ADD TO CART
              </button>
              <button
                onClick={(e) => {
                  addToWishlist({id: product.id, name: product.name, price: product.price, imgurl: product.imgurl})
                }}
                className="w-full col-span-1 flex items-center justify-center p-2 text-brand-primary hover:text-neutral-100 border-2 border-brand-primary hover:bg-brand-primary duration-300 text-xs md:text-sm rounded-md cursor-pointer active:scale-95"
              >
                <CiHeart size={20}/>
              </button>
            </div>
            <button
              className="w-full flex items-center justify-center p-2 mt-2 bg-brand-primary hover:bg-brand-primary-dark duration-300 text-xs md:text-sm text-neutral-100 rounded-md cursor-pointer active:scale-95"
              onClick={(e) => {
                addToCart({id: product.id, name: product.name, price: product.price, imgurl: product.imgurl, availability: product.availability, carelevel: product.carelevel}, qty)
                navigate('/checkout')
              }}
            >
              BUY NOW
              <MdKeyboardArrowRight size={20}/>
            </button>
          </div>
          
        </div>
      </div>
      
      <div className='mt-20'>
        <h1 className='text-2xl font-medium text-center border-b border-neutral-300 pb-2'>
          Similar Category
        </h1>
        <div className='grid grid-cols-2 lg:grid-cols-4 mt-10 gap-6 lg:gap-8 col-span-4 md:col-span-3'>
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
      </div>
    </div>
  )
}

export default ProductPage
