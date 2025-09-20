import { create } from "zustand";

const useWishlistStore = create((set) => ({
  wishlist: [],
  addToWishlist: (product) =>
    set((state) => {
      if (state.wishlist.find((item) => item.id === product.id)) return state;
      return { wishlist: [...state.wishlist, product] };
    }),
  removeFromWishlist: (id) =>
    set((state) => ({wishlist: state.wishlist.filter((item) => item.id !== id)})),
}));

export default useWishlistStore;