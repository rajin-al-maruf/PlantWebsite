import { NavLink } from "react-router-dom"
import { MdOutlineDashboard, MdOutlineShoppingCart, MdOutlineLogout } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { supabase } from "../supabase";
import { toast } from "sonner";

const AdminSidebar = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    window.location.reload(); 
  };

  return (
    <div className="w-64 bg-white border-r border-neutral-200 flex flex-col h-screen sticky top-0">
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

      <div className="p-4 mt-auto border-t border-neutral-100">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-neutral-500 hover:bg-red-50 hover:text-red-500 transition-all duration-300 cursor-pointer"
        >
          <MdOutlineLogout size={20}/>
          <span>Log Out</span>
        </button>
      </div>
    </div>
  )
}

export default AdminSidebar