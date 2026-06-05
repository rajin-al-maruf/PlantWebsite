import { NavLink, Outlet, Navigate } from "react-router-dom";
import { supabase } from "../../supabase";
import { CiUser, CiShoppingTag, CiHeart, CiLogout } from "react-icons/ci";
import { toast } from "sonner";
import { useAuth } from "../../AuthContext";
import Spinner from "../../components/Spinner";

const UserProfile = () => {
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    window.location.reload(); 
  };

  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/auth" replace />;

  return (
    <div className="max-w-6xl 2xl:max-w-7xl mx-auto mt-32 px-4 md:px-6 lg:px-8 xl:px-0 min-h-[60vh] flex flex-col md:flex-row gap-8 mb-20 animate-fade-in">
      
      {/* Sidebar */}
      <div className="w-full md:w-72 shrink-0 flex flex-col gap-2">
        <div className="bg-neutral-50/80 p-6 rounded-2xl border border-neutral-100 mb-4 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center mb-3 overflow-hidden shadow-sm border border-neutral-200">
            {user?.user_metadata?.avatar_url ? (
              <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <CiUser size={28} />
            )}
          </div>
          <p className="text-xs font-bold text-brand-primary-dark truncate w-full px-2">{user?.user_metadata?.full_name || user?.email}</p>
          <span className="text-[9px] uppercase tracking-widest font-bold text-neutral-400 mt-1.5">Verified Member</span>
        </div>

        <NavLink to="/profile" end className={({ isActive }) => `flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-300 ${isActive ? "bg-brand-primary text-white shadow-md" : "text-neutral-500 hover:bg-brand-primary/10 hover:text-brand-primary"}`}>
          <CiUser size={18} /> Personal Info
        </NavLink>
        <NavLink to="/profile/orders" className={({ isActive }) => `flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-300 ${isActive ? "bg-brand-primary text-white shadow-md" : "text-neutral-500 hover:bg-brand-primary/10 hover:text-brand-primary"}`}>
          <CiShoppingTag size={18} /> My Orders
        </NavLink>
        <NavLink to="/profile/wishlist" className={({ isActive }) => `flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-300 ${isActive ? "bg-brand-primary text-white shadow-md" : "text-neutral-500 hover:bg-brand-primary/10 hover:text-brand-primary"}`}>
          <CiHeart size={18} /> My Wishlist
        </NavLink>

        <button onClick={handleLogout} className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold text-neutral-500 hover:text-red-500 hover:bg-red-50 transition-all duration-300 mt-auto md:mt-4 text-left cursor-pointer">
          <CiLogout size={18} /> Log Out
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white rounded-3xl border border-neutral-200 p-6 md:p-8 shadow-sm h-max">
        <Outlet />
      </div>
    </div>
  );
};

export default UserProfile;
