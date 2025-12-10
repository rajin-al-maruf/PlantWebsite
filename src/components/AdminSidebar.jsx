import { Link } from "react-router-dom"
import logo from '/assets/BonomayaLogo.jpg'
import { MdOutlineAddBox } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";

const AdminSidebar = () => {
  return (
    <div className="px-6 py-4 w-68 bg-white">
      <img src={logo} className='w-14 rounded-full' alt="BonomayaLogo" />

      <div className="flex flex-col gap-2 mt-4 py-4 border-t border-t-neutral-300">
        <Link to='add-products'>
          <div className="flex gap-2 items-center border border-brand-primary w-full p-2 rounded-md text-sm">
            <MdOutlineAddBox size={20}/>
            <p>Add Products</p>
          </div>
        </Link>
        <Link to='products'>
          <div className="flex gap-2 items-center border border-brand-primary w-full p-2 rounded-md text-sm">
            <AiOutlineProduct size={20}/>
            <p>Products</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default AdminSidebar