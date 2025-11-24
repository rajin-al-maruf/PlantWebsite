import React from 'react'
import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";
import { GoCheckCircleFill } from 'react-icons/go'

const OrderSuccessPage = () => {
    const cart = useCartStore((state) => state.cart)

    const noOfItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 80 : 0;
    const total = subtotal + shipping;
  return (
    <div className='max-w-3xl 2xl:max-w-4xl mx-auto mt-36 px-4 md:px-6 lg:px-8 xl:px-0 flex justify-center items-center min-h-[60vh]'>
        <div className='flex flex-col items-center justify-center p-6'>
            <GoCheckCircleFill size={50} className='mb-4 text-brand-primary'/>
            <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-6">
            Thank you for your order. We will deliver your plants within 2–4 days.
            </p>

{/* Order Summary section is commented out for future use */}
            {/* <div className='w-full bg-brand-primary-light/20 rounded-md p-4'>
                <h2 className='p-4 border-b border-neutral-300 text-lg font-medium'>Order Summery</h2>
                {cart.map((items, index) => {
                    return(
                        <div key={index} className=''>
                            <div className='flex gap-4 px-2 py-4 border-t border-t-neutral-300'>
                               <div>
                                    <img 
                                        src={items.imgurl} 
                                        alt={items.name}
                                        className='w-20 sm:w-28 md:w-32 bg-neutral-100'
                                    />
                                </div>
                                <div className="w-full flex justify-between">
                                    <div>
                                        <p className='font-medium'>{items.name}</p>
                                        <p className='text-xs mt-1 text-neutral-600'>Care Level: {items.careLevel}</p>
                                        <p className="text-xs mt-1 text-neutral-600">Quantity: {items.quantity}</p>
                                    </div>
                                    <div className="flex flex-col justify-between items-end">
                                        <p className="text-sm sm:text-base font-medium">Tk {items.price * items.quantity}</p>
                                    </div>
                                </div> 
                            </div>
                            <div>
                              <div className='p-4 border-y border-neutral-300'>
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
                            </div>
                        </div>
                    )
                })}
            </div> */}
            <Link to="/shop">
                <button className="p-2 mt-2 border border-brand-primary text-brand-primary rounded-md hover:bg-brand-primary hover:text-white duration-300 cursor-pointer">
                    Continue Shopping
                </button>
            </Link>
        </div>
    </div>
  )
}

export default OrderSuccessPage