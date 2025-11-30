import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

const useWishlistStore = create(
  persist(
  (set) => ({
  wishlist: [],
  addToWishlist: (product) =>
    set((state) => {
      if (state.wishlist.find((item) => item.id === product.id)) {
        toast.info(`${product.name} is already in wishlist`);
        return state;
      }
      toast.success(`${product.name} added to wishlist`);
      return { wishlist: [...state.wishlist, product] };
    }),
  removeFromWishlist: (id) =>
    set((state) => ({
      wishlist: state.wishlist.filter((item) => {
        if (item.id === id) toast.success(`${item.name} removed from wishlist`);
        return item.id !== id;
      })
    })),
})
  , {
    name: "wishlist-storage",
  }
  )
);

export default useWishlistStore;