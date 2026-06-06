import { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

interface FilterProps {
    title: string;
    options: string[];
    filter: any;
    setFilter: any;
    filterType: string;
}

const Filter = ({title, options, filter, setFilter, filterType}: FilterProps) => {

    // console.log(id)

    const [openFilter, setOpenFilter] = useState(true);

    const handleCheckboxChange = (option: string) => {
        setFilter((prev: any) => {
            let updateFilter = [...(prev[filterType] || [])]

            if(updateFilter.includes(option)){
                updateFilter = updateFilter.filter((op) => op !== option)
            }else{
                updateFilter.push(option)
            }
            return{
                ...prev,
                [filterType]: updateFilter,
            }
        })
    }

    
  return (
    <div>
        <div className='py-4 border-b border-neutral-100'>
            <h3 onClick={()=> setOpenFilter(!openFilter)} className='flex items-center justify-between cursor-pointer text-brand-primary-dark font-semibold tracking-wide'>
                {title}
                <IoIosArrowDown 
                    size={20} 
                    className={`transition-transform duration-300 ease-in-out text-brand-primary ${openFilter ? 'rotate-180' : 'rotate-0'}`}
                    />
            </h3>
            {openFilter &&
            <div className="space-y-3 pt-5">
                {options.map((option, index) => {
                    return(
                        <label key={index} className="flex items-center group cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="rounded-md size-4 accent-brand-primary" 
                        onChange={() => handleCheckboxChange(option)}
                                checked={filter[filterType]?.includes(option) || false}
                            />
                            <span className="ml-3 text-sm text-neutral-600 group-hover:text-brand-primary transition-colors">{option}</span>
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