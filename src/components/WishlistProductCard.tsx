import { FaCartPlus } from "react-icons/fa"
import { IoCloseSharp } from "react-icons/io5"
import { Link } from "react-router-dom"
import useCartStore from "../store/cartStore"
import useWishlistStore from "../store/wishlistStore"
import type { Plant } from "../App"

interface WishlistProductCardProps {
    plant: Plant;
}

const WishlistProductCard = ({plant} : WishlistProductCardProps) => {
    const addToCart = useCartStore((state) => state.addToCart)
    const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist)
  return (
    <Link to={`/product/${plant.id}`}>
        <div className='relative w-full flex flex-col bg-white border border-neutral-200 transition-all duration-300 hover:shadow-md rounded-2xl overflow-hidden cursor-pointer'>
            <div className='relative w-full aspect-square overflow-hidden bg-neutral-100 group'>
                <img 
                    src={plant.imgurl} 
                    alt={plant.name} 
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                />

                <div className="absolute inset-0 flex items-center justify-center bg-brand-primary/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-3">
                    <div 
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            addToCart(plant)
                        }}
                        className="flex items-center justify-center h-10 w-10 text-brand-primary-dark hover:text-white bg-white hover:bg-brand-primary rounded-full active:scale-95 duration-300 shadow-sm cursor-pointer">
                        <FaCartPlus size={16}/>
                    </div>
                    <div 
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            removeFromWishlist(plant.id);
                        }}
                        className="flex items-center justify-center h-10 w-10 text-red-500 bg-white hover:bg-red-500 hover:text-white rounded-full active:scale-95 duration-300 shadow-sm cursor-pointer">
                        <IoCloseSharp size={20}/>
                    </div>
                </div>
            </div>
            <div className='flex flex-col flex-1 p-4 text-center border-t border-neutral-100'>
                <h3 className='w-full truncate text-sm font-bold text-brand-primary-dark'>{plant.name}</h3>
                <p className='mt-1 text-xs font-semibold text-brand-primary'>Tk {plant.price}</p>
            </div>
        </div>
    </Link>
  )
}

export default WishlistProductCard