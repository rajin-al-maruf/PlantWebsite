import { Link } from "react-router-dom";
import useWishlistStore from "../../store/wishlistStore";
import WishlistProductCard from "../../components/WishlistProductCard";

const ProfileWishlist = () => {
  const wishlist = useWishlistStore((state) => state.wishlist);

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl md:text-2xl font-bold text-brand-primary-dark tracking-tight mb-6">My Wishlist</h2>
      
      {wishlist.length === 0 ? (
        <div className="text-center py-12 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col items-center">
          <p className="text-neutral-500 text-sm mb-4">You haven't saved any plants yet.</p>
          <Link to="/shop">
            <button className="px-6 py-3 bg-brand-primary hover:bg-brand-primary-dark transition-all duration-300 text-white rounded-full font-bold uppercase tracking-widest text-[10px] shadow-sm hover:-translate-y-0.5 cursor-pointer">
              Explore Plants
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlist.map((plantInfo) => (
            <WishlistProductCard
              key={plantInfo.id}
              plant={plantInfo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileWishlist;