import { Link } from "react-router-dom";
import plantInfo from "../plantInfo";

const CheckoutPage = () => {

    const cartItem = [
    {
        id: "1",
        name: "Aloe Vera",    
        price: 250,
        imgURL: "../src/assets/plants/aloevera.png",
        quantity: 2,
        careLevel: 'Easy',
        availability: 'In Stock',
    },
    {
        id: "3",
        name: "Areca Palm",
        price: 500,
        imgURL: "../src/assets/plants/arecapalm.png",
        quantity: 1,
        careLevel: 'Moderate',
        availability: 'In Stock',
    },
    ];
    
  return (
    <div className='max-w-7xl mx-auto mt-36 px-4 md:px-6 lg:px-8 xl:px-0'>
        <h1 className='text-2xl text-center border-b border-neutral-300 pb-2'>Checkout</h1>
{/* left side */}
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-8 xl:gap-10'>
            <div className='lg:col-span-3'>
                <div className='shadow-lg mt-6 border border-neutral-300'>
                    <h2 className='p-4 border-b-2 border-neutral-300 text-lg font-medium'>Shipping Address</h2>

                    <div className='px-4 py-6 mt-6'>
                        <div className='sm:flex gap-6'>
                            <div className='w-full'>
                                <label className='block text-sm font-medium mb-2'>First Name <span className='text-red-600'>*</span></label>
                                <input type="text" className='w-full p-3 border border-neutral-300 text-sm text-neutral-600 focus:outline-brand-primary-light'/>
                            </div>
                            <div className='w-full mt-6 sm:mt-0'>
                                <label className='block text-sm font-medium mb-2'>Last Name <span className='text-red-600'>*</span></label>
                                <input type="text" className='w-full p-3 border border-neutral-300 text-sm text-neutral-600 focus:outline-brand-primary-light'/>
                            </div>
                        </div>
                        <div className='w-full mt-6'>
                            <label className='block text-sm font-medium mb-2'>Email Address <span className='text-red-600'>*</span></label>
                            <input type='email' className='w-full p-3 border border-neutral-300 text-sm text-neutral-600 focus:outline-brand-primary-light'/>
                        </div>
                        <div className='w-full mt-6'>
                            <label className='block text-sm font-medium mb-2'>Mobile Number <span className='text-red-600'>*</span></label>
                            <input type='email' className='w-full p-3 border border-neutral-300 text-sm text-neutral-600 focus:outline-brand-primary-light'/>
                        </div>
                        <div className='w-full mt-6'>
                            <label className='block text-sm font-medium mb-2'>Street Address <span className='text-red-600'>*</span></label>
                            <input type='email' className='w-full p-3 border border-neutral-300 text-sm text-neutral-600 focus:outline-brand-primary-light'/>
                            <input type='email' className='w-full p-3 border border-neutral-300 text-sm text-neutral-600 focus:outline-brand-primary-light mt-4'/>
                        </div>
                        <div className='w-full mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6'>
                            <div>
                                <label className='block text-sm font-medium mb-2'>Division <span className='text-red-600'>*</span></label>
                                <select className='w-full p-3 border border-neutral-300 text-sm text-neutral-600 focus:outline-brand-primary-light'>
                                    <option  value="Bangladesh">Bangladesh</option>
                                </select>
                            </div>
                            <div>
                                <label className='block text-sm font-medium mb-2'>District <span className='text-red-600'>*</span></label>
                                <select className='w-full p-3 border border-neutral-300 text-sm text-neutral-600 focus:outline-brand-primary-light'>
                                    <option  value="Bangladesh">Bangladesh</option>
                                </select>
                            </div>
                            <div>
                                <label className='block text-sm font-medium mb-2'>Thana <span className='text-red-600'>*</span></label>
                                <select className='w-full p-3 border border-neutral-300 text-sm text-neutral-600 focus:outline-brand-primary-light'>
                                    <option  value="Bangladesh">Bangladesh</option>
                                </select>
                            </div>
                            <div>
                                <label className='block text-sm font-medium mb-2'>Postal Code <span className='text-red-600'>*</span></label>
                                <input type='email' className='w-full p-3 border border-neutral-300 text-sm text-neutral-600 focus:outline-brand-primary-light'/>
                            </div>
                        </div>
                        
                        <div className="flex mt-10">
                            <input type="checkbox"/>
                            <p className="pl-2 text-neutral-600 text-sm">My billing and shipping address are the same</p>
                        </div>
                    </div>
                </div>

                <div className='shadow-lg mt-6 border border-neutral-300'>
                    <h2 className='p-4 border-b-2 border-neutral-300 text-lg font-medium'>Payment Method</h2>

                    <div className='px-4 py-6'>
                        <div className="flex items-center">
                            <input type="radio" className="h-4 w-4"/>
                            <label className="pl-2 text-neutral-600 text-sm">Debit/Credit cards and mobile money</label>
                        </div>
                        <div className="flex items-center mt-4">
                            <input type="radio" className="h-4 w-4"/>
                            <label className="pl-2 text-neutral-600 text-sm">Mobile Banking</label>
                        </div>
                        <div className="flex items-center mt-4">
                            <input type="radio" className="h-4 w-4"/>
                            <label className="pl-2 text-neutral-600 text-sm">Cash on delivery</label>
                        </div>
                    </div>
                </div>
            </div>
{/* right side */}
            <div className="lg:col-span-2">
                <div className='shadow-lg mt-6 border border-neutral-300'>
                    <h2 className='p-4 border-b-2 border-neutral-300 text-lg font-medium'>Order Review</h2>

                    <div className="p-4">
                        <div className="flex items-center justify-between border-b border-b-neutral-300 p-2">
                            <p>Finalized Items</p>
                            <p>Subtotal</p>
                        </div>

                        <div>
                            {cartItem.map((items) => {
                                return(
                                    <div className='flex gap-4 px-2 py-4 border-t border-t-neutral-300'>
                                        <Link to={`/product/${plantInfo.id}`}>
                                            <img 
                                                src={items.imgURL} 
                                                alt={items.name}
                                                className='w-20 sm:w-28 md:w-32 bg-neutral-100'
                                            />
                                        </Link>
                                        <div className="w-full flex justify-between">
                                            <div>
                                                <p className='font-medium'>{items.name}</p>
                                                <p className='text-xs mt-1 text-neutral-600'>Care Level: {items.careLevel}</p>
                                                <p className="text-xs mt-1 text-neutral-600">Quantity: 1</p>
                                            </div>
                                            <div className="flex flex-col justify-between items-end">
                                                <p className="text-sm sm:text-base font-medium">Tk {items.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="flex items-center justify-between border-t border-t-neutral-300 p-2">
                            <p>Subtotal</p>
                            <p className="font-medium">Tk 750</p>
                        </div>
                        <div className="flex items-start justify-between border-t border-t-neutral-300 p-2">
                            <div className="w-[75%]">
                                <p>Shipping</p>
                                <p className="text-xs mt-2 text-neutral-600">Standard Shipping: within 3-4 days inside Dhaka, within 4-7 days outside Dhaka</p>
                            </div>
                            <p className="font-medium">Tk 100</p>
                        </div>
                        <div className="flex items-center justify-between border-t border-t-neutral-300 p-2">
                            <p>VAT</p>
                            <p className="font-medium">Tk 33.83</p>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-brand-accent">
                            <p className="font-medium">Total</p>
                            <p className="font-medium">Tk 883.83</p>
                        </div>
                    </div>
                </div>
                <button className='w-full p-2 text-white text-sm bg-black hover:bg-brand-primary duration-200 cursor-pointer'>
                    PLACE ORDER
                </button>
            </div>
        </div>
    </div>
  )
}

export default CheckoutPage