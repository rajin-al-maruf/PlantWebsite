import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";
import { GoArrowRight } from "react-icons/go";

const CartPage = () => {

    const cart = useCartStore((state) => state.cart)
    const removeFromCart = useCartStore((state) => state.removeFromCart)
    const clearCart = useCartStore((state) => state.clearCart)
    const increaseQuantity = useCartStore((state) => state.increaseQuantity)
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)

    const noOfItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 80 : 0;
    const total = subtotal + shipping;

    if (cart.length === 0) {
        return (
            <div className='max-w-6xl 2xl:max-w-7xl mx-auto mt-24 md:mt-32 px-4 md:px-6 lg:px-8 xl:px-0 min-h-[50vh] flex flex-col items-center justify-center text-center'>
                <h2 className="text-3xl font-bold text-brand-primary-dark mb-4">Your cart is empty</h2>
                <p className="text-neutral-500 mb-8 max-w-md">
                    Looks like you haven't added any plants to your cart yet.
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
            <h1 className='text-3xl md:text-4xl font-bold text-brand-primary-dark'>Shopping Cart</h1>
            <p className="text-neutral-500 mt-2 text-sm">{noOfItems} {noOfItems === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
            {/* Left: Cart Items List */}
            <div className='lg:col-span-8 flex flex-col'>
                <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-neutral-200 text-xs font-bold text-neutral-400 uppercase tracking-widest">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-3 text-center">Quantity</div>
                    <div className="col-span-3 text-right">Total</div>
                </div>

                {cart.map((item, index) => (
                    <div key={index} className='py-6 border-b border-neutral-200 flex flex-col sm:grid sm:grid-cols-12 gap-4 sm:items-center'>
                        {/* Product Info */}
                        <div className="col-span-6 flex gap-4">
                            <Link to={`/product/${item.id}`} className="shrink-0">
                                <div className="w-24 h-24 bg-neutral-100 rounded-xl overflow-hidden flex items-center justify-center">
                                    <img src={item.imgurl} alt={item.name} className='w-full h-full object-cover'/>
                                </div>
                            </Link>
                            <div className="flex flex-col justify-center">
                                <Link to={`/product/${item.id}`}>
                                    <h3 className='font-bold text-base text-brand-primary-dark hover:text-brand-primary transition-colors'>{item.name}</h3>
                                </Link>
                                <p className='text-xs text-neutral-500 mt-1 uppercase tracking-wider font-medium'>Care: {item.carelevel}</p>
                                <p className="text-sm font-semibold text-brand-primary mt-2 sm:hidden">Tk {item.price}</p>
                                <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-xs text-neutral-400 hover:text-red-500 transition-colors underline mt-3 w-max cursor-pointer"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                        
                        {/* Quantity */}
                        <div className="col-span-3 flex justify-start sm:justify-center items-center mt-2 sm:mt-0">
                            <div className="flex items-center border border-neutral-200 rounded-full h-9">
                                <button
                                    onClick={() => decreaseQuantity(item.id)}
                                    className="w-9 h-full flex items-center justify-center text-neutral-500 hover:text-black transition-colors cursor-pointer"
                                >–</button>
                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                <button
                                    onClick={() => increaseQuantity(item.id)}
                                    className="w-9 h-full flex items-center justify-center text-neutral-500 hover:text-black transition-colors cursor-pointer"
                                >+</button>
                            </div>
                        </div>

                        {/* Total Price */}
                        <div className="col-span-3 hidden sm:flex justify-end items-center">
                            <p className="text-base font-bold text-brand-primary-dark">Tk {item.price * item.quantity}</p>
                        </div>
                    </div>
                ))}

                <div className="mt-8 flex justify-between items-center">
                    <Link to="/shop" className="text-sm font-medium text-neutral-500 hover:text-black transition-colors flex items-center gap-2">
                        ← Continue Shopping
                    </Link>
                    <button 
                        onClick={() => clearCart()}
                        className="text-sm font-medium text-neutral-400 hover:text-red-500 transition-colors underline cursor-pointer"
                    >
                        Clear Cart
                    </button>
                </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-4">
                <div className="bg-neutral-50 rounded-2xl p-6 sm:p-8 border border-neutral-100">
                    <h2 className="text-lg font-bold text-brand-primary-dark border-b border-neutral-200 pb-4 mb-6">Order Summary</h2>
                    
                    <div className="space-y-4 text-sm text-neutral-600 mb-6">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-medium text-black">Tk {subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className="font-medium text-black">Tk {shipping}</span>
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-center border-t border-neutral-200 pt-6 mb-8">
                        <span className="font-bold text-base text-brand-primary-dark">Total</span>
                        <span className="font-bold text-xl text-brand-primary">Tk {total}</span>
                    </div>
                    
                    <Link to="/checkout" className="block w-full">
                        <button className="w-full py-4 bg-brand-primary hover:bg-brand-primary-dark transition-colors text-white rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 cursor-pointer">
                            Checkout <GoArrowRight size={18} />
                        </button>
                    </Link>
                    <p className="text-xs text-neutral-400 mt-6 text-center leading-relaxed">
                        Standard Shipping: 3-4 days inside Dhaka, 4-7 days outside Dhaka.
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartPage