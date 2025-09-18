import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PiHeartStraightFill, PiHeartStraightLight } from 'react-icons/pi'

const ProductCard = ({id,name,price,plantImg}) => {

const [isWished, setIsWished] = useState(false)
  return (
    <Link to={`/product/${id}`}>
        <div className='w-full h-full bg-neutral-100 border border-neutral-200 rounded-md cursor-pointer hover:shadow-xl hover:scale-101 duration-300'>
            <div className='p-2 md:p-4'>
                <div className='w-full h-full overflow-hidden flex items-center justify-center bg-neutral-100 relative'>
                    <div className='w-full absolute top-0 flex items-center justify-between'>
                        <p className='left-0 text-xs bg-brand-primary text-neutral-100 px-2 rounded-md'>sale</p>
                        {isWished? 
                            <PiHeartStraightFill onClick={()=>setIsWished(false)} size={20} className='right-0 text-brand-primary hover:scale-110 duration-300'/> : 
                            <PiHeartStraightLight onClick={()=>setIsWished(true)} size={20} className='right-0 text-brand-primary hover:scale-110 duration-300'/> }
                    </div>
                    <img src={plantImg} alt="alovera_plant" className='object-cover'/>
                </div>
                <div className='p-2 border-t border-neutral-300 text-center'>
                    <h3 className='font-semibold text-xs md:text-sm'>{name}</h3>
                    <h4 className='pt-1 text-xs md:text-sm'>Tk {price}</h4>
                    <button className='w-full p-2 mt-2 bg-brand-primary hover:bg-brand-primary-dark duration-300 text-xs md:text-sm text-neutral-100 rounded-md cursor-pointer'>
                        ADD TO CART
                    </button>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default ProductCard