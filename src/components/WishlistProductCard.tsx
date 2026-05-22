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
        <div className='w-full h-full bg-neutral-100 border border-neutral-200 rounded-md cursor-pointer hover:shadow-sm'>
            <div className='p-2'>
                <div className='w-full h-full aspect-square overflow-hidden flex items-center justify-center bg-neutral-100 relative group'>
                    <img 
                        src={plant.imgurl} 
                        alt={plant.name} 
                        className='max-w-full max-h-full object-contain'
                    />

                    <div className="w-full h-full flex items-center justify-center bg-brand-primary/50 absolute top-0 left-0 rounded-md gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div 
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                addToCart(plant)
                            }}
                            className="flex items-center justify-center h-8 w-8 text-brand-primary-dark hover:text-brand-accent bg-brand-accent hover:bg-brand-primary-dark rounded-md active:scale-95 duration-300">
                            <FaCartPlus size={15}/>
                        </div>
                        <div 
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                removeFromWishlist(plant.id);
                            }}
                            className="flex items-center justify-center h-8 w-8 text-brand-primary-dark bg-brand-accent hover:bg-red-600 hover:text-brand-accent rounded-md active:scale-95 duration-300">
                            <IoCloseSharp size={15}/>
                        </div>
                    </div>
                </div>
                <div className='p-2 border-t border-neutral-300 text-center'>
                    <h3 className='font-semibold text-xs md:text-sm'>{plant.name}</h3>
                    <h4 className='pt-1 text-xs md:text-sm'>Tk {plant.price}</h4>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default WishlistProductCard