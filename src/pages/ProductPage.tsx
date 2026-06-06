import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IoIosArrowDown } from 'react-icons/io'
import useCartStore from '../store/cartStore'
import useWishlistStore from '../store/wishlistStore'
import { supabase } from '../supabase'
import SkeletonCard from '../components/SkeletonCard'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'
import { PiHeartStraightFill, PiHeartStraightLight } from 'react-icons/pi'
import ProductCard from '../components/ProductCard'
import type { Plant } from "../App";

const ProductPage = () => {

  const [isLoading, setIsLoading] = useState(false)
  //it will get the id from the url ex: /product/1  then id=1
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Plant>();
  const [similarPlants, setSimilarPlants] = useState<Plant[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate()

  //that retrived {id} will be used to fetch the product from the database whenever the id changes
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setIsLoading(true)
      const { data, error } = await supabase .from("plants").select("*").eq("id", id).single();

      if (error) {
        console.error(error);
      } else {
        setProduct(data as Plant);
        setCurrentImageIndex(0);
      }
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
          setSimilarPlants((data as Plant[]) || [])
        }

      } catch (error) {
        console.error("Unexpected error:", error);
      }finally{
        setIsLoading(false)
      }
    }
    fetchAllPlants()
  },[product])

  //get the function from the store
  const addToCart = useCartStore((state) => state.addToCart)
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore()
  
  const isWished = product ? wishlist.some((item) => item.id === product.id) : false;

  const handleWishlistClick = () => {
    if (!product) return;
    if (isWished) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }
  const [qty, setQty] = useState(1);
  const [showDescription, setShowDescription] = useState(true);
  const [showCare, setShowCare] = useState(true);

  if (isLoading) {
    return <SkeletonCard />;
  }
  if (!product) {
    return <p>Product Not Found</p>
  }

  const allImages = [product.imgurl, ...(product.gallery || [])];

  const handlePrev = () => {
    if (!carouselRef.current) return;
    const newIdx = Math.max(0, currentImageIndex - 1);
    carouselRef.current.scrollTo({ left: carouselRef.current.clientWidth * newIdx, behavior: 'smooth' });
  }

  const handleNext = () => {
    if (!carouselRef.current) return;
    const newIdx = Math.min(allImages.length - 1, currentImageIndex + 1);
    carouselRef.current.scrollTo({ left: carouselRef.current.clientWidth * newIdx, behavior: 'smooth' });
  }

  return (
    <div className="max-w-6xl 2xl:max-w-7xl mx-auto mt-24 md:mt-36 px-4 md:px-6 lg:px-8 xl:px-0">
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16'>
        <div className='w-full flex flex-col gap-4 self-start'>
          <div className='relative w-full aspect-square bg-neutral-50 rounded-[2rem] group overflow-hidden'>
            {/* Scrollable Container */}
            <div
               ref={carouselRef}
               onScroll={(e) => {
                  const target = e.target as HTMLDivElement;
                  const index = Math.round(target.scrollLeft / target.clientWidth);
                  setCurrentImageIndex(index);
               }}
               className='w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth flex [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
            >
              {allImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.name} ${idx + 1}`}
                  className="w-full h-full object-cover shrink-0 snap-center"
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            {allImages.length > 1 && (
              <>
                <button onClick={handlePrev} disabled={currentImageIndex === 0} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-brand-primary-dark shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-0 cursor-pointer hover:bg-brand-primary hover:text-white">
                  <MdKeyboardArrowLeft size={24} />
                </button>
                <button onClick={handleNext} disabled={currentImageIndex === allImages.length - 1} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-brand-primary-dark shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-0 cursor-pointer hover:bg-brand-primary hover:text-white">
                  <MdKeyboardArrowRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Dots Indicator */}
          {allImages.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-1 pb-2">
              {allImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                     if (carouselRef.current) {
                        carouselRef.current.scrollTo({ left: carouselRef.current.clientWidth * idx, behavior: 'smooth' });
                     }
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentImageIndex === idx ? 'w-6 bg-brand-primary' : 'w-2 bg-neutral-200 hover:bg-neutral-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest w-max mb-4 ${
            product.availability === 'In Stock' ? 'bg-brand-primary/10 text-brand-primary' : 'bg-red-50 text-red-600'
          }`}>
              {product.availability}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-primary-dark tracking-tight leading-tight">{product.name}</h1>
          <p className="mt-3 text-xl md:text-2xl font-bold text-brand-primary">Tk {product.price}</p>

          <div className="flex items-center gap-4 mt-6">
            <p className='text-xs font-bold uppercase tracking-widest text-neutral-500'>Quantity</p>
            <div className="flex items-center bg-neutral-100 rounded-full p-1 border border-neutral-200">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm text-neutral-600 transition-all duration-300 cursor-pointer"
              >
                –
              </button>
              <span className="w-10 text-center text-base font-bold">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm text-neutral-600 transition-all duration-300 cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          <div className='mt-8 flex flex-col gap-3'>
            <div className='flex gap-3'>
              <button
                onClick={() => addToCart(product, qty)}
                disabled={product.availability === 'Out Of Stock'}
                className="flex-1 py-3 px-5 bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-white transition-all duration-300 rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-primary/10 disabled:hover:text-brand-primary"
              >
                {product.availability === 'Out Of Stock' ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button
                onClick={handleWishlistClick}
                className={`w-12 h-12 flex items-center justify-center border transition-all duration-300 rounded-full shadow-sm cursor-pointer ${isWished ? 'bg-brand-primary border-brand-primary text-white' : 'bg-white border-neutral-200 hover:border-brand-primary text-neutral-400 hover:text-brand-primary'}`}
              >
                {isWished ? <PiHeartStraightFill size={22}/> : <PiHeartStraightLight size={22}/>}
              </button>
            </div>
            <button
              disabled={product.availability === 'Out Of Stock'}
              className="w-full flex items-center justify-center py-3 px-5 bg-brand-primary hover:bg-brand-primary-dark transition-all duration-300 text-white rounded-full font-bold uppercase tracking-widest text-xs shadow-lg shadow-brand-primary/30 hover:-translate-y-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:-translate-y-0 disabled:shadow-none disabled:hover:bg-brand-primary"
              onClick={() => {
                addToCart(product, qty)
                navigate('/checkout')
              }}
            >
              Buy Now
              <MdKeyboardArrowRight size={20} className="ml-1"/>
            </button>
          </div>
          
          <div className='mt-8 space-y-3'>
            <div className='bg-white border border-neutral-100 shadow-sm rounded-xl px-5 py-4'>
              <h3 onClick={()=> setShowDescription(!showDescription)} className='flex items-center justify-between cursor-pointer font-semibold text-base text-brand-primary-dark'>
                Description
                <IoIosArrowDown
                  size={20} 
                  className={`transition-transform duration-300 ease-in-out text-brand-primary ${showDescription ? 'rotate-180' : 'rotate-0'}`}
                />
              </h3>
              {showDescription && 
                <p className='text-neutral-500 leading-relaxed text-sm pt-3'>{product.description}</p>
              }
            </div>
            <div className='bg-white border border-neutral-100 shadow-sm rounded-xl px-5 py-4'>
              <h3 onClick={()=> setShowCare(!showCare)} className='flex items-center justify-between cursor-pointer font-semibold text-base text-brand-primary-dark'>
                Care Guidance 
                <IoIosArrowDown
                  size={20} 
                  className={`transition-transform duration-300 ease-in-out text-brand-primary ${showCare ? 'rotate-180' : 'rotate-0'}`}
                />
              </h3>
              {showCare && 
                <div className="pt-3 space-y-2">
                  <p className='text-neutral-500 text-sm'><span className='text-black font-semibold'>Light Requirement:</span> {product.lightrequirement}</p>
                  <p className='text-neutral-500 text-sm'><span className='text-black font-semibold'>Water Requirement:</span> {product.waterrequirement}</p> 
                </div>
              }
            </div>
          </div>
          
        </div>
      </div>
      
      <div className='mt-32'>
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary font-medium text-xs md:text-sm mb-4">
                <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
                You May Also Like
            </div>
            <h2 className='text-2xl md:text-3xl font-bold text-brand-primary-dark tracking-tight'>
                Similar Category
            </h2>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-4 mt-10 gap-6 lg:gap-8'>
            {similarPlants.map((plant) => (
              <ProductCard
                key={plant.id}
                plant={plant}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default ProductPage
