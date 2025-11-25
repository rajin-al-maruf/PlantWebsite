import { useState, useEffect } from 'react'
import logo from '/assets/BonomayaLogo.jpg'
import { CiHeart, CiSearch, CiUser } from 'react-icons/ci'
import { PiShoppingCartSimpleLight } from 'react-icons/pi'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { IoCloseOutline } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import useCartStore from '../store/cartStore'
import useWishlistStore from '../store/wishlistStore'
import ProfilePopover from './ProfilePopover'
import { useAuth } from '../AuthContext'

const Navbar = () => {

  // Hide on scroll down, show on scroll up for top navbar
  const [showTopNav, setShowTopNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // scrolling down
        setShowTopNav(false)
      } else {
        // scrolling up
        setShowTopNav(true)
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const [showSideNav, setShowSideNav] = useState(false)
  const cart = useCartStore((state) => state.cart)
  const wishlist = useWishlistStore((state) => state.wishlist)

// Returns auth user only. ref:Authcontext.jsx
  const {user, loading} = useAuth()
  const navigate = useNavigate()
  const [showPopover, setShowPopover] = useState(false)

  return (
    <nav className='absolute w-full z-50 top-0 left-0'>

      {/* Mobile Navbar for smaller than md screens */}
          <div className='block mt-4 md:hidden px-4'>
          <div className='flex items-center justify-between'>
            <button 
              onClick={() => setShowSideNav(true)}
              className='cursor-pointer text-brand-accent'
            >
              <HiOutlineMenuAlt2 size={20} />
            </button>
            <div className='flex gap-2'>
              <Link to="/cart">
                <button className='h-8 md:w-10 w-8 md:h-10 relative bg-brand-accent text-brand-primary rounded-full flex items-center justify-center cursor-pointer'>
                  <div className='min-w-4 h-4 px-[2px] text-[8px] md:text-[10px] leading-none top-0 right-0 bg-brand-primary border-brand-primary-dark text-brand-accent rounded-full absolute flex items-center justify-center'>{cart.length}</div>
                  <PiShoppingCartSimpleLight size={20}/>
                </button>
              </Link>
              <Link to="/auth">
                <button className='h-8 md:w-10 w-8 md:h-10 bg-brand-accent text-brand-primary rounded-full flex items-center justify-center cursor-pointer'>
                  <CiUser size={20}/>
                </button>
              </Link>
            </div>
          </div>
          <div className={showSideNav?
                  'fixed w-[80%] h-screen top-0 left-0 p-4 bg-brand-primary-light ease-in-out duration-500 z-50'
                : 'fixed top-0 -left-full w-full h-screen p-4 bg-brand-primary-light ease-in-out duration-500 z-50'
            }
          >
          <button
            onClick={() => setShowSideNav(false)}
            className="absolute top-4 right-6 hover:text-brand-accent cursor-pointer"
          >
            <IoCloseOutline size={28} />
          </button>
          <img src={logo} className='w-14 mt-6 rounded-full' alt="BonomayaLogo" />
          <ul className='flex flex-col mt-8 gap-4 md:gap-6'>
            <li className='cursor-pointer pb-4 border-b border-b-brand-primary text-brand-primary-dark hover:text-brand-accent font-semibold '>
              <Link to="/">Home</Link>
            </li>
            <li className='cursor-pointer pb-4 border-b border-b-brand-primary text-brand-primary-dark hover:text-brand-accent font-semibold '>
              <Link to="/shop">Shop</Link>
            </li>
            <li className='cursor-pointer pb-4 border-b border-b-brand-primary text-brand-primary-dark hover:text-brand-accent font-semibold '>About</li>
            <li className='cursor-pointer pb-4 border-b border-b-brand-primary text-brand-primary-dark hover:text-brand-accent font-semibold '>Track Order</li>
            <li className='cursor-pointer pb-4 text-brand-primary-dark hover:text-brand-accent font-semibold '>Contact</li>
          </ul>
        </div>
      </div>

      {/* Top Navbar for md and larger screens */}
      <div 
        className={`max-w-6xl 2xl:max-w-7xl mx-auto hidden md:block fixed left-0 right-0 z-50 md:px-6 lg:px-8 xl:px-0 transition-transform duration-300 
        ${showTopNav ? "top-4 translate-y-0" : "top-0 -translate-y-full"}`}
      >

        <div className='bg-brand-accent/30 backdrop-blur-sm border border-brand-accent/30 px-4 py-2 rounded-full flex items-center justify-between shadow-lg'>
          <div className='flex items-center gap-12 md:gap-10 lg:gap-14 xl:gap-18'>
            <img src={logo} className='w-14 rounded-full' alt="BonomayaLogo" />
            <ul className='flex gap-4 md:gap-6 lg:gap-8'>
              <li className='cursor-pointer text-brand-primary-dark hover:text-brand-primary text-xs md:text-sm font-semibold'>
                <Link to="/">Home</Link>
              </li>
              <li className='cursor-pointer text-brand-primary-dark hover:text-brand-primary text-xs md:text-sm font-semibold'>
                <Link to="/shop">Shop</Link>
              </li>
              <li className='cursor-pointer text-brand-primary-dark hover:text-brand-primary text-xs md:text-sm font-semibold'>About</li>
              <li className='cursor-pointer text-brand-primary-dark hover:text-brand-primary text-xs md:text-sm font-semibold'>Track Order</li>
              <li className='cursor-pointer text-brand-primary-dark hover:text-brand-primary text-xs md:text-sm font-semibold'>Contact</li>
            </ul>
          </div>

          <div className='flex gap-4'>
            <button className='h-8 md:w-10 w-8 md:h-10 bg-brand-accent text-brand-primary rounded-full flex items-center justify-center cursor-pointer'>
              <CiSearch size={20}/>
            </button>
            <button
              onClick={() => {
                wishlist.length > 0 ? navigate('/wishlist') : navigate('/shop')
              }}
            >
              <div className='h-8 md:w-10 w-8 md:h-10 relative bg-brand-accent text-brand-primary rounded-full flex items-center justify-center cursor-pointer'>
                <div className='min-w-4 h-4 px-[2px] text-[8px] md:text-[10px] leading-none top-0 right-0 bg-brand-primary border-brand-primary-dark text-brand-accent rounded-full absolute flex items-center justify-center'>{wishlist.length}</div>
                  <CiHeart size={20}/>
              </div>
            </button>
            <button
              onClick={() => {
                cart.length > 0 ? navigate('/cart') : navigate('/shop')
              }}
            >
              <div className='h-8 md:w-10 w-8 md:h-10 relative bg-brand-accent text-brand-primary rounded-full flex items-center justify-center cursor-pointer'>
                <div className='min-w-4 h-4 px-[2px] text-[8px] md:text-[10px] leading-none top-0 right-0 bg-brand-primary border-brand-primary-dark text-brand-accent rounded-full absolute flex items-center justify-center'>{cart.length}</div>
                <PiShoppingCartSimpleLight size={20}/>
              </div>
            </button>
            <button
              onClick={() => {
                if (user) {
                  setShowPopover((prev) => !prev)
                } else {
                  navigate('/auth')
                }
              }}
              className='h-8 md:w-10 w-8 md:h-10 bg-brand-accent text-brand-primary rounded-full flex items-center justify-center cursor-pointer'>
              <CiUser size={20}/>
            </button>
            {showPopover && <ProfilePopover user={user} />}
          </div>
        </div>

      </div>

    </nav>
  )
}

export default Navbar
