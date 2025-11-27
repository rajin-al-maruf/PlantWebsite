import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const PageLayout = ({plants}) => {
  return (
    <div className='min-h-screen flex flex-col gap-40'>
        <Navbar plants={plants}/>
        <main className='flex-1'>
            <Outlet />
        </main>
        <Footer/>
    </div>
  )
}

export default PageLayout