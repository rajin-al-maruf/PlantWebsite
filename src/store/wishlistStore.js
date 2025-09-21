import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWishlistStore = create(
  persist(
  (set) => ({
  wishlist: [],
  addToWishlist: (product) =>
    set((state) => {
      if (state.wishlist.find((item) => item.id === product.id)) return state;
      return { wishlist: [...state.wishlist, product] };
    }),
  removeFromWishlist: (id) =>
    set((state) => ({wishlist: state.wishlist.filter((item) => item.id !== id)})),
})
  , {
    name: "wishlist-storage",
  }
  )
);

export default useWishlistStore;