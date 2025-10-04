import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const PageLayout = () => {
  return (
    <div className='min-h-screen flex flex-col'>
        <Navbar />
        <main className='flex-1'>
            <Outlet />
        </main>
        <Footer/>
    </div>
  )
}

export default PageLayout