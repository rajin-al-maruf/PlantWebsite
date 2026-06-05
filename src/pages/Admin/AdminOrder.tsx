import { useEffect, useState, Fragment } from "react";
import { supabase } from "../../supabase";
import Spinner from "../../components/Spinner";
import { toast } from "sonner";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";

interface OrderItem {
  id: string | number;
  quantity: number;
  price?: number;
  plant_id?: string | number;
  plants?: {
    name: string;
    imgurl: string;
  };
  plant_name?: string;
}

interface Order {
  id: string | number;
  customer_name: string;
  total_amount: number;
  order_status: string;
  created_at: string;
  phone_number?: string;
  shipping_address?: string;
  customer_phone?: string;
  customer_address?: string;
  order_items?: OrderItem[];
}

const AdminOrders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | number | null>(null);
  
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const ITEMS_PER_PAGE = 10;
  
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const from = (page - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      const { data, count, error } = await supabase
        .from("orders")
        .select("*, order_items(*, plants(name, imgurl))", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data as Order[]);
        setTotalCount(count || 0);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const handleStatusChange = async (orderId: string | number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ order_status: newStatus })
        .eq("id", orderId);

      if (error) throw error;

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, order_status: newStatus } : order
        )
      );
      toast.success("Order status updated!");
    } catch (error: any) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };

  if (isLoading && orders.length === 0) return <Spinner />;

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-primary-dark tracking-tight">Orders</h1>
          <p className="text-neutral-500 mt-2 text-sm">Manage and fulfill your customer orders.</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto p-4 sm:p-8">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-widest border-b border-neutral-200">
                <th className="pb-4 font-semibold px-4">Order ID</th>
                <th className="pb-4 font-semibold px-4">Customer</th>
                <th className="pb-4 font-semibold px-4">Date</th>
                <th className="pb-4 font-semibold px-4 text-right">Amount</th>
                <th className="pb-4 font-semibold px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? orders.map((order) => (
                <Fragment key={order.id}>
                  <tr className={`border-b border-neutral-100 hover:bg-neutral-50 transition-colors group ${expandedOrder === order.id ? 'bg-neutral-50' : ''}`}>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => setExpandedOrder(prev => prev === order.id ? null : order.id)} className="p-1 rounded-full bg-white border border-neutral-200 shadow-sm hover:bg-brand-primary/10 hover:text-brand-primary transition-colors cursor-pointer">
                          {expandedOrder === order.id ? <MdOutlineExpandLess size={16} /> : <MdOutlineExpandMore size={16} />}
                        </button>
                        <span className="text-sm font-medium text-neutral-500">#{String(order.id).substring(0, 8)}</span>
                      </div>
                    </td>
                  <td className="py-4 px-4">
                    <p className="font-bold text-brand-primary-dark text-sm">{order.customer_name}</p>
                    {(order.phone_number || order.customer_phone) && <p className="text-xs text-neutral-400 mt-0.5">{order.phone_number || order.customer_phone}</p>}
                  </td>
                  <td className="py-4 px-4 text-sm text-neutral-500">
                    {new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="py-4 px-4 text-sm font-bold text-brand-primary text-right">Tk {order.total_amount.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <select
                      value={order.order_status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl border outline-none cursor-pointer transition-colors ${
                        order.order_status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 focus:border-yellow-400' :
                        order.order_status === 'shipped' ? 'bg-blue-50 text-blue-700 border-blue-200 focus:border-blue-400' :
                        order.order_status === 'delivered' ? 'bg-green-50 text-green-700 border-green-200 focus:border-green-400' :
                        'bg-red-50 text-red-700 border-red-200 focus:border-red-400'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
                
                {/* Expanded Details Row */}
                {expandedOrder === order.id && (
                  <tr className="bg-neutral-50/80 border-b border-neutral-200">
                    <td colSpan={5} className="p-6 sm:px-8">
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                          <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-3">Order Items</h4>
                          <div className="flex flex-col gap-2">
                            {order.order_items && order.order_items.length > 0 ? (
                              order.order_items.map((item, idx) => (
                                <div key={item.id || idx} className="flex items-center gap-4 bg-white p-3 rounded-xl border border-neutral-100 shadow-sm">
                                  {item.plants?.imgurl ? (
                                    <img src={item.plants.imgurl} alt="plant" className="w-12 h-12 rounded-lg object-cover" />
                                  ) : (
                                    <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center text-xs text-neutral-400">Img</div>
                                  )}
                                  <div className="flex-1">
                                    <p className="text-sm font-bold text-brand-primary-dark">{item.plants?.name || item.plant_name || `Item #${item.plant_id}`}</p>
                                    <p className="text-xs text-neutral-500 mt-0.5">Qty: {item.quantity} × Tk {item.price || 0}</p>
                                  </div>
                                  <div className="text-sm font-bold text-brand-primary">
                                    Tk {((item.quantity || 1) * (item.price || 0)).toLocaleString()}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-neutral-500 italic">No items found for this order.</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="w-full md:w-72 flex flex-col gap-6">
                          <div>
                            <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Customer & Shipping</h4>
                            <div className="bg-white p-4 rounded-xl border border-neutral-100 shadow-sm flex flex-col gap-2">
                              <p className="text-sm font-bold text-brand-primary-dark">{order.customer_name}</p>
                              <p className="text-sm text-neutral-600">📞 {order.phone_number || order.customer_phone || <span className="italic text-neutral-400">No phone provided</span>}</p>
                              <div className="w-full h-px bg-neutral-100 my-1"></div>
                              <p className="text-sm text-neutral-600 leading-relaxed">{order.shipping_address || order.customer_address || <span className="italic text-neutral-400">No address provided</span>}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
              )) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-sm text-neutral-500">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 p-6 border-t border-neutral-100 bg-neutral-50/50">
            <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1} className="px-4 py-2 rounded-full border border-neutral-200 bg-white text-sm font-medium hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer">Previous</button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button key={idx} onClick={() => setPage(idx + 1)} className={`w-10 h-10 rounded-full text-sm font-medium transition-colors cursor-pointer ${page === idx + 1 ? "bg-brand-primary text-white shadow-md" : "text-neutral-600 hover:bg-neutral-100 bg-white border border-neutral-200"}`}>{idx + 1}</button>
            ))}
            <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages} className="px-4 py-2 rounded-full border border-neutral-200 bg-white text-sm font-medium hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer">Next</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;