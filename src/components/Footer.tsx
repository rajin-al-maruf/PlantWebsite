import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='w-full bg-brand-primary-dark text-white pt-20 pb-6 px-4 md:px-6 lg:px-8 xl:px-0'>
        <div className='max-w-6xl 2xl:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 border-b border-white/10 pb-16'>
            
            {/* Brand Section */}
            <div className='lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left'>
                <div className="flex items-center gap-3">
                    <img src='/assets/BonomayaLogo.jpg' className='w-12 h-12 rounded-full shadow-md' alt="BonomayaLogo" />
                    <span className="text-2xl font-bold tracking-wide">Bonomaya</span>
                </div>
                <p className='mt-6 text-sm text-gray-300 leading-relaxed max-w-sm'>
                    Your trusted source for beautiful, low-maintenance indoor plants that bring life, freshness, and a touch of serenity to your space.
                </p>
                <div className='flex gap-3 mt-8'>
                    <div className='w-9 h-9 bg-white/5 rounded-full flex items-center justify-center cursor-pointer hover:bg-brand-primary hover:-translate-y-1 transition-all duration-300'>
                        <FaFacebookF size={14}/>
                    </div>
                    <div className='w-9 h-9 bg-white/5 rounded-full flex items-center justify-center cursor-pointer hover:bg-brand-primary hover:-translate-y-1 transition-all duration-300'>
                        <FaInstagram size={14}/>
                    </div>
                    <div className='w-9 h-9 bg-white/5 rounded-full flex items-center justify-center cursor-pointer hover:bg-brand-primary hover:-translate-y-1 transition-all duration-300'>
                        <FaXTwitter size={14}/>
                    </div>
                    <div className='w-9 h-9 bg-white/5 rounded-full flex items-center justify-center cursor-pointer hover:bg-brand-primary hover:-translate-y-1 transition-all duration-300'>
                        <FaLinkedinIn size={14}/>
                    </div>
                </div>
            </div>
            
            {/* Quick Links */}
            <div className='lg:col-span-2 lg:pl-10 flex flex-col items-center md:items-start'>
                <h3 className='text-sm font-bold tracking-widest uppercase text-white mb-6'>Explore</h3>
                <ul className='text-sm text-gray-300 flex flex-col gap-4 text-center md:text-left'>
                    <li><Link to="/shop" className='hover:text-brand-primary-light transition-colors duration-300'>Shop Plants</Link></li>
                    <li><Link to="/shop" className='hover:text-brand-primary-light transition-colors duration-300'>New Arrivals</Link></li>
                    <li><Link to="/shop?category=Beginner-Friendly" className='hover:text-brand-primary-light transition-colors duration-300'>Plant Care</Link></li>
                    <li><Link to="/about" className='hover:text-brand-primary-light transition-colors duration-300'>About Us</Link></li>
                </ul>
            </div>

            {/* Support Links */}
            <div className='lg:col-span-2 flex flex-col items-center md:items-start'>
                <h3 className='text-sm font-bold tracking-widest uppercase text-white mb-6'>Support</h3>
                <ul className='text-sm text-gray-300 flex flex-col gap-4 text-center md:text-left'>
                    <li><Link to="/contact" className='hover:text-brand-primary-light transition-colors duration-300'>Contact Us</Link></li>
                    <li><Link to="/" className='hover:text-brand-primary-light transition-colors duration-300'>FAQ</Link></li>
                    <li><Link to="/" className='hover:text-brand-primary-light transition-colors duration-300'>Shipping & Returns</Link></li>
                    <li><Link to="/" className='hover:text-brand-primary-light transition-colors duration-300'>Track Order</Link></li>
                </ul>
            </div>

            {/* Newsletter */}
            <div className='lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left'>
                <h3 className='text-sm font-bold tracking-widest uppercase text-white mb-6'>Join Our Newsletter</h3>
                <p className='text-sm text-gray-300 mb-4 leading-relaxed'>
                    Subscribe for plant care tips, fresh arrivals, and exclusive offers.
                </p>
                <form className="w-full max-w-sm flex items-center bg-white/5 border border-white/10 rounded-full p-1 mt-2 focus-within:border-brand-primary/50 focus-within:bg-white/10 transition-colors">
                    <input 
                        type="email" 
                        placeholder="Your email address" 
                        className="bg-transparent border-none outline-none text-sm px-4 py-2 w-full text-white placeholder-gray-500" 
                        required
                    />
                    <button type="submit" className="bg-brand-primary hover:bg-brand-primary-light text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors shrink-0 cursor-pointer">
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
        
        <div className='max-w-6xl 2xl:max-w-7xl mx-auto pt-6 flex flex-col md:flex-row gap-4 items-center justify-between text-gray-400'>
            <p className='text-xs xl:text-sm'>© {new Date().getFullYear()} <span className='text-white font-medium'>Bonomaya</span>. All rights reserved.</p>
            <div className='flex items-center gap-6 text-xs sm:text-sm'>
                <Link to="/" className='hover:text-white transition-colors duration-300'>Privacy Policy</Link>
                <Link to="/" className='hover:text-white transition-colors duration-300'>Terms of Service</Link>
            </div>
        </div>
    </footer>
  )
}

export default Footer