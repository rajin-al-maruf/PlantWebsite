import WishlistProductCard from '../components/WishlistProductCard'
import useWishlistStore from '../store/wishlistStore'
import { Link } from 'react-router-dom'

const WishlistPage = () => {
  const wishlist = useWishlistStore((state) => state.wishlist)

  if (wishlist.length === 0) {
    return (
        <div className='max-w-6xl 2xl:max-w-7xl mx-auto mt-24 md:mt-32 px-4 md:px-6 lg:px-8 xl:px-0 min-h-[50vh] flex flex-col items-center justify-center text-center'>
            <h2 className="text-3xl font-bold text-brand-primary-dark mb-4">Your wishlist is empty</h2>
            <p className="text-neutral-500 mb-8 max-w-md">
                Looks like you haven't saved any plants yet.
            </p>
            <Link to="/shop">
                <button className="px-8 py-3.5 bg-brand-primary hover:bg-brand-primary-dark transition-colors text-white rounded-full font-medium text-sm flex items-center justify-center cursor-pointer">
                    Continue Shopping
                </button>
            </Link>
        </div>
    )
  }

  return (
    <div className='max-w-6xl 2xl:max-w-7xl mx-auto mt-24 md:mt-32 px-4 md:px-6 lg:px-8 xl:px-0 pb-20'>
        <div className="mb-10">
            <h1 className='text-3xl md:text-4xl font-bold text-brand-primary-dark'>My Wishlist</h1>
            <p className="text-neutral-500 mt-2 text-sm">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in your wishlist</p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8'>
            {wishlist.map((plantInfo) => (
                <WishlistProductCard
                    key={plantInfo.id}
                    plant={plantInfo}
                />
            ))}
        </div>
    </div>
  )
}

export default WishlistPage
