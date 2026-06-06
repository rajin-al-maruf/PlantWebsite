import { useState, useEffect, useRef } from 'react'
import { CiHeart, CiSearch, CiUser } from 'react-icons/ci'
import { PiShoppingCartSimpleLight } from 'react-icons/pi'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { IoCloseOutline } from 'react-icons/io5'
import { IoIosArrowDown } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import useCartStore from '../store/cartStore'
import useWishlistStore from '../store/wishlistStore'
import { useAuth } from '../AuthContext'
import { supabase } from '../supabase'
import useClickOutside from '../hooks/useClickOutside'
import { toast } from 'sonner'
import type { Plant } from '../App'

type SearchResult = Pick<Plant, 'id' | 'name' | 'price' | 'imgurl' | 'availability'>;

const Navbar = () => {

  // Hide on scroll down, show on scroll up for top navbar
  const [showTopNav, setShowTopNav] = useState(true)
  const lastScrollY = useRef(0)
  
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      
      const {data, error} = await supabase
        .from('plants')
        .select('id, name, price, imgurl, availability')
        .ilike('name', `%${search}%`)
        .limit(5);

      if (error) {
        console.error('Error fetching search results:', error);
        setResults([]);
      } else {
        setResults(data as SearchResult[]);
      }
      setLoading(false);
    };
    fetchSearchResults();
  },[search])
  console.log("Search Results:", results);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        // scrolling down
        setShowTopNav(false)
      } else {
        // scrolling up
        setShowTopNav(true)
      }
      lastScrollY.current = window.scrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const [showSideNav, setShowSideNav] = useState(false)
  const [showMobileShop, setShowMobileShop] = useState(false)
  const cart = useCartStore((state) => state.cart)
  const wishlist = useWishlistStore((state) => state.wishlist)

