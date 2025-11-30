import { useState, useEffect, useRef } from 'react'
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
import { supabase } from '../supabase'
import useClickOutside from '../hooks/useClickOutside'
import { toast } from 'sonner'

const Navbar = ({plants}) => {

  // Hide on scroll down, show on scroll up for top navbar
  const [showTopNav, setShowTopNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => {
    setResults([]);
    setSearch("");
  })

  const handleCloseDropdown = () => {
    setResults([]);
    setSearch("");
  }

// Search functionality
  useEffect(() => {
    if (search.trim().length === 0) {
      setResults([]);
      return;
    }
    const fetchSearchResults = async () => {
      setLoading(true);
      if(!search.trim()) return [];
      
      const {data, error} = await supabase
        .from('plants')
        .select('id, name, price, imgurl, availability')
        .ilike('name', `%${search}%`)
        .limit(5);

      if (error) {
        console.error('Error fetching search results:', error);
        setResults([]);
      } else {
        setResults(data);
      }
    };
    fetchSearchResults();
    setLoading(false);
  },[search])
  console.log("Search Results:", results);
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
  const {user} = useAuth()
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
              <div>
                <button
                  onClick={() => {
                    cart.length > 0 ? navigate('/cart') : navigate('/shop')
                  }}
                  className='h-8 md:w-10 w-8 md:h-10 relative bg-brand-accent text-brand-primary rounded-full flex items-center justify-center cursor-pointer'>
                  <div className='min-w-4 h-4 px-[2px] text-[8px] md:text-[10px] leading-none top-0 right-0 bg-brand-primary border-brand-primary-dark text-brand-accent rounded-full absolute flex items-center justify-center'>{cart.length}</div>
                  <PiShoppingCartSimpleLight size={20}/>
                </button>
              </div>
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
            <Link to='/'><img src={logo} className='w-14 rounded-full' alt="BonomayaLogo" /></Link>
            <ul className='flex gap-4 md:gap-6 lg:gap-8'>
              <li className='cursor-pointer text-brand-primary-dark hover:text-brand-primary text-xs md:text-sm font-semibold'>
                <Link to="/">Home</Link>
              </li>
              <li className='cursor-pointer text-brand-primary-dark hover:text-brand-primary text-xs md:text-sm font-semibold'>
                <Link to="/shop">Shop</Link>
              </li>
              <li className='cursor-pointer text-brand-primary-dark hover:text-brand-primary text-xs md:text-sm font-semibold'>About</li>
              <li className='cursor-pointer text-brand-primary-dark hover:text-brand-primary text-xs md:text-sm font-semibold'>Contact</li>
            </ul>
          </div>

          <div className='flex gap-4'>
{/* Search */}
            <div className='relative flex items-center justify-center'>
              <input
                type="text"
                placeholder='Find Plants...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='absolute -right-1 md:w-64 w-40 h-8 md:h-12 px-3 text-sm text-brand-primary-dark rounded-full border border-brand-accent focus:outline-none focus:md:w-80 focus:ring-brand-accent transition-all duration-300'

              />
              <button className='h-8 md:w-10 w-8 md:h-10 z-50 bg-brand-accent text-brand-primary rounded-full flex items-center justify-center cursor-pointer'>
                <CiSearch size={20}/>
              </button>
              
              {search && results.length > 0 && (
                <div ref={dropdownRef} className="absolute top-12 md:right-0 right-4 bg-brand-accent shadow-lg rounded-md p-2 w-80 max-h-80 overflow-y-auto z-50">
                  {results.map((plant) => (
                    <Link to={`/product/${plant.id}`} onClick={() => {handleCloseDropdown()}} key={plant.id} className='flex gap-4 mb-2'>
                      <div className="flex items-center justify-center aspect-square overflow-hidden">
                      <img 
                          src={plant.imgurl} 
                          alt={plant.name}
                          className='w-8 sm:w-12 md:w-16 max-w-full max-h-full object-contain bg-brand-accent' 
                        />
                      </div>
                      <div>
                        <p className='text-sm'>{plant.name}</p>
                        <p className='text-xs text-neutral-400'>{plant.availability}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => {
                if(wishlist.length > 0){
                  navigate('/wishlist')
                }else{
                  navigate('/shop')
                  toast.info("Your wishlist is empty")
                }
                  
              }}
            >
              <div className='h-8 md:w-10 w-8 md:h-10 relative bg-brand-accent text-brand-primary rounded-full flex items-center justify-center cursor-pointer'>
                <div className='min-w-4 h-4 px-[2px] text-[8px] md:text-[10px] leading-none top-0 right-0 bg-brand-primary border-brand-primary-dark text-brand-accent rounded-full absolute flex items-center justify-center'>{wishlist.length}</div>
                  <CiHeart size={20}/>
              </div>
            </button>
            <button
              onClick={() => {
                if(cart.length > 0){
                  navigate('/cart')
                }else{
                  navigate('/shop')
                  toast.info("Your cart is empty")
                }
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
            {showPopover && <ProfilePopover user={user} showPopover={showPopover} setShowPopover={setShowPopover}/>}
          </div>
        </div>

      </div>

    </nav>
  )
}

export default Navbar
