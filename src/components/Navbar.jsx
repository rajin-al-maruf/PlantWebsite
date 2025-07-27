import React from 'react'
import logo from '../assets/BonomayaLogo.jpg'
import { CgProfile } from 'react-icons/cg'
import { CiHeart } from 'react-icons/ci'
import { PiShoppingCartSimpleLight } from 'react-icons/pi'

const Navbar = () => {
  return (
    <nav>
      <div className='flex items-center gap-2'>
        <img src={logo} className='w-14 rounded-full' alt="BonomayaLogo" />
        {/* <h1 className='text-2xl font-bold'>BONOMAYAA</h1> */}
      </div>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Track Order</li>
        <li>Contact Us</li>
      </ul>

      <div>
        <CiHeart />
        <PiShoppingCartSimpleLight/>
        <CgProfile/>
      </div>
    </nav>
  )
}

export default Navbar
