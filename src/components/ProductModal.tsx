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
  productType: string;
  galleryFiles: File[];
  existingGallery: string[];
  description: string;
  lightRequirement: string;
  waterRequirement: string;
  careLevel: string;
  availability: string;
  category: string;
}

const ProductModal = ({ isOpen, onClose, initialData, onSave }: ProductModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<ProductFormState>({
    productName: "",
    price: "",
    image: null,
    existingImageUrl: "",
    productType: "Single Plant",
    galleryFiles: [],
    existingGallery: [],
    description: "",
    lightRequirement: "",
    waterRequirement: "",
    careLevel: "",
    availability: "In Stock",
    category: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        productName: initialData.name,
        price: initialData.price.toString(),
        image: null,
        existingImageUrl: initialData.imgurl,
        productType: initialData.product_type || "Single Plant",
        galleryFiles: [],
        existingGallery: initialData.gallery || [],
        description: initialData.description,
        lightRequirement: initialData.lightrequirement,
        waterRequirement: initialData.waterrequirement,
        careLevel: initialData.carelevel,
        availability: initialData.availability,
        category: initialData.category,
      });
    } else {
      setForm({
        productName: "", price: "", image: null, existingImageUrl: "",
        productType: "Single Plant",
        galleryFiles: [],
        existingGallery: [],
        description: "", lightRequirement: "", waterRequirement: "", careLevel: "",
        availability: "In Stock", category: "",
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      // If changing product type, reset category so it doesn't hold an invalid option
      if (name === "productType") {
        return { ...prev, productType: value, category: "" };
      }
      return { ...prev, [name]: value };
    });
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

      let finalGalleryUrls = [...form.existingGallery];

      // Upload new gallery files to Supabase Storage
      for (const file of form.galleryFiles) {
        const fileName = `${Date.now()}-${file.name}`;
        const { data: fileData, error: fileError } = await supabase.storage
          .from("plant-image")
          .upload(fileName, file);

        if (fileError) throw fileError;

        const { data: publicUrlData } = supabase.storage
          .from("plant-image")
          .getPublicUrl(fileData.path);
        
        finalGalleryUrls.push(publicUrlData.publicUrl);
      }

      const payload = {
        name: form.productName,
        price: Number(form.price),
        imgurl: finalImageUrl,
        gallery: finalGalleryUrls,
        product_type: form.productType,
        description: form.description,
        lightrequirement: form.productType === 'Single Plant' ? form.lightRequirement : "N/A",
        waterrequirement: form.productType === 'Single Plant' ? form.waterRequirement : "N/A",
        carelevel: form.productType === 'Single Plant' ? form.careLevel : "N/A",
        availability: form.availability,
        category: form.category,
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
      <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl flex flex-col my-auto max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-neutral-100 flex justify-between items-center shrink-0 relative overflow-hidden rounded-t-[2rem]">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-primary to-brand-primary-light"></div>
          <h2 className="text-xl font-bold text-brand-primary-dark tracking-tight">
            {initialData ? "Edit Product" : "Add New Product"}
          </h2>
          <button onClick={onClose} disabled={isLoading} className="p-2 bg-neutral-50 hover:bg-red-50 text-neutral-400 hover:text-red-500 rounded-full transition-colors cursor-pointer">
            <IoCloseOutline size={24} />
          </button>
        </div>

        {/* Scrollable Form */}
        <div className="p-6 overflow-y-auto">
          <form id="product-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Product Name *</label>
                <input required type="text" name="productName" value={form.productName} onChange={handleFormChange} className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-brand-primary focus:bg-white transition-colors" placeholder="e.g. Monstera Deliciosa" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Price (Tk) *</label>
                <input required type="number" name="price" value={form.price} onChange={handleFormChange} className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-brand-primary focus:bg-white transition-colors" placeholder="e.g. 1200" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Product Type *</label>
                <select required name="productType" value={form.productType} onChange={handleFormChange} className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-brand-primary focus:bg-white transition-colors cursor-pointer">
                  <option value="Single Plant">Single Plant</option>
                  <option value="Combo">Combo</option>
                  <option value="Soil & Pots">Soil & Pots</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Category *</label>
                <select required name="category" value={form.category} onChange={handleFormChange} className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-brand-primary focus:bg-white transition-colors cursor-pointer">
                  <option value="" disabled>Select Category</option>
                  {form.productType === 'Combo' ? (
                    <><option value="Executive Duo">Executive Duo</option><option value="Trio">Trio</option><option value="Student Combo">Student Combo</option><option value="Desk Combo">Desk Combo</option></>
                  ) : form.productType === 'Soil & Pots' ? (
                    <><option value="Ceramic Pots">Ceramic Pots</option><option value="Plastic Pots">Plastic Pots</option><option value="Organic Soil">Organic Soil</option><option value="Fertilizers">Fertilizers</option></>
                  ) : (
                    <><option value="Foliage Plants">Foliage Plants</option><option value="Flowering Plants">Flowering Plants</option><option value="Succulents & Cacti">Succulents & Cacti</option><option value="Climbers & Vines">Climbers & Vines</option><option value="Miniature Plants">Miniature Plants</option></>
                  )}
                </select>
              </div>
              
              {form.productType === 'Single Plant' && (
                <>
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Care Level *</label>
                    <select required name="careLevel" value={form.careLevel} onChange={handleFormChange} className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-brand-primary focus:bg-white transition-colors cursor-pointer">
                      <option value="" disabled>Select Care Level</option><option value="Beginner-Friendly">Beginner-Friendly</option><option value="Intermediate">Intermediate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Water Requirement *</label>
                    <select required name="waterRequirement" value={form.waterRequirement} onChange={handleFormChange} className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-brand-primary focus:bg-white transition-colors cursor-pointer">
                      <option value="" disabled>Select Water Req.</option><option value="Low Water">Low Water</option><option value="Moderate Water">Moderate Water</option><option value="High Water">High Water</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Light Requirement *</label>
                    <select required name="lightRequirement" value={form.lightRequirement} onChange={handleFormChange} className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-brand-primary focus:bg-white transition-colors cursor-pointer">
                      <option value="" disabled>Select Light Req.</option><option value="Low Light">Low Light</option><option value="Bright Indirect Light">Bright Indirect Light</option><option value="Bright Direct Light">Bright Direct Light</option>
                    </select>
                  </div>
                </>
              )}
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Availability *</label>
                <div className="flex items-center bg-neutral-50 p-1 rounded-lg border border-neutral-200 h-10">
                  <button type="button" onClick={() => setForm(prev => ({...prev, availability: 'In Stock'}))} className={`flex-1 h-full rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${form.availability === 'In Stock' ? 'bg-white shadow-sm text-brand-primary-dark border border-neutral-200/50' : 'text-neutral-400 hover:text-neutral-600'}`}>In Stock</button>
                  <button type="button" onClick={() => setForm(prev => ({...prev, availability: 'Out Of Stock'}))} className={`flex-1 h-full rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${form.availability === 'Out Of Stock' ? 'bg-white shadow-sm text-red-600 border border-neutral-200/50' : 'text-neutral-400 hover:text-neutral-600'}`}>Out Of Stock</button>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Description *</label>
              <textarea required name="description" value={form.description} onChange={handleFormChange} rows={3} className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-brand-primary focus:bg-white transition-colors resize-none" placeholder="Provide a detailed description of the plant..."></textarea>
            </div>
            
            <div className="flex items-center gap-5 pt-2">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-neutral-50 border border-neutral-200 overflow-hidden flex items-center justify-center shrink-0 shadow-sm p-1">
                {form.image ? (
                  <img src={URL.createObjectURL(form.image)} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                ) : initialData?.imgurl ? (
                  <img src={initialData.imgurl} alt="Current" className="w-full h-full object-cover rounded-lg mix-blend-multiply" />
                ) : (
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest text-center leading-tight">No<br/>Image</span>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Product Image {!initialData && "*"}</label>
                <input type="file" accept="image/*" onChange={(e) => setForm(prev => ({ ...prev, image: e.target.files?.[0] || null }))} className="text-[10px] sm:text-xs text-neutral-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:sm:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20 transition-all cursor-pointer w-full" />
                {initialData && !form.image && (
                  <p className="text-[10px] text-neutral-400 mt-2 flex items-center gap-1.5">
                    <i>ⓘ</i> Current image will be kept if no new file is selected.
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2 border-t border-neutral-100">
              <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Product Gallery (Optional)</label>
              <input type="file" multiple accept="image/*" onChange={(e) => setForm(prev => ({ ...prev, galleryFiles: [...prev.galleryFiles, ...Array.from(e.target.files || [])] }))} className="text-[10px] sm:text-xs text-neutral-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:sm:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20 transition-all cursor-pointer w-full" />
              
              {(form.existingGallery.length > 0 || form.galleryFiles.length > 0) && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {form.existingGallery.map((url, idx) => (
                    <div key={`existing-${idx}`} className="relative w-14 h-14 shrink-0 rounded-xl bg-neutral-50 border border-neutral-200 overflow-hidden group p-1">
                      <img src={url} alt="Gallery" className="w-full h-full object-cover rounded-lg mix-blend-multiply" />
                      <button type="button" onClick={() => setForm(prev => ({ ...prev, existingGallery: prev.existingGallery.filter((_, i) => i !== idx) }))} className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <IoCloseOutline size={20} />
                      </button>
                    </div>
                  ))}
                  {form.galleryFiles.map((file, idx) => (
                    <div key={`file-${idx}`} className="relative w-14 h-14 shrink-0 rounded-xl bg-neutral-50 border border-neutral-200 overflow-hidden group p-1">
                      <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                      <button type="button" onClick={() => setForm(prev => ({ ...prev, galleryFiles: prev.galleryFiles.filter((_, i) => i !== idx) }))} className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <IoCloseOutline size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50 flex justify-end gap-3 shrink-0 rounded-b-[2rem]">
          <button type="button" onClick={onClose} disabled={isLoading} className="px-5 py-2 rounded-full text-xs font-bold text-neutral-500 hover:text-neutral-700 hover:bg-neutral-200 transition-colors cursor-pointer">
            Cancel
          </button>
          <button form="product-form" type="submit" disabled={isLoading} className="px-6 py-2 bg-brand-primary hover:bg-brand-primary-dark transition-all duration-300 text-white rounded-full font-bold uppercase tracking-widest text-[10px] shadow-sm hover:-translate-y-0.5 cursor-pointer disabled:opacity-50">
            {isLoading ? "Saving..." : "Save Product"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductModal;