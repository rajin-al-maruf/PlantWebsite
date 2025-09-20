import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { IoIosArrowDown } from 'react-icons/io'
import useCartStore from '../store/cartStore'
import useWishlistStore from '../store/wishlistStore'

const ProductPage = ({plants, setPlants}) => {

  const { id } = useParams()
  const product = plants.find((p) => p.id.toString() === id)
  const addToCart = useCartStore((state) => state.addToCart)
  const addToWishlist = useWishlistStore((state) => state.addToWishlist)
  

  const [quantity, setQuantity] = useState(1)

  const increase = () => setQuantity(quantity + 1)
  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const [showDescription, setShowDescription] = useState(false);
  const [showCare, setShowCare] = useState(false);


  if (!product) {
    return <p>Product Not Found</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto gap-10 mt-36 px-4 md:px-6 lg:px-8 xl:px-0">
      <div>
        <img
          src={product.imgurl}
          alt={product.name}
          className="w-full bg-neutral-100 rounded-lg"
        />
      </div>

      <div>
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="mt-2 text-xl">Tk {product.price}</p>

        <div className="flex items-center gap-4 mt-6">
          <p className='font-semibold'>Quantity</p>
          <button
            onClick={decrease}
            className="w-8 h-8 flex items-center justify-center border border-neutral-300 rounded-md text-lg cursor-pointer"
          >
            –
          </button>
          <span className="text-lg font-medium">{quantity}</span>
          <button
            onClick={increase}
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
                <p className='text-neutral-600 text-sm pt-4'><span className='text-black'>Light Requirement:</span> {product.lightRequirement}</p>
                <p className='text-neutral-600 text-sm pt-4'><span className='text-black'>Water Requirement:</span> {product.waterRequirement}</p> 
              </div>          
            }
          </div>
        </div>
        <button
          className="w-full p-2 mt-6 bg-brand-primary hover:bg-brand-primary-dark duration-300 text-xs md:text-sm text-neutral-100 rounded-md cursor-pointer active:scale-95"
          onClick={(e) => {
            addToCart({id: product.id, name: product.name, price: product.price, plantImg: product.imgurl, availability: product.availability, carelevel: product.carelevel})
          }}
        >
          ADD TO CART
        </button>
        <button
        onClick={(e) => {
          addToWishlist({id: product.id, name: product.name, price: product.price, plantImg: product.imgurl})
        }}
          className="w-full p-2 mt-2 text-brand-primary hover:text-neutral-100 border-2 border-brand-primary hover:bg-brand-primary duration-300 text-xs md:text-sm rounded-md cursor-pointer active:scale-95"
        >
          ADD TO WISHLIST
        </button>
      </div>
    </div>
  )
}

export default ProductPage
