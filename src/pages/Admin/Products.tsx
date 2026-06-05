import { useEffect, useState } from 'react'
import { supabase } from '../../supabase';
import { toast } from 'sonner';
import type { Plant } from '../../App';
import Spinner from '../../components/Spinner';
import ProductModal from '../../components/ProductModal';

const Products = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [plants, setPlants] = useState<Plant[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const ITEMS_PER_PAGE = 8;

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const fetchPlants = async () => {
    try {
      setIsLoading(true)
      const from = (page - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      const {data, error, count} = await supabase
        .from('plants')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if(error) {
        console.error("Supabase error:", error.message);
      } else {
        setPlants((data as Plant[]) || [])
        setTotalCount(count || 0)
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
      fetchPlants()
    },[page])

    const handleDelete = async (id: string) => {
      const confirmDelete = confirm("Are you sure you want to delete this product?");
      if (!confirmDelete) return;

      try {
        // Delete from Supabase
        const { error } = await supabase
          .from("plants")
          .delete()
          .eq("id", id);

        if (error) {
          console.error("Error deleting plant:", error.message);
          return;
        }

        // Remove it from UI instantly
        setPlants((prev) => prev.filter((p) => p.id !== id));
        setTotalCount((prev) => prev - 1);

        toast.success("Product deleted successfully!");

      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-primary-dark tracking-tight">Products</h1>
          <p className="text-neutral-500 mt-2 text-sm">Manage your inventory and product listings.</p>
        </div>
        <button 
          onClick={() => { setSelectedPlant(null); setIsModalOpen(true); }}
          className="bg-brand-primary hover:bg-brand-primary-dark text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-brand-primary/30 hover:-translate-y-1 cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          + Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto p-4 sm:p-8">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-widest border-b border-neutral-200">
                <th className="pb-4 font-semibold px-4">Product</th>
                <th className="pb-4 font-semibold px-4">Category</th>
                <th className="pb-4 font-semibold px-4">Price</th>
                <th className="pb-4 font-semibold px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plants.map((plant) => (
                <tr key={plant.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors group">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-neutral-100 overflow-hidden flex items-center justify-center shrink-0 p-1">
                        <img src={plant.imgurl} alt={plant.name} className="w-full h-full object-cover mix-blend-multiply" />
                      </div>
                      <span className="font-bold text-brand-primary-dark text-sm group-hover:text-brand-primary transition-colors">{plant.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-neutral-500">{plant.category}</td>
                  <td className="py-4 px-4 text-sm font-bold text-brand-primary">Tk {plant.price}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => { setSelectedPlant(plant); setIsModalOpen(true); }} className="px-4 py-2 bg-neutral-100 hover:bg-brand-primary/10 text-brand-primary-dark hover:text-brand-primary rounded-lg text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(plant.id)} className="px-4 py-2 bg-neutral-100 hover:bg-red-50 text-neutral-500 hover:text-red-500 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 p-6 border-t border-neutral-100 bg-neutral-50/50">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-full border border-neutral-200 bg-white text-sm font-medium hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx + 1)}
                className={`w-10 h-10 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  page === idx + 1
                    ? "bg-brand-primary text-white shadow-md"
                    : "text-neutral-600 hover:bg-neutral-100 bg-white border border-neutral-200"
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-full border border-neutral-200 bg-white text-sm font-medium hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialData={selectedPlant} 
        onSave={fetchPlants} 
      />
    </div>
  )
}

export default Products