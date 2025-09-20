import { create } from "zustand";

const useCartStore = create((set) => ({
    cart: [],
    addToCart: (product) =>
        set((state) => {
            if (state.cart.find((item) => item.id === product.id)) return state;
            return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),
    removeFromCart: (id) => 
        set((state) => {state.cart.filter((item) => item.id !== id)}),
    clearCart: () => set({ cart: [] }),
}))

export default useCartStore