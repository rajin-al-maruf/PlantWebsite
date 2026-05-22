import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PiHeartStraightFill, PiHeartStraightLight } from 'react-icons/pi'
import useCartStore from '../store/cartStore'
import useWishlistStore from '../store/wishlistStore'
import type { Plant } from "../App";

interface ProductCardProps {
  plant: Plant;
}

const ProductCard = ({ plant }: ProductCardProps) => {

const [isWished, setIsWished] = useState(false)
const addToCart = useCartStore((state) => state.addToCart)
const addToWishlist = useWishlistStore((state) => state.addToWishlist)
const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist)

// const wished = () => {
//     if(wishlist.find((item) => item.id === plant.id)){
//         return true
//     }else{
//         return false
//     }
// }

return (
    // when we click in the card it will go to the product page ex: /product/1
    <Link to={`/product/${plant.id}`}>
        <div className='w-full bg-neutral-100 border border-neutral-200 rounded-md cursor-pointer hover:shadow-xl hover:scale-101 duration-300'>
            <div className='p-2 md:p-4'>
                <div className='w-full aspect-square overflow-hidden flex items-center justify-center bg-neutral-100 relative'>
                    <div className='w-full absolute top-0 flex items-center justify-between'>
                        <p className='left-0 text-xs bg-brand-primary text-neutral-100 px-2 rounded-md'>sale</p>
                        {isWished? 
                            <PiHeartStraightFill 
                                size={20} 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setIsWished(false)
                                    removeFromWishlist(plant.id)
                                }}
                                className='right-0 text-brand-primary hover:scale-110 duration-300'
                            /> : 
                            <PiHeartStraightLight 
                                size={20} 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setIsWished(true)
                                    addToWishlist(plant)
                                }}
                                className='right-0 text-brand-primary hover:scale-110 duration-300'
                        /> }
                    </div>
                    <img 
                        src={plant.imgurl} 
                        alt={plant.name} 
                        className='max-w-full max-h-full object-contain'
                    />
                </div>
                <div className='p-2 border-t border-neutral-300 text-center'>
                    <h3 className='font-semibold text-xs md:text-sm'>{plant.name}</h3>
                    <h4 className='pt-1 text-xs md:text-sm'>Tk {plant.price}</h4>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            addToCart(plant)
                        }}
                        className='w-full p-2 mt-2 bg-brand-primary hover:bg-brand-primary-dark active:scale-95 duration-300 text-xs md:text-sm text-neutral-100 rounded-md cursor-pointer'
                    >
                        ADD TO CART
                    </button>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default ProductCard