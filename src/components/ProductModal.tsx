import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { supabase } from "../supabase";
import { toast } from "sonner";
import { IoCloseOutline } from "react-icons/io5";
import type { Plant } from "../App";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: Plant | null;
  onSave: () => void;
}

interface ProductFormState {
  productName: string;
  price: string;
  image: File | null;
  existingImageUrl: string;
  description: string;
  lightRequirement: string;
  waterRequirement: string;
  careLevel: string;
  availability: string;
  category: string;
  stock: string;
}

const ProductModal = ({ isOpen, onClose, initialData, onSave }: ProductModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<ProductFormState>({
    productName: "",
    price: "",
    image: null,
    existingImageUrl: "",
    description: "",
    lightRequirement: "",
    waterRequirement: "",
    careLevel: "",
    availability: "In Stock",
    category: "",
    stock: "1",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        productName: initialData.name,
        price: initialData.price.toString(),
        image: null,
        existingImageUrl: initialData.imgurl,
        description: initialData.description,
        lightRequirement: initialData.lightrequirement,
        waterRequirement: initialData.waterrequirement,
        careLevel: initialData.carelevel,
        availability: initialData.availability,
        category: initialData.category,
        stock: initialData.stock.toString(),
      });
    } else {
      setForm({
        productName: "", price: "", image: null, existingImageUrl: "",
        description: "", lightRequirement: "", waterRequirement: "", careLevel: "",
        availability: "In Stock", category: "", stock: "1",
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let finalImageUrl = form.existingImageUrl;

      // If user uploaded a new image, push it to Supabase Storage
      if (form.image) {
        const fileName = `${Date.now()}-${form.image.name}`;
        const { data: imageData, error: imageError } = await supabase.storage
          .from("plant-image")
          .upload(fileName, form.image);

        if (imageError) throw imageError;

        const { data: publicUrlData } = supabase.storage
          .from("plant-image")
          .getPublicUrl(imageData.path);
        
        finalImageUrl = publicUrlData.publicUrl;
      }

      if (!finalImageUrl) {
        toast.error("Please provide a product image.");
        setIsLoading(false);
        return;
      }

      const payload = {
        name: form.productName,
        price: Number(form.price),
        imgurl: finalImageUrl,
        description: form.description,
        lightrequirement: form.lightRequirement,
        waterrequirement: form.waterRequirement,
        carelevel: form.careLevel,
        availability: form.availability,
        category: form.category,
        stock: Number(form.stock),
      };

      if (initialData) {
        // Update existing product
        const { error } = await supabase.from("plants").update(payload).eq("id", initialData.id);
        if (error) throw error;
        toast.success("Product updated successfully!");
      } else {
        // Insert new product
        const { error } = await supabase.from("plants").insert([payload]);
        if (error) throw error;
        toast.success("Product added successfully!");
      }

      onSave(); // Trigger data refresh in parent
      onClose(); // Close Modal
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl flex flex-col my-auto max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-8 py-6 border-b border-neutral-100 flex justify-between items-center shrink-0">
          <h2 className="text-2xl font-bold text-brand-primary-dark tracking-tight">
            {initialData ? "Edit Product" : "Add New Product"}
          </h2>
          <button onClick={onClose} disabled={isLoading} className="p-2 bg-neutral-50 hover:bg-red-50 text-neutral-400 hover:text-red-500 rounded-full transition-colors cursor-pointer">
            <IoCloseOutline size={24} />
          </button>
        </div>

        {/* Scrollable Form */}
        <div className="p-8 overflow-y-auto">
          <form id="product-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Product Name *</label>
                <input required type="text" name="productName" value={form.productName} onChange={handleFormChange} className="w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-brand-primary" />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Price (Tk) *</label>
                <input required type="number" name="price" value={form.price} onChange={handleFormChange} className="w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-brand-primary" />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Category *</label>
                <select required name="category" value={form.category} onChange={handleFormChange} className="w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-brand-primary cursor-pointer">
                  <option value="" disabled>Select Category</option><option value="Foliage Plants">Foliage Plants</option><option value="Flowering Plants">Flowering Plants</option><option value="Succulents & Cacti">Succulents & Cacti</option><option value="Climbers & Vines">Climbers & Vines</option><option value="Miniature Plants">Miniature Plants</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Care Level *</label>
                <select required name="careLevel" value={form.careLevel} onChange={handleFormChange} className="w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-brand-primary cursor-pointer">
                  <option value="" disabled>Select Care Level</option><option value="Beginner-Friendly">Beginner-Friendly</option><option value="Intermediate">Intermediate</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Water Requirement *</label>
                <select required name="waterRequirement" value={form.waterRequirement} onChange={handleFormChange} className="w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-brand-primary cursor-pointer">
                  <option value="" disabled>Select Water Req.</option><option value="Low Water">Low Water</option><option value="Moderate Water">Moderate Water</option><option value="High Water">High Water</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Light Requirement *</label>
                <select required name="lightRequirement" value={form.lightRequirement} onChange={handleFormChange} className="w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-brand-primary cursor-pointer">
                  <option value="" disabled>Select Light Req.</option><option value="Low Light">Low Light</option><option value="Bright Indirect Light">Bright Indirect Light</option><option value="Bright Direct Light">Bright Direct Light</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Description *</label>
              <textarea required name="description" value={form.description} onChange={handleFormChange} rows={3} className="w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-brand-primary"></textarea>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Product Image {!initialData && "*"}</label>
              <input type="file" onChange={(e) => setForm(prev => ({ ...prev, image: e.target.files?.[0] || null }))} className="w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-brand-primary cursor-pointer" />
              {initialData && !form.image && (
                <p className="text-xs text-neutral-400 mt-2 flex items-center gap-2">
                  <img src={initialData.imgurl} className="w-6 h-6 rounded-md object-cover"/> Current image will be kept if no new file is selected.
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-5 border-t border-neutral-100 bg-neutral-50 flex justify-end gap-3 shrink-0 rounded-b-[2.5rem]">
          <button type="button" onClick={onClose} disabled={isLoading} className="px-6 py-2.5 rounded-full text-sm font-bold text-neutral-500 hover:text-neutral-700 hover:bg-neutral-200 transition-colors cursor-pointer">
            Cancel
          </button>
          <button form="product-form" type="submit" disabled={isLoading} className="px-8 py-2.5 bg-brand-primary hover:bg-brand-primary-dark transition-all duration-300 text-white rounded-full font-bold uppercase tracking-widest text-xs shadow-md hover:-translate-y-0.5 cursor-pointer disabled:opacity-50">
            {isLoading ? "Saving..." : "Save Product"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductModal;