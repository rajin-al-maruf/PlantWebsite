import React from 'react'
import logo from '../assets/BonomayaLogo.jpg'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const Footer = () => {
  return (
    <footer className='w-full bg-brand-primary-dark text-white mt-32 px-4 md:px-6 lg:px-8 xl:px-0'>
        <div className='max-w-7xl mx-auto py-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 border-b border-b-brand-primary-light'>
            <div className='flex flex-col items-center sm:block'>
                <img src={logo} className='w-14 rounded-full' alt="BonomayaLogo" />
                <p className='mt-4 text-sm text-brand-accent text-center sm:text-start'>
                    Welcome to Bonomaya. Your trusted source for beautiful, low-maintenance indoor plants that bring life and freshness to your home and workspace.
                </p>
                <div className='flex gap-4 mt-8'>
                    <div className='w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-brand-primary-light'>
                        <FaFacebookF size={14}/>
                    </div>
                    <div className='w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-brand-primary-light'>
                        <FaInstagram size={14}/>
                    </div>
                    <div className='w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-brand-primary-light'>
                        <FaXTwitter size={14}/>
                    </div>
                    <div className='w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-brand-primary-light'>
                        <FaLinkedinIn size={14}/>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-2 gap-16'>
                <div className='text-center sm:text-start'>
                    <h3 className='text-xl font-semibold'>Useful Links</h3>
                    <ul className='mt-4 text-sm text-brand-accent flex flex-col gap-4'>
                        <li className='cursor-pointer hover:text-white hover:underline'>Contact Us</li>
                        <li className='cursor-pointer hover:text-white hover:underline'>Find Store</li>
                        <li className='cursor-pointer hover:text-white hover:underline'>About Us</li>
                        <li className='cursor-pointer hover:text-white hover:underline'>Our Location</li>
                        <li className='cursor-pointer hover:text-white hover:underline'>Our Gallery</li>
                    </ul>
                </div>
                <div className='text-center sm:text-start'>
                    <h3 className='text-xl font-semibold'>Help Center</h3>
                    <ul className='mt-4 text-sm text-brand-accent flex flex-col gap-4'>
                        <li className='cursor-pointer hover:text-white hover:underline'>FAQ</li>
                        <li className='cursor-pointer hover:text-white hover:underline'>Terms & Condition</li>
                        <li className='cursor-pointer hover:text-white hover:underline'>Return Policy</li>
                        <li className='cursor-pointer hover:text-white hover:underline'>Reporting</li>
                        <li className='cursor-pointer hover:text-white hover:underline'>Privacy</li>
                    </ul>
                </div>
            </div>
            <div className='flex flex-col items-center lg:block justify-center sm:col-span-2 lg:col-span-1'>
                 <h3 className='text-xl font-semibold'>Join Our Newsletter</h3>
                 <p className='mt-4 text-sm text-brand-accent text-center lg:text-start'>
                    Subscribe for plant care tips, fresh arrivals, and exclusive offers plus enjoy 10% off your first order!
                 </p>
                 <input 
                    type="email" 
                    name="" 
                    id=""
                    placeholder='Email address'
                    className='w-full h-10 mt-8 px-4 text-sm bg-brand-primary-light text-brand-accent placeholder:text-brand-accent rounded-full outline-none'
                 />
                 <button className='w-full h-10 mt-4 text-sm bg-brand-primary rounded-full cursor-pointer'>
                    Subscribe Now
                 </button>
            </div>
        </div>
        <div className='max-w-7xl mx-auto py-4 text-brand-accent flex flex-col sm:flex-row gap-4 items-center justify-between'>
            <p className='text-xs xl:text-sm'>© 2025 <span className='text-brand-primary-light'>Bonomaya</span>. All rights reserved.</p>
            <div className='flex items-center text-xs xl:text-sm text-brand-accent'>
                <p className='border-r border-r-brand-primary-light pr-2 lg:pr-6 cursor-pointer hover:text-white hover:underline'>Terms & Condition</p>
                <p className='pl-2 lg:pl-6 cursor-pointer hover:text-white hover:underline'>Privacy Policy</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer