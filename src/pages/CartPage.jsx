import { useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";

const CartPage = () => {

    const cart = useCartStore((state) => state.cart)
    const [quantity, setQuantity] = useState(1)

    const increase = () => setQuantity(quantity + 1)
    const decrease = () => {
        if (quantity > 1) setQuantity(quantity - 1)
    }
    
  return (
    <div className='max-w-7xl mx-auto mt-36 px-4 md:px-6 lg:px-8 xl:px-0'>
        <h1 className='text-2xl text-center border-b border-neutral-300 pb-2'>Cart Summary</h1>

        <div className='mt-6 grid grid-cols-1 lg:grid-cols-3'>
            <div className='col-span-2 md:px-10'>
                <h2 className='p-4 border-b border-neutral-300 text-lg font-medium'>Cart Items</h2>
                {cart.map((item) => {
                    return(
                        <div className='flex gap-4 p-4 border-t border-neutral-300'>
                            <img 
                                src={item.plantImg} 
                                alt={item.name}
                                className='w-20 sm:w-28 md:w-32 bg-neutral-100' />
                            <div className="w-full flex justify-between">
                                <div>
                                    <p className='font-medium'>{item.name}</p>
                                    <p className='text-xs'>{item.availability}</p>
                                    <p className='text-xs mt-2'>Care Level: {item.carelevel}</p>
                                    <div className="flex items-center gap-2 sm:gap-4 mt-2">
                                        <p className="text-sm">Quantity:</p>
                                        <button
                                            onClick={decrease}
                                            className="w-6 h-6 flex items-center justify-center border border-neutral-300 rounded-md text-lg cursor-pointer"
                                        >
                                            –
                                        </button>
                                        <span className="font-medium">{quantity}</span>
                                        <button
                                            onClick={increase}
                                            className="w-6 h-6 flex items-center justify-center border border-neutral-300 rounded-md text-lg cursor-pointer"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between items-end">
                                    <p className="text-sm sm:text-base font-medium">Tk {item.price}</p>
                                    <p className="text-xs underline cursor-pointer">remove</p>
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>

            <div className="md:px-10 lg:border-l border-l-neutral-300">
                <h2 className='p-4 border-b border-neutral-300 text-lg font-medium'>Estimated Bill</h2>
                <div className='p-4 border-b border-neutral-300'>
                    <div className="flex justify-between text-sm">
                        <p>Number of Items</p>
                        <p>2</p>
                    </div>
                    <div className="flex justify-between text-sm pt-2">
                        <p>Subtotal</p>
                        <p>Tk 750</p>
                    </div>
                    <div className="flex justify-between text-sm pt-2">
                        <p>Shipping</p>
                        <p>Tk 100</p>
                    </div>
                    <div className="flex justify-between text-sm pt-2">
                        <p>VAT</p>
                        <p>Tk 33.84</p>
                    </div>
                </div>
                <div className="flex justify-between text-sm font-medium p-4 border-b border-neutral-300">
                    <p>Total</p>
                    <p>Tk 883.84</p>
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