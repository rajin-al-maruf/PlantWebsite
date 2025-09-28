import { useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";

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
    
  return (
    <div className='max-w-6xl 2xl:max-w-7xl mx-auto mt-36 px-4 md:px-6 lg:px-8 xl:px-0'>
        <h1 className='text-2xl text-center border-b border-neutral-300 pb-2'>Cart Summary</h1>

        <div className='mt-6 grid grid-cols-1 lg:grid-cols-3'>
            <div className='col-span-2 md:px-10'>
                <h2 className='p-4 border-b border-neutral-300 text-lg font-medium'>Cart Items</h2>
                {cart.map((item, index) => {
                    return(
                        <div key={index} className='flex gap-4 p-4 border-b border-neutral-300'>
                            <Link to={`/product/${item.id}`}>
                                <div className="flex items-center justify-center aspect-square overflow-hidden">
                                    <img 
                                        src={item.imgurl} 
                                        alt={item.name}
                                        className='w-20 sm:w-28 md:w-32 max-w-full max-h-full object-contain bg-neutral-100' 
                                    />
                                </div>
                            </Link>
                            <div className="w-full flex justify-between">
                                <div>
                                    <Link to={`/product/${item.id}`}><p className='font-medium'>{item.name}</p></Link>
                                    <p className='text-xs'>{item.availability}</p>
                                    <p className='text-xs mt-2'>Care Level: {item.carelevel}</p>
                                    <div className="flex items-center gap-2 sm:gap-4 mt-2">
                                        <p className="text-sm">Quantity:</p>
                                        <button
                                        onClick={() => {decreaseQuantity(item.id)}}
                                            className="w-6 h-6 flex items-center justify-center border border-neutral-300 rounded-md text-lg cursor-pointer"
                                        >
                                            –
                                        </button>
                                        <span className="font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => {increaseQuantity(item.id)}}
                                            className="w-6 h-6 flex items-center justify-center border border-neutral-300 rounded-md text-lg cursor-pointer"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between items-end">
                                    <p className="text-sm sm:text-base font-medium">Tk {item.price}</p>
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-xs underline cursor-pointer"
                                    >
                                        remove
                                    </button>
                                </div>
                            </div>

                        </div>
                    )
                })}
                {cart.length>0 &&
                    <div className="mt-4 p-4 flex items-center justify-between">
                        <button 
                            onClick={() => clearCart()}
                            className="text-xs p-2 bg-black text-white rounded-md hover:bg-red-600 duration-300 cursor-pointer">
                            Clear Cart
                        </button>
                        <Link to="/shop">
                            <button className="text-xs p-2 bg-black text-white rounded-md hover:bg-brand-primary duration-300 cursor-pointer">
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                }
            </div>

            <div className="md:px-10 lg:border-l border-l-neutral-300">
                <h2 className='p-4 border-b border-neutral-300 text-lg font-medium'>Estimated Bill</h2>
                <div className='p-4 border-b border-neutral-300'>
                    <div className="flex justify-between text-sm">
                        <p>Number of Items</p>
                        <p>{noOfItems}</p>
                    </div>
                    <div className="flex justify-between text-sm pt-2">
                        <p>Subtotal</p>
                        <p>Tk {subtotal}</p>
                    </div>
                    <div className="flex justify-between text-sm pt-2">
                        <p>Shipping</p>
                        <p>Tk {shipping}</p>
                    </div>
                </div>
                <div className="flex justify-between text-sm font-medium p-4 border-b border-neutral-300">
                    <p>Total</p>
                    <p>Tk {total}</p>
                </div>
                <Link to="/checkout"> 
                    <button className='w-full p-2 text-white text-sm bg-black hover:bg-brand-primary duration-200 mt-4 rounded-md cursor-pointer'>
                        Checkout
                    </button>
                </Link>

                <p className="text-xs pt-4">Standard Shipping : within 3-4 days inside Dhaka, within 4-7 days outside Dhaka</p>
            </div>
        </div>
    </div>
  )
}

export default CartPage