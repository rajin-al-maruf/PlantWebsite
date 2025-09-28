import { Link } from "react-router-dom";
import plantInfo from "../plantInfo";
import useCartStore from "../store/cartStore";
import { useState } from "react";
import {supabase} from '../supabase'

const CheckoutPage = () => {

    const cart = useCartStore((state) => state.cart)
    const clearCart = useCartStore((state) => state.clearCart)

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 80 : 0;
    const total = subtotal + shipping;

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        paymentMethod: '',
    })

    const [error, setError] = useState({});

    const validateForm = () => {
        let tempError = {};

        if(!form.firstName.trim()) tempError.firstName = "First Name is required";
        if(!form.lastName.trim()) tempError.lastName = "Last Name is required";
        if(!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) tempError.email = "Enter a valid email";
        if(!form.phone.match(/^\d{11}$/)) tempError.phone = "Enter a valid phone number";
        if(!form.address.trim()) tempError.address = "Address is required";

        setError(tempError);

        return Object.keys(tempError).length === 0;
    }

    const handleFormChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const placeOrder = async () => {
        if(cart.length === 0) {
            alert('Your cart is empty. Please add items to your cart before placing an order.');
            return;
        }
        if(!validateForm()) return;
        // Here you would typically send the order details to your backend server on click "PLACE ORDER"
        try {
            //1.push orderInfo to supabase table 'orders'
            const { data: orderInfo, error: orderError } = await supabase
                .from('orders')
                .insert([
                    {
                        customer_name: form.firstName + ' ' + form.lastName,
                        customer_email: form.email,
                        customer_phone: form.phone,
                        customer_address: form.address,
                        total_amount: total,
                        order_status: 'pending',
                        payment_method: form.paymentMethod,
                    }
                ])
                .select()
                .single();

            if (orderError) {
                console.error('Error placing order:', orderError);
                alert('There was an issue placing your order. Please try again.');
            } else {
                console.log('Order placed successfully:', orderInfo);
                alert('Your order has been placed successfully!');
            }

            //2.push order items to supabase table 'order_items'

            const orderItems = cart.map((item) => ({
                order_id: orderInfo.id,
                product_id: item.id,
                quantity: item.quantity,
                price: item.price,
                subtotal: item.price * item.quantity,
            }))

            const { data: itemsData, error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems);

            
            if (itemsError) {
                console.error('Error adding order items:', itemsError);
            } else {
                console.log('Order items added successfully:', itemsData);
            }
            
            //3.clear the cart
            clearCart();

            //4.redirect to home page and clear the form
            setForm({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
                paymentMethod: '',
            });
            // window.location.href = '/';
        } catch (error) {
            console.error('Checkout failed:', error);
            alert('An unexpected error occurred. Please try again.');
        }

    }
    
  return (
    <div className='max-w-6xl 2xl:max-w-7xl mx-auto mt-36 px-4 md:px-6 lg:px-8 xl:px-0'>
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
                                <input 
                                    type="text"
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleFormChange}
                                    className='w-full p-3 border border-neutral-300 text-sm text-neutral-600 focus:outline-brand-primary-light'
                                />
                                {error.firstName && <p className="text-red-600 text-xs mt-1">{error.firstName}</p>}
                            </div>
                            <div className='w-full mt-6 sm:mt-0'>
                                <label className='block text-sm font-medium mb-2'>Last Name <span className='text-red-600'>*</span></label>
                                <input 
                                    type="text"
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleFormChange}
                                    className='w-full p-3 border border-neutral-300 text-sm text-neutral-600 focus:outline-brand-primary-light'
                                />
                                {error.lastName && <p className="text-red-600 text-xs mt-1">{error.lastName}</p>}
                            </div>
                        </div>
                        <div className='w-full mt-6'>
                            <label className='block text-sm font-medium mb-2'>Email Address <span className='text-red-600'>*</span></label>
                            <input 
                                type='email'
                                name="email"
                                value={form.email}
                                onChange={handleFormChange}
                                className='w-full p-3 border border-neutral-300 text-sm text-neutral-600 focus:outline-brand-primary-light'
                            />
                            {error.email && <p className="text-red-600 text-xs mt-1">{error.email}</p>}
                        </div>
                        <div className='w-full mt-6'>
                            <label className='block text-sm font-medium mb-2'>Phone Number <span className='text-red-600'>*</span></label>
                            <input 
                                type='text'
                                name="phone"
                                value={form.phone}
                                onChange={handleFormChange} 
                                className='w-full p-3 border border-neutral-300 text-sm text-neutral-600 focus:outline-brand-primary-light'
                            />
                            {error.phone && <p className="text-red-600 text-xs mt-1">{error.phone}</p>}
                        </div>
                        <div className='w-full mt-6'>
                            <label className='block text-sm font-medium mb-2'>Address <span className='text-red-600'>*</span></label>
                            <input 
                                type='text'
                                name="address"
                                value={form.address}
                                onChange={handleFormChange} 
                                className='w-full p-3 border border-neutral-300 text-sm text-neutral-600 focus:outline-brand-primary-light'
                            />
                            {error.address && <p className="text-red-600 text-xs mt-1">{error.address}</p>}
                        </div>
                        {/* I will add that functionality later */}
                        {/* <div className='w-full mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6'>
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
                        </div> */}
                        
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
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cards"
                                checked={form.paymentMethod === 'cards'}
                                onChange={handleFormChange}
                            />
                            <label className="pl-2 text-neutral-600 text-sm">
                                Debit/Credit cards and mobile money
                            </label>
                            </div>

                            <div className="flex items-center mt-4">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="mobileBanking"
                                checked={form.paymentMethod === 'mobileBanking'}
                                onChange={handleFormChange}
                            />
                            <label className="pl-2 text-neutral-600 text-sm">Mobile Banking</label>
                            </div>

                            <div className="flex items-center mt-4">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cod"
                                checked={form.paymentMethod === 'cod'}
                                onChange={handleFormChange}
                            />
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
                            {cart.map((items, index) => {
                                return(
                                    <div key={index} className='flex gap-4 px-2 py-4 border-t border-t-neutral-300'>
                                        <Link to={`/product/${plantInfo.id}`}>
                                            <img 
                                                src={items.imgurl} 
                                                alt={items.name}
                                                className='w-20 sm:w-28 md:w-32 bg-neutral-100'
                                            />
                                        </Link>
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
                                )
                            })}
                        </div>

                        <div className="flex items-center justify-between border-t border-t-neutral-300 p-2">
                            <p>Subtotal</p>
                            <p className="font-medium">Tk {subtotal}</p>
                        </div>
                        <div className="flex items-start justify-between border-t border-t-neutral-300 p-2">
                            <div className="w-[75%]">
                                <p>Shipping</p>
                                <p className="text-xs mt-2 text-neutral-600">Standard Shipping: within 3-4 days inside Dhaka, within 4-7 days outside Dhaka</p>
                            </div>
                            <p className="font-medium">Tk {shipping}</p>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-brand-accent">
                            <p className="font-medium">Total</p>
                            <p className="font-medium">Tk {total}</p>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={placeOrder}
                    className='w-full p-2 text-white text-sm bg-black hover:bg-brand-primary duration-200 cursor-pointer'>
                    PLACE ORDER
                </button>
            </div>
        </div>
    </div>
  )
}

export default CheckoutPage