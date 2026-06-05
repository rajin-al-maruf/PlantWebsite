import { NavLink } from "react-router-dom"
import { MdOutlineDashboard, MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-neutral-200 flex flex-col min-h-screen">
      <div className="p-6 flex items-center gap-3 mb-4">
        <img src='/assets/BonomayaLogo.jpg' className='w-10 h-10 rounded-full shadow-sm' alt="BonomayaLogo" />
        <span className="text-xl font-bold text-brand-primary-dark tracking-wide">Admin</span>
      </div>

      <div className="flex flex-col gap-2 px-4 flex-1">
        <NavLink 
          to='/admin' 
          end
          className={({ isActive }) =>
            `flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
              isActive
                ? "bg-brand-primary text-white shadow-md"
                : "text-neutral-500 hover:bg-brand-primary/10 hover:text-brand-primary"
            }`
          }
        >
          <MdOutlineDashboard size={20}/>
          <span>Dashboard</span>
        </NavLink>
        <NavLink 
          to='orders'
          className={({ isActive }) =>
            `flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
              isActive
                ? "bg-brand-primary text-white shadow-md"
                : "text-neutral-500 hover:bg-brand-primary/10 hover:text-brand-primary"
            }`
          }
        >
          <MdOutlineShoppingCart size={20}/>
          <span>Orders</span>
        </NavLink>
        <NavLink 
          to='products'
          className={({ isActive }) =>
            `flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
              isActive
                ? "bg-brand-primary text-white shadow-md"
                : "text-neutral-500 hover:bg-brand-primary/10 hover:text-brand-primary"
            }`
          }
        >
          <AiOutlineProduct size={20}/>
          <span>Products</span>
        </NavLink>
      </div>
    </div>
  )
}

export default AdminSidebar