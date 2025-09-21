import { create } from "zustand";

const useCartStore = create((set) => ({
    cart: [],

    addToCart: (product, quantity = 1) =>
    set((state) => {
      const isExistInCart = state.cart.find((item) => item.id === product.id);
      //if the product already exists in the cart, increase/update the quantity
      if (isExistInCart) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      //if the product does not exist in the cart, add it with the specified quantity
      return { cart: [...state.cart, { ...product, quantity }] };
    }),

    removeFromCart: (id) =>
        set((state) => ({
            cart: state.cart.filter((item) => item.id !== id)
        })),

    clearCart: () => set({ cart: [] }),

    increaseQuantity: (id) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),

    decreaseQuantity: (id) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    })),
}));

export default useCartStore