import React from 'react'
import AdminSidebar from '../../components/AdminSidebar'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer.jsx'

const AdminDashboard = () => {
  return (
    <div className='flex min-h-screen'>
      <AdminSidebar/>
      <main className="flex-1">
        <div className='px-6 py-4 pb-32 bg-neutral-100'>
          <Outlet/>
        </div>
        <Footer />
      </main>
    </div>
  )
}

export default AdminDashboard