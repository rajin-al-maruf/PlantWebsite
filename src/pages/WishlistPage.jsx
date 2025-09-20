import WishlistProductCard from '../components/WishlistProductCard'
import useWishlistStore from '../store/wishlistStore'


const WishlistPage = () => {
  const wishlist = useWishlistStore((state) => state.wishlist)
  return (
    <div className='max-w-7xl mx-auto mt-36 px-4 md:px-6 lg:px-8 xl:px-0'>
        <h1 className='text-2xl text-center border-b border-neutral-300 pb-2'>My Wishlist</h1>
        <h2 className='md:text-lg uppercase font-medium mt-4'>Your Saved Items</h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 mt-4'>
            {wishlist.map((plantInfo, index) => {
                return(
                <WishlistProductCard
                    key={index}
                    id={plantInfo.id}
                    name={plantInfo.name}
                    price={plantInfo.price}
                    plantImg={plantInfo.plantImg}
                />
                )
            })}
        </div>
    </div>
  )
}

export default WishlistPage