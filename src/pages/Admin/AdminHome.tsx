import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import Spinner from "../../components/Spinner";
import { MdAttachMoney, MdOutlineShoppingCart, MdOutlineLocalFlorist, MdOutlineTaskAlt } from "react-icons/md";

interface Order {
  id: string | number;
  customer_name: string;
  total_amount: number;
  order_status: string;
  created_at: string;
}

const AdminHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ revenue: 0, orders: 0, products: 0, completedOrders: 0 });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Fetch total products count
        const { count: productsCount } = await supabase
          .from("plants")
          .select("*", { count: "exact", head: true });

        // Fetch orders for revenue, total count, and recent list
        const { data: ordersData } = await supabase
          .from("orders")
          .select("id, customer_name, total_amount, order_status, created_at")
          .order("created_at", { ascending: false });

        let totalRevenue = 0;
        let completedCount = 0;
        if (ordersData) {
          totalRevenue = ordersData.reduce((acc, order) => {
            if (order.order_status === 'cancelled') return acc;
            return acc + (order.total_amount || 0);
          }, 0);
          completedCount = ordersData.filter(order => order.order_status === 'delivered').length;
          setRecentOrders(ordersData.slice(0, 5)); // Keep only the 5 most recent
        }

        setStats({
          revenue: totalRevenue,
          orders: ordersData?.length || 0,
          products: productsCount || 0,
          completedOrders: completedCount,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className="animate-fade-in">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-primary-dark tracking-tight">Dashboard Overview</h1>
          <p className="text-neutral-500 mt-2 text-sm">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div className="text-sm font-medium text-brand-primary-dark bg-white px-5 py-2.5 rounded-full border border-neutral-200 shadow-sm flex items-center gap-2 w-max">
          <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
          {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-gradient-to-br from-brand-primary-dark to-brand-primary p-6 md:p-8 rounded-[2rem] shadow-lg shadow-brand-primary/20 flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors duration-500 pointer-events-none"></div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md mb-4 relative z-10">
            <MdAttachMoney size={28} />
          </div>
          <div className="relative z-10 mt-2">
            <p className="text-xs font-bold text-brand-primary-light uppercase tracking-widest mb-1">Total Revenue</p>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white">Tk {stats.revenue.toLocaleString()}</h3>
          </div>
        </div>
        <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-neutral-100 shadow-sm hover:shadow-md flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
          <div className="w-12 h-12 bg-brand-secondary/10 rounded-full flex items-center justify-center text-brand-secondary-dark mb-4">
            <MdOutlineShoppingCart size={24} />
          </div>
          <div className="mt-2">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Total Orders</p>
            <h3 className="text-3xl md:text-4xl font-extrabold text-brand-primary-dark">{stats.orders}</h3>
          </div>
        </div>
        <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-neutral-100 shadow-sm hover:shadow-md flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
          <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-600 mb-4">
            <MdOutlineTaskAlt size={24} />
          </div>
          <div className="mt-2">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Completed</p>
            <h3 className="text-3xl md:text-4xl font-extrabold text-brand-primary-dark">{stats.completedOrders}</h3>
          </div>
        </div>
        <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-neutral-100 shadow-sm hover:shadow-md flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
          <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mb-4">
            <MdOutlineLocalFlorist size={24} />
          </div>
          <div className="mt-2">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Total Products</p>
            <h3 className="text-3xl md:text-4xl font-extrabold text-brand-primary-dark">{stats.products}</h3>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
          <h2 className="text-xl font-bold text-brand-primary-dark">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto p-6 sm:p-8 pt-0">
          <table className="w-full text-left border-collapse mt-4">
            <thead>
              <tr className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-widest border-b border-neutral-200">
                <th className="pb-4 font-semibold px-2">Customer</th>
                <th className="pb-4 font-semibold px-2">Date</th>
                <th className="pb-4 font-semibold px-2">Status</th>
                <th className="pb-4 font-semibold text-right px-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length > 0 ? recentOrders.map((order, idx) => (
                <tr key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors group">
                  <td className="py-5 px-2 text-sm font-bold text-brand-primary-dark group-hover:text-brand-primary transition-colors">{order.customer_name}</td>
                  <td className="py-5 px-2 text-sm text-neutral-500">{new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  <td className="py-5 px-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      order.order_status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                      order.order_status === 'delivered' ? 'bg-green-50 text-green-700 border-green-200' :
                      order.order_status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                      'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                      {order.order_status === 'pending' && <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-2 animate-pulse"></span>}
                      {order.order_status}
                    </span>
                  </td>
                  <td className="py-5 px-2 text-sm font-bold text-brand-primary-dark text-right">Tk {order.total_amount.toLocaleString()}</td>
                </tr>
              )) : (
                <tr><td colSpan={4} className="py-12 text-center text-sm text-neutral-500">No orders found yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;