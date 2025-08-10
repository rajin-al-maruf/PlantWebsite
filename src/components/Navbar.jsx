import React, { useState } from 'react'
import logo from '../assets/BonomayaLogo.jpg'
import { CiHeart, CiSearch, CiUser } from 'react-icons/ci'
import { PiShoppingCartSimpleLight } from 'react-icons/pi'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { IoCloseOutline } from 'react-icons/io5'

const Navbar = () => {

  const [nav, setNav] = useState(false)
  console.log(nav)

  return (
    <nav className='absolute w-full z-50 mt-4 px-4 md:px-6 lg:px-8 2xl:px-0'>

          <div className='block sm:hidden'>
          <div className='flex items-center justify-between'>
            <button 
              onClick={() => setNav(true)}
              className='cursor-pointer'
            >
              <HiOutlineMenuAlt2 size={20} />
            </button>
            <div className='flex gap-2'>
              <button className='h-8 md:w-10 w-8 md:h-10 relative bg-brand-accent text-brand-primary rounded-full flex items-center justify-center cursor-pointer'>
                <div className='min-w-4 h-4 px-[2px] text-[8px] md:text-[10px] leading-none top-0 right-0 bg-brand-primary border-brand-primary-dark text-brand-accent rounded-full absolute flex items-center justify-center'>5</div>
                <PiShoppingCartSimpleLight size={20}/>
              </button>
              <button className='h-8 md:w-10 w-8 md:h-10 bg-brand-accent text-brand-primary rounded-full flex items-center justify-center cursor-pointer'>
                <CiUser size={20}/>
              </button>
            </div>
          </div>
          <div className={nav?
                  'fixed w-full h-screen top-0 left-0 p-4 bg-brand-primary-light ease-in-out duration-500 z-50'
                : 'fixed top-0 -left-full w-full h-screen p-4 bg-brand-primary-light ease-in-out duration-500 z-50'
            }
          >
          <button
            onClick={() => setNav(false)}
            className="absolute top-4 right-6 hover:text-brand-accent cursor-pointer"
          >
            <IoCloseOutline size={28} />
          </button>
          <img src={logo} className='w-14 mt-6 rounded-full' alt="BonomayaLogo" />
          <ul className='flex flex-col mt-8 gap-4 md:gap-6'>
            <li className='cursor-pointer pb-4 border-b border-b-brand-primary text-brand-primary-dark hover:text-brand-accent font-semibold '>Home</li>
            <li className='cursor-pointer pb-4 border-b border-b-brand-primary text-brand-primary-dark hover:text-brand-accent font-semibold '>Shop</li>
            <li className='cursor-pointer pb-4 border-b border-b-brand-primary text-brand-primary-dark hover:text-brand-accent font-semibold '>About</li>
            <li className='cursor-pointer pb-4 border-b border-b-brand-primary text-brand-primary-dark hover:text-brand-accent font-semibold '>Track Order</li>
            <li className='cursor-pointer pb-4 text-brand-primary-dark hover:text-brand-accent font-semibold '>Contact</li>
          </ul>
        </div>
      </div>


      <div className='max-w-7xl mx-auto sm:flex items-center justify-between hidden'>

        <div className='flex items-center gap-12 md:gap-20'>
          <img src={logo} className='w-14 rounded-full' alt="BonomayaLogo" />
          <ul className='flex gap-4 md:gap-6 lg:gap-8'>
            <li className='cursor-pointer text-brand-primary-dark hover:text-brand-primary text-xs md:text-sm font-semibold'>Home</li>
            <li className='cursor-pointer text-brand-primary-dark hover:text-brand-primary text-xs md:text-sm font-semibold'>Shop</li>
            <li className='cursor-pointer text-brand-primary-dark hover:text-brand-primary text-xs md:text-sm font-semibold'>About</li>
            <li className='cursor-pointer text-brand-primary-dark hover:text-brand-primary text-xs md:text-sm font-semibold'>Track Order</li>
            <li className='cursor-pointer text-brand-primary-dark hover:text-brand-primary text-xs md:text-sm font-semibold'>Contact</li>
          </ul>
        </div>

        <div className='flex gap-4'>
          <button className='h-8 md:w-10 w-8 md:h-10 bg-brand-accent text-brand-primary rounded-full flex items-center justify-center cursor-pointer'>
            <CiSearch size={20}/>
          </button>
          <button className='h-8 md:w-10 w-8 md:h-10 relative bg-brand-accent text-brand-primary rounded-full flex items-center justify-center cursor-pointer'>
          <div className='min-w-4 h-4 px-[2px] text-[8px] md:text-[10px] leading-none top-0 right-0 bg-brand-primary border-brand-primary-dark text-brand-accent rounded-full absolute flex items-center justify-center'>234</div>
            <CiHeart size={20}/>
          </button>
          <button className='h-8 md:w-10 w-8 md:h-10 relative bg-brand-accent text-brand-primary rounded-full flex items-center justify-center cursor-pointer'>
          <div className='min-w-4 h-4 px-[2px] text-[8px] md:text-[10px] leading-none top-0 right-0 bg-brand-primary border-brand-primary-dark text-brand-accent rounded-full absolute flex items-center justify-center'>5</div>
            <PiShoppingCartSimpleLight size={20}/>
          </button>
          <button className='h-8 md:w-10 w-8 md:h-10 bg-brand-accent text-brand-primary rounded-full flex items-center justify-center cursor-pointer'>
            <CiUser size={20}/>
          </button>
        </div>

      </div>

    </nav>
  )
}

export default Navbar
