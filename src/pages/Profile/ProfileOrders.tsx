import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { useAuth } from "../../AuthContext";
import Spinner from "../../components/Spinner";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { Link } from "react-router-dom";

const ProfileOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<any>(null);

  useEffect(() => {
    if (!user?.id) return;
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*, plants(name, imgurl))")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setOrders(data);
      }
      setLoading(false);
    };
    fetchOrders();
  }, [user]);

  if (loading) return <div className="h-40 flex items-center justify-center"><Spinner /></div>;

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl md:text-2xl font-bold text-brand-primary-dark tracking-tight mb-6">Order History</h2>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col items-center">
          <p className="text-neutral-500 text-sm mb-4">You haven't placed any orders yet.</p>
          <Link to="/shop">
            <button className="px-6 py-3 bg-brand-primary hover:bg-brand-primary-dark transition-all duration-300 text-white rounded-full font-bold uppercase tracking-widest text-[10px] shadow-sm hover:-translate-y-0.5 cursor-pointer">
              Start Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div 
                className="p-4 md:p-6 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 cursor-pointer bg-neutral-50/50 hover:bg-brand-primary/5 transition-colors group"
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              >
                <div className="flex items-center gap-5">
                  <button className="w-8 h-8 rounded-full bg-white border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-400 group-hover:text-brand-primary group-hover:border-brand-primary/30 transition-all shrink-0">
                    {expandedOrder === order.id ? <MdOutlineExpandLess size={18} /> : <MdOutlineExpandMore size={18} />}
                  </button>
                  <div>
                    <p className="text-xs md:text-sm font-bold text-brand-primary-dark group-hover:text-brand-primary transition-colors">Order #{String(order.id).substring(0, 8)}</p>
                    <p className="text-[10px] sm:text-xs text-neutral-500 mt-0.5">{new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t border-neutral-200 sm:border-0 pt-3 sm:pt-0">
                  <div className="text-left sm:text-right">
                    <p className="text-[9px] text-neutral-400 uppercase tracking-widest font-bold mb-1">Status</p>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${order.order_status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : order.order_status === 'shipped' ? 'bg-blue-50 text-blue-700 border-blue-200' : order.order_status === 'delivered' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                        {order.order_status}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-neutral-400 uppercase tracking-widest font-bold mb-1">Total</p>
                    <p className="text-xs md:text-sm font-extrabold text-brand-primary-dark">Tk {order.total_amount.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {expandedOrder === order.id && (
                <div className="bg-white p-4 md:p-6 border-t border-neutral-200">
                   <h4 className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-3">Order Items</h4>
                   <div className="flex flex-col gap-2">
                     {order.order_items?.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 p-2 rounded-xl border border-neutral-100 bg-neutral-50/50">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1 border border-neutral-100 shrink-0">
                            <img src={item.plants?.imgurl} alt="plant" className="w-full h-full object-cover mix-blend-multiply" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-bold text-brand-primary-dark">{item.plants?.name || `Item #${item.product_id}`}</p>
                            <p className="text-[10px] text-neutral-500 mt-0.5">Qty: {item.quantity} × Tk {item.price}</p>
                          </div>
                          <div className="text-xs font-bold text-brand-primary pr-2">Tk {(item.quantity * item.price).toLocaleString()}</div>
                        </div>
                     ))}
                   </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileOrders;
