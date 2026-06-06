import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { CiFilter } from 'react-icons/ci'
import Filter from '../components/Filter'
import { supabase } from '../supabase'
import SkeletonCard from '../components/SkeletonCard'
import Spinner from '../components/Spinner'
import Breadcrumb from '../components/Breadcrumb'
import { IoIosArrowDown } from 'react-icons/io'
import type { Plant } from "../App";
import type { Dispatch, SetStateAction } from "react";

interface SoilPotsPageProps {
  plants: Plant[];
  setPlants: Dispatch<SetStateAction<Plant[]>>;
}

export interface SoilPotsFilterState {
  category: string[];
  availability: string[];
  priceRange: string[];
}

const soilPotsFilterInfo = [
  { id: "category", title: "Category", options: ["Ceramic Pots", "Plastic Pots", "Organic Soil", "Fertilizers"] },
  { id: "priceRange", title: "Price Range", options: ["Under Tk 500", "Tk 500 - Tk 1000", "Over Tk 1000"] },
  { id: "availability", title: "Availability", options: ["In Stock", "Out Of Stock"] }
];

const SoilPotsPage = ({plants, setPlants}: SoilPotsPageProps) => {

  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const ITEMS_PER_PAGE = 9;

  const [filter, setFilter] = useState<SoilPotsFilterState>({ category: [], availability: [], priceRange: [] })
  const [sortBy, setSortBy] = useState("newest")
  const [tempFilter, setTempFilter] = useState<SoilPotsFilterState>(filter)
  const [showFilters, setShowFilters] = useState(true)

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  
  const handleSetFilter: Dispatch<SetStateAction<SoilPotsFilterState>> = (value) => {
    setFilter(value);
    setPage(1);
  };

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setIsLoading(true)
        let plantData = supabase.from('plants').select('*', { count: 'exact' }).eq('product_type', 'Soil & Pots')

        if(filter.category.length > 0) {
          plantData = plantData.in("category", filter.category)
        }
        if(filter.availability.length > 0) {
          plantData = plantData.in("availability", filter.availability)
        }
        if(filter.priceRange.length > 0) {
          const orQueries: string[] = [];
          if (filter.priceRange.includes("Under Tk 500")) orQueries.push('price.lt.500');
          if (filter.priceRange.includes("Tk 500 - Tk 1000")) orQueries.push('and(price.gte.500,price.lte.1000)');
          if (filter.priceRange.includes("Over Tk 1000")) orQueries.push('price.gt.1000');
          plantData = plantData.or(orQueries.join(','));
        }

        if(sortBy === "newest") plantData = plantData.order("id", {ascending: true})
        if(sortBy === "low-to-high") plantData = plantData.order("price", {ascending: true})
        if(sortBy === "high-to-low") plantData = plantData.order("price", {ascending: false})

        const from = (page - 1) * ITEMS_PER_PAGE;
        const to = from + ITEMS_PER_PAGE - 1;
        plantData = plantData.range(from, to);

        const {data, error, count} = await plantData;

        if(error) console.error("Supabase error:", error.message);
        else {
          setPlants((data as Plant[]) || [])
          setTotalCount(count || 0)
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setIsLoading(false)
      }
    }
    fetchPlants()
  }, [filter, sortBy, page, setPlants])

  if (isLoading && plants.length === 0) return <Spinner />
  
  return (
    <div className='max-w-6xl 2xl:max-w-7xl mx-auto mt-36 px-4 md:px-6 lg:px-8 xl:px-0'>
      <Breadcrumb/>
      <div className='relative w-full h-64 md:h-80 my-8 rounded-[2.5rem] overflow-hidden group'>
        <img src='/assets/shopPageImg.jpg' alt="Shop Soil and Pots" className='absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105' />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary-dark/80 via-brand-primary-dark/50 to-transparent" />
        <div className="absolute inset-0 p-8 md:p-12 lg:p-16 flex flex-col justify-center text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 font-medium text-xs md:text-sm mb-4 w-max">
                Plant Essentials
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Soil & Pots</h1>
            <p className="max-w-md text-sm md:text-base text-gray-200 leading-relaxed">
               Everything you need to help your plants thrive. Discover our premium organic soil blends and beautiful decorative pots.
            </p>
        </div>
      </div>
      
      <div className='w-full flex items-center justify-between mb-8 pb-6 border-b border-neutral-200'>
        <div className='hidden md:flex items-center gap-2'>
          <CiFilter size={24} className="text-brand-primary"/>
          <span className="font-semibold text-brand-primary-dark tracking-widest uppercase text-sm">Filters</span>
        </div>
        <div className='flex gap-2 items-center md:hidden'>
          <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${showFilters ? 'bg-brand-primary text-white shadow-md' : 'bg-neutral-100 text-brand-primary-dark hover:bg-neutral-200'}`}>
            <CiFilter size={20} /> Filters
          </button>
        </div>
        <div className='flex items-center gap-3'>
          <p className='text-[10px] font-bold uppercase tracking-widest text-neutral-400 hidden sm:block mt-0.5'>Sort by</p>
          <div className="relative group" tabIndex={0}>
            <div className='flex items-center justify-between gap-3 pl-4 pr-3 py-2 text-xs bg-white border border-neutral-200 text-brand-primary-dark font-medium rounded-full outline-none group-focus-within:border-brand-primary group-focus-within:ring-4 group-focus-within:ring-brand-primary/10 hover:border-brand-primary/40 transition-all cursor-pointer shadow-sm min-w-[150px] select-none'>
              <span>
                {sortBy === 'newest' && "Newest Arrivals"}
                {sortBy === 'low-to-high' && "Price: Low to High"}
                {sortBy === 'high-to-low' && "Price: High to Low"}
              </span>
              <IoIosArrowDown size={16} className="text-neutral-400 group-hover:text-brand-primary group-focus-within:rotate-180 transition-all duration-300" />
            </div>
            
            <div className="absolute top-full right-0 mt-2 w-full bg-white border border-neutral-100 shadow-xl rounded-2xl overflow-hidden opacity-0 translate-y-2 pointer-events-none group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto transition-all duration-300 z-50 flex flex-col py-2">
              {[
                { id: 'newest', label: 'Newest Arrivals' },
                { id: 'low-to-high', label: 'Price: Low to High' },
                { id: 'high-to-low', label: 'Price: High to Low' },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setSortBy(option.id);
                    setPage(1);
                    (document.activeElement as HTMLElement)?.blur();
                  }}
                  className={`px-4 py-2 text-xs font-medium text-left hover:bg-neutral-50 transition-colors ${
                    sortBy === option.id ? 'text-brand-primary bg-brand-primary/5' : 'text-brand-primary-dark'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className='md:grid grid-cols-4 gap-10 mt-6'>
        <div className="hidden md:block">
          {soilPotsFilterInfo.map((info, index) => (
            <Filter key={index} filterType={info.id} title={info.title} options={info.options} filter={filter} setFilter={handleSetFilter} />
          ))}
          <button className='w-full text-sm py-3 mt-4 text-neutral-500 hover:text-brand-primary transition-colors hover:underline cursor-pointer rounded-full' onClick={() => { setFilter({ category: [], availability: [], priceRange: [] }); setPage(1); }}>
            Clear Filters
          </button>
        </div>

        {showFilters && (
          <div className='block md:hidden'>
            {soilPotsFilterInfo.map((info, index) => (
                <Filter key={index} filterType={info.id} title={info.title} options={info.options} filter={tempFilter} setFilter={setTempFilter} />
            ))}
              <button className='w-full p-3 text-white text-sm font-medium bg-brand-primary hover:bg-brand-primary-dark transition-colors duration-300 mt-6 rounded-full shadow-md cursor-pointer' onClick={() => { setFilter(tempFilter); setPage(1); setShowFilters(false); }}>Apply All</button>
              <button className='w-full text-sm py-3 text-neutral-500 hover:text-brand-primary transition-colors hover:underline cursor-pointer rounded-full' onClick={() => { const emptyFilter = { category: [], availability: [], priceRange: [] }; setTempFilter(emptyFilter); setFilter(emptyFilter); setPage(1); }}>Clear Filters</button>
          </div>
        )}

        {isLoading ? (
          <div className='grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 col-span-4 md:col-span-3'>
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (<SkeletonCard key={i} />))}
          </div>
        ) : plants.length > 0 ? (
          <div className='col-span-4 md:col-span-3 flex flex-col gap-12 pb-20'>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
              {plants.map((plant) => (<ProductCard key={plant.id} plant={plant} />))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button onClick={() => { setPage((prev) => Math.max(prev - 1, 1)); window.scrollTo({ top: 350, behavior: 'smooth' }); }} disabled={page === 1} className="px-4 py-2 rounded-full border border-neutral-200 text-sm font-medium hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Previous</button>
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button key={idx} onClick={() => { setPage(idx + 1); window.scrollTo({ top: 350, behavior: 'smooth' }); }} className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${page === idx + 1 ? "bg-brand-primary text-white shadow-md" : "text-neutral-600 hover:bg-neutral-100"}`}>{idx + 1}</button>
                ))}
                <button onClick={() => { setPage((prev) => Math.min(prev + 1, totalPages)); window.scrollTo({ top: 350, behavior: 'smooth' }); }} disabled={page === totalPages} className="px-4 py-2 rounded-full border border-neutral-200 text-sm font-medium hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Next</button>
              </div>
            )}
          </div>
        ) : (
          <div className='w-full mt-20 flex flex-col items-center justify-center text-neutral-400 col-span-1 md:col-span-3 gap-4'>
             <div className="text-6xl mb-2">🪴</div>
             <h2 className="text-2xl font-semibold text-brand-primary-dark">No products found</h2>
             <p className="text-sm">Try adjusting your filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  )
}
export default SoilPotsPage