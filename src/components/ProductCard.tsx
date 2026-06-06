import { Link } from 'react-router-dom'
import { PiHeartStraightFill, PiHeartStraightLight } from 'react-icons/pi'
import useCartStore from '../store/cartStore'
import useWishlistStore from '../store/wishlistStore'
import type { Plant } from "../App";

interface ProductCardProps {
  plant: Plant;
}

const ProductCard = ({ plant }: ProductCardProps) => {

const addToCart = useCartStore((state) => state.addToCart)
const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore()

const isWished = wishlist.some((item) => item.id === plant.id);

const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isWished) {
      removeFromWishlist(plant.id);
    } else {
      addToWishlist(plant);
    }
}

return (
    // when we click in the card it will go to the product page ex: /product/1
    <Link to={`/product/${plant.id}`} className="block group">
        <div className='relative w-full flex flex-col bg-white border border-neutral-200 transition-all duration-300 hover:shadow-xl rounded-lg overflow-hidden'>
            <div className='relative w-full aspect-square overflow-hidden bg-neutral-100'>
                {/* Top Badges & Actions */}
                <div className='absolute top-3 left-3 right-3 z-10 flex items-start justify-between'>
                    <span className='bg-brand-primary text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest'>
                        Sale
                    </span>
                    <button onClick={handleWishlistClick} className={`flex h-9 w-9 items-center justify-center rounded-full bg-black/20 backdrop-blur-sm text-white transition-all duration-300 hover:bg-brand-primary ${isWished ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                        {isWished ? <PiHeartStraightFill size={20} /> : <PiHeartStraightLight size={20} />}
                    </button>
                </div>
                
                {/* Image */}
                <img 
                    src={plant.imgurl} 
                    alt={plant.name} 
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                />
            </div>
            
            {/* Content Details */}
            <div className='flex flex-col flex-1 p-4 md:p-5 text-center'>
                <h3 className='w-full truncate text-sm font-bold text-black'>
                    {plant.name}
                </h3>
                <p className='mt-1 mb-4 text-sm text-neutral-500'>Tk {plant.price}</p>
                
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        addToCart(plant)
                    }}
                    disabled={plant.availability === 'Out Of Stock'}
                    className='mt-auto w-full py-2.5 bg-transparent border border-neutral-300 text-black hover:border-brand-primary hover:bg-brand-primary hover:text-white active:scale-95 transition-all duration-300 text-xs font-bold uppercase tracking-widest cursor-pointer rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-neutral-300 disabled:hover:bg-transparent disabled:hover:text-black disabled:active:scale-100'
                >
                    {plant.availability === 'Out Of Stock' ? 'OUT OF STOCK' : 'ADD TO CART'}
                </button>
            </div>
        </div>
    </Link>
  )
}

export default ProductCard