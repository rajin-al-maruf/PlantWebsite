import { useState } from "react"
import { supabase } from "../../supabase";

const AddProducts = () => {

  const [addProductForm, setAddProductForm] = useState({
    productName: "",
    price: "",
    image: null,
    description: "",
    lightRequirement: "",
    waterRequirement: "",
    careLevel: "",
    availability: "In Stock",
    category: "",
    stock: "1",
  })
  const handleFormChange = (e) => {
      setAddProductForm((prev) => ({
          ...prev,
          [e.target.name]: e.target.value
      }))
  }
  console.log(addProductForm)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fileName = `${Date.now()}-${addProductForm.image.name}`;
      console.log(fileName);
      const { data: imageData, error: imageError } = await supabase.storage
        .from("plant-image")
        .upload(fileName, addProductForm.image); 

      if (imageError) throw imageError;
      console.log("Image uploaded:", imageData);

      // get public url (optional)
      const { data: publicUrlData } = supabase.storage
        .from("plant-image")
        .getPublicUrl(imageData.path);

      console.log("Public URL:", publicUrlData.publicUrl);

      // Now you can save the product details along with the image URL to your database 

      const { error: insertError } = await supabase
        .from("plants")
        .insert([
          {
            name: addProductForm.productName,
            price: addProductForm.price,
            imgurl: publicUrlData.publicUrl,
            description: addProductForm.description,
            lightrequirement: addProductForm.lightRequirement,
            waterrequirement: addProductForm.waterRequirement,
            carelevel: addProductForm.careLevel,
            availability: addProductForm.availability,
            category: addProductForm.category,
            stock: addProductForm.stock,
          },
        ]);

      if (insertError) throw insertError;
      console.log("Product inserted");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div >
      <h1 className='text-2xl font-semibold p-4 border-b border-neutral-300'>Add Product</h1>

      <div className="grid xl:grid-cols-2 gap-10 mt-6">

        <div className="p-6 bg-white rounded-xl">
          <div>
            <label className='block text-sm font-medium mb-2'>Product Name <span className='text-red-600'>*</span></label>
            <input
              type="text"
              name="productName"
              value={addProductForm.productName}
              onChange={handleFormChange}
              className='w-full p-3 border border-neutral-300 text-sm text-neutral-600 focus:outline-brand-primary-light'
            />
          </div>
          <div className="mt-6">
            <label className='block text-sm font-medium mb-2'>Price <span className='text-red-600'>*</span></label>
            <input 
              type="text"
              name="price"
              value={addProductForm.price}
              onChange={handleFormChange}
              className='w-full p-3 border border-neutral-300 text-sm text-neutral-600 focus:outline-brand-primary-light'
            />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-6">
            <div>
              <label className='block text-sm font-medium mb-2'>Category <span className='text-red-600'>*</span></label>
              <select
                name="category"
                value={addProductForm.category}
                onChange={handleFormChange}
                className='w-full p-3 border border-neutral-300 text-sm text-neutral-600 focus:outline-brand-primary-light outline-none'
              >
                <option value="Category">Category</option>
                <option value="Foliage Plants">Foliage Plants</option>
                <option value="Flowering Plants">Flowering Plants</option>
                <option value="Succulents & Cacti">Succulents & Cacti</option>
                <option value="Climbers & Vines">Climbers & Vines</option>
                <option value="Miniature Plants">Miniature Plants</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium mb-2'>Care Level <span className='text-red-600'>*</span></label>
              <select 
                name="careLevel"
                value={addProductForm.careLevel}
                onChange={handleFormChange}
                className='w-full p-3 border border-neutral-300 text-sm text-neutral-600 focus:outline-brand-primary-light outline-none'
              >
                <option value="Care Level">Care Level</option>
                <option value="Beginner-Friendly">Beginner-Friendly</option>
                <option value="Intermediate">Intermediate</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 mt-6">
            <div>
              <label className='block text-sm font-medium mb-2'>Water Requirement <span className='text-red-600'>*</span></label>
              <select 
                name="waterRequirement"
                value={addProductForm.waterRequirement}
                onChange={handleFormChange}
                className='w-full p-3 border border-neutral-300 text-sm text-neutral-600 focus:outline-brand-primary-light outline-none'
              >
                <option value="Water Requirement">Water Requirement</option>
                <option value="Low Water">Low Water</option>
                <option value="Moderate Water">Moderate Water</option>
                <option value="High Water">High Water</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium mb-2'>Light Requirement <span className='text-red-600'>*</span></label>
              <select 
                name="lightRequirement"
                value={addProductForm.lightRequirement}
                onChange={handleFormChange}
                className='w-full p-3 border border-neutral-300 text-sm text-neutral-600 focus:outline-brand-primary-light outline-none'
              >
                <option value="Light Requirement">Light Requirement</option>
                <option value="Low Light">Low Light</option>
                <option value="Bright Indirect Light">Bright Indirect Light</option>
                <option value="Bright Direct Light">Bright Direct Light</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <label className='block text-sm font-medium mb-2'>Description <span className='text-red-600'>*</span></label>
            <textarea
              name="description"
              value={addProductForm.description}
              onChange={handleFormChange}
              className='w-full p-3 border border-neutral-300 text-sm text-neutral-600 focus:outline-brand-primary-light'
            >
            </textarea>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl">
          <div>
            <label className='block text-sm font-medium mb-2'>Upload Product <span className='text-red-600'>*</span></label>
            <input 
              onChange={(e) => {
                  setAddProductForm((prev) => ({
                      ...prev,
                      image: e.target.files[0]
                  }))
              }}
              type="file"
              className="'w-full p-3 border border-neutral-300 text-sm text-neutral-600 focus:outline-brand-primary-light"
            />
          </div>
          <button
            onClick={handleSubmit}
            className='w-1/4 p-2 text-white text-sm bg-black hover:bg-brand-primary duration-200 mt-4 rounded-md cursor-pointer'>
            Add product
          </button>
        </div>

      </div>
    </div>
  )
}

export default AddProducts