// Returns auth user only. ref:Authcontext.jsx
  const {user} = useAuth()
  const navigate = useNavigate()

  return (
    <nav className='absolute w-full z-50 top-0 left-0'>

      {/* Mobile Navbar for smaller than md screens */}
      <div className={`md:hidden fixed top-0 left-0 w-full z-50 transition-transform duration-300 bg-white/90 backdrop-blur-md border-b border-neutral-200/50 shadow-sm ${showTopNav ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className='flex items-center justify-between px-4 py-3'>
            <div className='flex items-center gap-3'>
              <button 
                onClick={() => setShowSideNav(true)}
                className='text-brand-primary-dark hover:text-brand-primary transition-colors cursor-pointer p-1'
              >
                <HiOutlineMenuAlt2 size={24} />
              </button>
              <Link to='/'><img src="/assets/BonomayaLogo.jpg" className='w-8 h-8 rounded-full shadow-sm' alt="BonomayaLogo" /></Link>
            </div>
            
            <div className='flex items-center gap-1 relative'>
              <button
                onClick={() => {
                  if (cart.length > 0) { navigate('/cart'); } else { navigate('/shop'); toast.info("Your cart is empty"); }
                }}
                className='w-10 h-10 relative text-neutral-600 hover:bg-brand-primary/10 hover:text-brand-primary rounded-full flex items-center justify-center cursor-pointer transition-colors'>
                <div className='absolute top-1 right-1 w-4 h-4 bg-brand-primary text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white'>{cart.length}</div>
                <PiShoppingCartSimpleLight size={22}/>
              </button>
              <button 
                onClick={() => {
                  if (user) {
                    navigate('/profile')
                  } else {
                    navigate('/auth')
                  }
                }}
                className='w-10 h-10 text-neutral-600 hover:bg-brand-primary/10 hover:text-brand-primary rounded-full flex items-center justify-center cursor-pointer transition-colors overflow-hidden border border-transparent hover:border-brand-primary/30'>
                {user?.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} className="w-full h-full object-cover" alt="Profile" />
                ) : (
                  <CiUser size={22}/>
                )}
              </button>
            </div>
          </div>
          
          {/* Side Nav Overlay */}
          <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 h-screen ${showSideNav ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setShowSideNav(false)} />
          
          {/* Side Nav Panel */}
          <div className={`fixed top-0 left-0 w-[80%] max-w-sm h-screen bg-white shadow-2xl transition-transform duration-500 z-50 flex flex-col ${showSideNav ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex items-center justify-between p-6 border-b border-neutral-100">
              <img src="/assets/BonomayaLogo.jpg" className='w-12 h-12 rounded-full shadow-sm' alt="BonomayaLogo" />
              <button
                onClick={() => setShowSideNav(false)}
                className="p-2 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer bg-neutral-50 hover:bg-red-50 rounded-full"
              >
                <IoCloseOutline size={24} />
              </button>
            </div>
            <ul className='flex flex-col py-6 px-8 gap-6'>
              <li><Link to="/" onClick={() => setShowSideNav(false)} className='block text-lg font-bold text-brand-primary-dark hover:text-brand-primary transition-colors'>Home</Link></li>
              <li>
                <div onClick={() => setShowMobileShop(!showMobileShop)} className='flex items-center justify-between cursor-pointer text-lg font-bold text-brand-primary-dark hover:text-brand-primary transition-colors'>
                  <span>Shop</span>
                  <IoIosArrowDown className={`transition-transform duration-300 ${showMobileShop ? 'rotate-180' : ''}`} />
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${showMobileShop ? 'max-h-40 mt-4' : 'max-h-0'}`}>
                  <ul className="flex flex-col gap-4 pl-4 border-l-2 border-neutral-100">
                    <li><Link to="/shop" onClick={() => setShowSideNav(false)} className='block text-base font-medium text-brand-primary-dark hover:text-brand-primary transition-colors'>Indoor Plants</Link></li>
                    <li><Link to="/combo" onClick={() => setShowSideNav(false)} className='block text-base font-medium text-brand-primary-dark hover:text-brand-primary transition-colors'>Plant Combo</Link></li>
                    <li><Link to="/soil-pots" onClick={() => setShowSideNav(false)} className='block text-base font-medium text-brand-primary-dark hover:text-brand-primary transition-colors'>Soil & Pots</Link></li>
                  </ul>
                </div>
              </li>
              <li><Link to="/about" onClick={() => setShowSideNav(false)} className='block text-lg font-bold text-brand-primary-dark hover:text-brand-primary transition-colors'>About</Link></li>
              <li><Link to="/contact" onClick={() => setShowSideNav(false)} className='block text-lg font-bold text-brand-primary-dark hover:text-brand-primary transition-colors'>Contact</Link></li>
            </ul>
          </div>
      </div>

      {/* Top Navbar for md and larger screens */}
      <div 
        className={`max-w-6xl 2xl:max-w-7xl mx-auto hidden md:block fixed left-0 right-0 z-50 md:px-6 lg:px-8 xl:px-0 transition-transform duration-500 ease-out 
        ${showTopNav ? "top-6 translate-y-0" : "top-0 -translate-y-full"}`}
      >

        <div className='bg-white/90 backdrop-blur-md border border-neutral-200/60 px-4 lg:px-6 py-2.5 rounded-full flex items-center justify-between shadow-lg shadow-neutral-200/20'>
          <div className='flex items-center gap-8 lg:gap-12'>
            <Link to='/' className="shrink-0"><img src="/assets/BonomayaLogo.jpg" className='w-12 h-12 rounded-full shadow-sm hover:scale-105 transition-transform duration-300' alt="BonomayaLogo" /></Link>
            <ul className='flex items-center gap-6 lg:gap-8'>
              <li><Link to="/" className='cursor-pointer text-brand-primary-dark hover:text-brand-primary text-sm font-bold tracking-wide transition-colors'>Home</Link></li>
              <li className='relative group'>
                <div className='flex items-center gap-1 cursor-pointer text-brand-primary-dark group-hover:text-brand-primary text-sm font-bold tracking-wide transition-colors py-2'>
                  Shop <IoIosArrowDown className='transition-transform duration-300 group-hover:rotate-180' size={16} />
                </div>
                {/* pt-4 creates an invisible "bridge" so the mouse doesn't lose hover when dragging down */}
                <div className='absolute top-full left-0 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300'>
                  <ul className='bg-white border border-neutral-100 shadow-xl rounded-xl py-2 w-48 flex flex-col'>
                    <li><Link to="/shop" className='block px-5 py-2.5 text-sm font-medium text-brand-primary-dark hover:text-brand-primary hover:bg-neutral-50 transition-colors'>Indoor Plants</Link></li>
                    <li><Link to="/combo" className='block px-5 py-2.5 text-sm font-medium text-brand-primary-dark hover:text-brand-primary hover:bg-neutral-50 transition-colors'>Plant Combo</Link></li>
                    <li><Link to="/soil-pots" className='block px-5 py-2.5 text-sm font-medium text-brand-primary-dark hover:text-brand-primary hover:bg-neutral-50 transition-colors'>Soil & Pots</Link></li>
                  </ul>
                </div>
              </li>
              <li><Link to="/about" className='cursor-pointer text-brand-primary-dark hover:text-brand-primary text-sm font-bold tracking-wide transition-colors'>About</Link></li>
              <li><Link to="/contact" className='cursor-pointer text-brand-primary-dark hover:text-brand-primary text-sm font-bold tracking-wide transition-colors'>Contact</Link></li>
            </ul>
          </div>

          <div className='flex items-center gap-2'>
{/* Search */}
            <div className='relative flex items-center' ref={dropdownRef}>
              <div className='flex items-center bg-neutral-100 rounded-full px-3 py-2 border border-transparent focus-within:bg-white focus-within:border-brand-primary/30 focus-within:shadow-sm transition-all duration-300'>
                <CiSearch size={20} className='text-neutral-500 shrink-0'/>
                <input
                  type="text"
                  placeholder='Search plants...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className='bg-transparent border-none outline-none pl-2 w-32 md:w-40 lg:w-56 focus:w-48 lg:focus:w-72 text-sm text-brand-primary-dark placeholder-neutral-400 transition-all duration-300'
                />
              </div>
              
              {search && loading && (
                <div className="absolute top-14 right-0 bg-white border border-neutral-100 shadow-xl rounded-2xl p-4 w-80 z-50 text-center text-sm text-brand-primary font-medium">
                  <span className="animate-pulse">Searching...</span>
                </div>
              )}
              {search && !loading && results.length > 0 && (
                <div className="absolute top-14 right-0 bg-white border border-neutral-100 shadow-2xl rounded-2xl p-2 w-80 max-h-96 overflow-y-auto z-50 flex flex-col gap-1">
                  {results.map((plant) => (
                    <Link to={`/product/${plant.id}`} onClick={handleCloseDropdown} key={plant.id} className='flex items-center gap-4 p-2 hover:bg-neutral-50 rounded-xl transition-colors'>
                      <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center shrink-0 p-1">
                        <img src={plant.imgurl} alt={plant.name} className='w-full h-full object-cover mix-blend-multiply' />
                      </div>
                      <div className="flex-col flex-1 overflow-hidden">
                        <p className='text-sm font-bold text-brand-primary-dark truncate'>{plant.name}</p>
                        <p className={`text-[10px] sm:text-xs font-medium mt-0.5 ${plant.availability === 'Out Of Stock' ? 'text-red-500' : 'text-neutral-500'}`}>{plant.availability}</p>
                      </div>
                      <p className='text-sm font-semibold text-brand-primary'>Tk {plant.price}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 ml-2 pl-4 border-l border-neutral-200 relative">
                <button
                  onClick={() => {
                    if(wishlist.length > 0){
                      navigate('/wishlist')
                    }else{
                      navigate('/shop')
                      toast.info("Your wishlist is empty")
                    }
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-600 hover:bg-brand-primary/10 hover:text-brand-primary transition-colors relative cursor-pointer"
                >
                    <div className="absolute top-0 right-0 w-4 h-4 bg-brand-primary text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white">{wishlist.length}</div>
                    <CiHeart size={24} />
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
                  className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-600 hover:bg-brand-primary/10 hover:text-brand-primary transition-colors relative cursor-pointer"
                >
                    <div className="absolute top-0 right-0 w-4 h-4 bg-brand-primary text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white">{cart.length}</div>
                    <PiShoppingCartSimpleLight size={24} />
                </button>
                <button
                  onClick={() => {
                    if (user) {
                      navigate('/profile')
                    } else {
                      navigate('/auth')
                    }
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-600 hover:bg-brand-primary/10 hover:text-brand-primary transition-colors cursor-pointer overflow-hidden border border-transparent hover:border-brand-primary/30"
                >
                    {user?.user_metadata?.avatar_url ? (
                      <img src={user.user_metadata.avatar_url} className="w-full h-full object-cover" alt="Profile" />
                    ) : (
                      <CiUser size={24}/>
                    )}
                </button>
            </div>
          </div>
        </div>

      </div>

    </nav>
  )
}

export default Navbar
