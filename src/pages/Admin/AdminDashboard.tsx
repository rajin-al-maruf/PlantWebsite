import AdminSidebar from '../../components/AdminSidebar'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div className='flex min-h-screen'>
      <AdminSidebar/>
      <main className="flex-1 bg-neutral-50 min-h-screen">
        <div className='p-8 md:p-10 lg:p-12 pb-32'>
          <Outlet/>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard