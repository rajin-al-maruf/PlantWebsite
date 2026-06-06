import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import { useState } from "react";
import type { ChangeEvent } from "react";
import {supabase} from '../supabase'
import { useAuth } from "../AuthContext";

interface CheckoutForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    paymentMethod: string;
}


const CheckoutPage = () => {

    const cart = useCartStore((state) => state.cart)
    const clearCart = useCartStore((state) => state.clearCart)

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 80 : 0;
    const total = subtotal + shipping;

    const navigate = useNavigate();
    const { user } = useAuth();

    const [form, setForm] = useState<CheckoutForm>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        paymentMethod: '',
    })

const [error, setError] = useState<Partial<CheckoutForm>>({});
const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        let tempError: Partial<CheckoutForm> = {};

        if(!form.firstName.trim()) tempError.firstName = "First Name is required";
        if(!form.lastName.trim()) tempError.lastName = "Last Name is required";
        if(!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) tempError.email = "Enter a valid email";
        if(!form.phone.match(/^\d{11}$/)) tempError.phone = "Enter a valid phone number";
        if(!form.address.trim()) tempError.address = "Address is required";
        if(!form.paymentMethod) tempError.paymentMethod = "Please select a payment method";

        setError(tempError);

        return Object.keys(tempError).length === 0;
    }

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        setIsSubmitting(true);
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
                        user_id: user?.id || null
                    }
                ])
                .select()
                .single();

            if (orderError) {
                console.error('Error placing order:', orderError);
                alert(`Order Error: ${orderError.message}\n\nCheck your console for more details.`);
                return;
            } else {
                console.log('Order placed successfully:', orderInfo);
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
                alert(`Items Error: ${itemsError.message}`);
                return; // <--- This prevents the fake success redirect!
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
            navigate('/ordersuccess');
        } catch (error) {
            console.error('Checkout failed:', error);
            alert('An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }

    }
    
  return (
    <div className='max-w-6xl 2xl:max-w-7xl mx-auto mt-24 md:mt-32 px-4 md:px-6 lg:px-8 xl:px-0 pb-20'>
        <div className="mb-10">
            <h1 className='text-3xl md:text-4xl font-bold text-brand-primary-dark'>Checkout</h1>
            <p className="text-neutral-500 mt-2 text-sm">Please provide your shipping and payment details.</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
            {/* Left: Forms */}
            <div className='lg:col-span-7 xl:col-span-8 flex flex-col gap-8'>
                
                {/* Shipping Address */}
                <div className='bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8'>
                    <h2 className='text-xl font-bold text-brand-primary-dark mb-6'>Shipping Address</h2>

                    <div className='space-y-6'>
                        <div className='sm:flex gap-6 space-y-6 sm:space-y-0'>
                            <div className='w-full'>
                                <label className='block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2'>First Name <span className='text-red-500'>*</span></label>
                                <input 
                                    type="text"
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleFormChange}
                                    className='w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors'
                                />
                                {error.firstName && <p className="text-red-500 text-xs mt-1">{error.firstName}</p>}
                            </div>
                            <div className='w-full'>
                                <label className='block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2'>Last Name <span className='text-red-500'>*</span></label>
                                <input 
                                    type="text"
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleFormChange}
                                    className='w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors'
                                />
                                {error.lastName && <p className="text-red-500 text-xs mt-1">{error.lastName}</p>}
                            </div>
                        </div>
                        <div className='w-full'>
                            <label className='block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2'>Email Address <span className='text-red-500'>*</span></label>
                            <input 
                                type='email'
                                name="email"
                                value={form.email}
                                onChange={handleFormChange}
                                className='w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors'
                            />
                            {error.email && <p className="text-red-500 text-xs mt-1">{error.email}</p>}
                        </div>
                        <div className='w-full'>
                            <label className='block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2'>Phone Number <span className='text-red-500'>*</span></label>
                            <input 
                                type='text'
                                name="phone"
                                value={form.phone}
                                onChange={handleFormChange} 
                                className='w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors'
                            />
                            {error.phone && <p className="text-red-500 text-xs mt-1">{error.phone}</p>}
                        </div>
                        <div className='w-full'>
                            <label className='block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2'>Address <span className='text-red-500'>*</span></label>
                            <input 
                                type='text'
                                name="address"
                                value={form.address}
                                onChange={handleFormChange} 
                                className='w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors'
                            />
                            {error.address && <p className="text-red-500 text-xs mt-1">{error.address}</p>}
                        </div>
                        
                        <div className="flex items-center pt-2">
                            <input type="checkbox" className="w-4 h-4 accent-brand-primary rounded border-neutral-300 cursor-pointer"/>
                            <p className="pl-3 text-neutral-600 text-sm font-medium">My billing and shipping address are the same</p>
                        </div>
                    </div>
                </div>

                {/* Payment Method */}
                <div className='bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8'>
                    <h2 className='text-xl font-bold text-brand-primary-dark mb-6'>Payment Method</h2>

                    <div className='space-y-3'>
                        <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${form.paymentMethod === 'cards' ? 'border-brand-primary bg-brand-primary/5' : 'border-neutral-200 hover:bg-neutral-50'}`}>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cards"
                                checked={form.paymentMethod === 'cards'}
                                onChange={handleFormChange}
                                className="w-4 h-4 accent-brand-primary"
                            />
                            <span className="ml-3 font-medium text-sm text-brand-primary-dark">Debit / Credit Card / Mobile Money</span>
                        </label>

                        <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${form.paymentMethod === 'mobileBanking' ? 'border-brand-primary bg-brand-primary/5' : 'border-neutral-200 hover:bg-neutral-50'}`}>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="mobileBanking"
                                checked={form.paymentMethod === 'mobileBanking'}
                                onChange={handleFormChange}
                                className="w-4 h-4 accent-brand-primary"
                            />
                            <span className="ml-3 font-medium text-sm text-brand-primary-dark">Mobile Banking</span>
                        </label>

                        <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${form.paymentMethod === 'cod' ? 'border-brand-primary bg-brand-primary/5' : 'border-neutral-200 hover:bg-neutral-50'}`}>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cod"
                                checked={form.paymentMethod === 'cod'}
                                onChange={handleFormChange}
                                className="w-4 h-4 accent-brand-primary"
                            />
                            <span className="ml-3 font-medium text-sm text-brand-primary-dark">Cash on delivery</span>
                        </label>
                        {error.paymentMethod && <p className="text-red-500 text-xs mt-2 font-bold px-2">{error.paymentMethod}</p>}
                    </div>
                </div>
            </div>
            
            {/* Right: Order Summary */}
            <div className="lg:col-span-5 xl:col-span-4">
                <div className="bg-neutral-50 rounded-3xl p-6 sm:p-8 border border-neutral-100 h-max sticky top-32">
                    <h2 className="text-lg font-bold text-brand-primary-dark border-b border-neutral-200 pb-4 mb-6">Order Review</h2>
                    
                    <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 mb-6">
                        {cart.map((item, index) => (
                            <div key={index} className='flex gap-4 items-center'>
                                <div className="w-16 h-16 bg-white border border-neutral-200 rounded-xl overflow-hidden flex items-center justify-center shrink-0">
                                    <img src={item.imgurl} alt={item.name} className='w-full h-full object-cover' />
                                </div>
                                <div className="flex-1">
                                    <h3 className='font-bold text-sm text-brand-primary-dark line-clamp-1'>{item.name}</h3>
                                    <p className="text-xs text-neutral-500 mt-1">Qty: {item.quantity}</p>
                                </div>
                                <p className="text-sm font-bold text-brand-primary-dark">Tk {item.price * item.quantity}</p>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4 text-sm text-neutral-600 mb-6 border-t border-neutral-200 pt-6">
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
                    
                    <button 
                        onClick={placeOrder}
                        disabled={isSubmitting}
                        className="w-full py-4 bg-brand-primary hover:bg-brand-primary-dark transition-colors text-white rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center cursor-pointer disabled:bg-neutral-400 disabled:cursor-not-allowed">
                        {isSubmitting ? "Placing Order..." : "Place Order"}
                    </button>
                    <p className="text-xs text-neutral-400 mt-6 text-center leading-relaxed">
                        Standard Shipping: 3-4 days inside Dhaka, 4-7 days outside Dhaka.
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CheckoutPage