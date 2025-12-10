import { useEffect, useState } from 'react'
import { supabase } from '../../supabase';
import { toast } from 'sonner';

const Products = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [plants, setPlants] = useState([])

  useEffect(() => {
      const fetchPlants = async () => {
        try {
          setIsLoading(true)
  
          const {data, error} = await supabase.from('plants').select('*');
  
          if(error){
            console.error("Supabase error:", error.message);
          }else{
            setPlants(data)
          }
  
        } catch (error) {
          console.error("Unexpected error:", err);
        }finally{
          setIsLoading(false)
        }
      }
      fetchPlants()
    },[])

    const handleDelete = async (id) => {
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

        toast.success("Product deleted successfully!");

      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

  return (
    <div >
      <h1 className='text-2xl font-semibold p-4 border-b border-neutral-300'>Products</h1>

      <div className="mt-6">
        {/* Products Table */}
        {plants.map((plant) => (
          <div key={plant.id} className="p-2 rounded-lg shadow-sm mb-4 gap-4 flex justify-between items-start">
            <div className='flex gap-4'>
              <img src={plant.imgurl} alt={plant.name} className='w-6 border-r border-neutral-300 sm:w-12 md:w-16 max-w-full max-h-full object-contain'/>
              <div>
                <h3 className='font-semibold text-xs md:text-sm'>{plant.name}</h3>
                <p className='text-xs md:text-sm'>{plant.price} Tk</p>
              </div>
            </div>
            <div className='flex gap-4'>
              <button 
                // onClick={() => clearCart()}
                className="text-xs p-2 bg-black text-white rounded-md hover:bg-brand-primary duration-300 cursor-pointer">
                Edit
              </button>
              <button 
                onClick={() => handleDelete(plant.id)}
                className="text-xs p-2 text-white rounded-md bg-red-600 duration-300 cursor-pointer">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products