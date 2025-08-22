import { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

const Filter = ({id, title, options}) => {


    const [openFilter, setOpenFilter] = useState(true);

    
  return (
    <div>
        <div className='py-4 border-y border-y-neutral-200'>
            <h3 onClick={()=> setOpenFilter(!openFilter)} className='flex items-center justify-between cursor-pointer'>
                {title}
                <IoIosArrowDown 
                    size={20} 
                    className={openFilter? 
                        'transform rotate-180 duration-300 ease-in-out' : 
                        'rotate-0 duration-300 ease-in-out'}
                    />
            </h3>
            {openFilter &&
            <div className="space-y-4 pt-4">
                {options.map((option, index) => {
                    return(
                        <label key={index} className="flex items-center">
                            <input type="checkbox" className="rounded-md size-4 accent-brand-primary" />
                            <span className="ml-2 text-sm">{option}</span>
                        </label>
                    )
                })}
            </div>
            }
        </div>
    </div>
  )
}

export default Filter