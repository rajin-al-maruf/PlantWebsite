import { useEffect, useState } from 'react'
import { supabase } from '../../supabase';
import { toast } from 'sonner';
import type { Plant } from '../../App';
import ProductModal from '../../components/ProductModal';
import { CiSearch } from 'react-icons/ci';

const Products = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [plants, setPlants] = useState<Plant[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const ITEMS_PER_PAGE = 8;

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Debounce the search input so it doesn't spam Supabase on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1); // Reset to first page on new search
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchPlants = async () => {
    try {
      setIsLoading(true)
      const from = (page - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      let query = supabase
        .from('plants')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (debouncedQuery) {
        query = query.ilike('name', `%${debouncedQuery}%`);
      }

      const {data, error, count} = await query;

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
    },[page, debouncedQuery])

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

  return (
    <div className="animate-fade-in">
      {/* Header & Search */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8">
        <div className="shrink-0">
          <h1 className="text-3xl font-bold text-brand-primary-dark tracking-tight">Products</h1>
          <p className="text-neutral-500 mt-2 text-sm">Manage your inventory and product listings.</p>
        </div>

        {/* Search Bar */}
        <div className="flex-1 w-full md:max-w-2xl xl:px-8">
          <div className="flex items-center bg-transparent rounded-2xl px-4 py-3 border border-neutral-200/70 focus-within:border-brand-primary focus-within:ring-4 focus-within:ring-brand-primary/10 transition-all w-full">
            <CiSearch size={22} className="text-neutral-400 mr-3 shrink-0" />
            <input
              type="text"
              placeholder="Search products by name..."
              className="w-full bg-transparent border-none outline-none text-sm text-brand-primary-dark placeholder:text-neutral-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <button 
          onClick={() => { setSelectedPlant(null); setIsModalOpen(true); }}
          className="bg-brand-primary hover:bg-brand-primary-dark text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-brand-primary/30 hover:-translate-y-1 cursor-pointer flex items-center justify-center gap-2 w-full xl:w-auto shrink-0"
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
                <th className="pb-4 font-semibold px-4">Availability</th>
                <th className="pb-4 font-semibold px-4">Price</th>
                <th className="pb-4 font-semibold px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-16">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-primary border-solid"></div>
                    </div>
                  </td>
                </tr>
              ) : plants.length > 0 ? plants.map((plant) => (
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
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      plant.availability === 'In Stock' 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {plant.availability === 'In Stock' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>}
                      {plant.availability}
                    </span>
                  </td>
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
              )) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-sm text-neutral-500">No products found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        {!isLoading && totalPages > 1 && (
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