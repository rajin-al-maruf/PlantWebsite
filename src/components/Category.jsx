import React from 'react'
import tableTop from '../assets/plants/spider.jpg'
import ClimbersVines from '../assets/plants/pothos.jpg'
import FoliagePlants from '../assets/plants/zz.jpg'
import SucculentsCacti from '../assets/plants/echeveria.jpg'
import FloweringPlants from '../assets/plants/anthurium.jpg'
import MiniaturePlants from '../assets/plants/jade.jpg'


const Category = () => {
  return (
    <div className='max-w-7xl mx-auto my-32 flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 2xl:px-0'>
        <h2 className='text-2xl md:text-3xl font-poppins font-semibold'>
            Shop by Category
        </h2>
        <div className='w-full mt-14 grid grid-cols-3 lg:flex items-center justify-between gap-4'>
            <div className='flex flex-col items-center justify-center'>
                <div className='w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 xl:w-32 xl:h-32 bg-brand-accent rounded-full overflow-hidden hover:cursor-pointer hover:scale-105 duration-300'>
                    <img src={tableTop} alt="" className='h-full w-full object-cover'/>
                </div>
                <p className='mt-4 text-xs md:text-sm xl:text-base hover:cursor-pointer hover:text-brand-primary text-center'>Tabletop Plants</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <div className='w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 xl:w-32 xl:h-32 bg-brand-accent rounded-full overflow-hidden hover:cursor-pointer hover:scale-105 duration-300'>
                    <img src={ClimbersVines} alt="" className='h-full w-full object-cover'/>
                </div>
                <p className='mt-4 text-xs md:text-sm xl:text-base hover:cursor-pointer hover:text-brand-primary text-center'>Climbers & Vines</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <div className='w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 xl:w-32 xl:h-32 bg-brand-accent rounded-full overflow-hidden hover:cursor-pointer hover:scale-105 duration-300'>
                    <img src={FoliagePlants} alt="" className='h-full w-full object-cover'/>
                </div>
                <p className='mt-4 text-xs md:text-sm xl:text-base hover:cursor-pointer hover:text-brand-primary text-center'>Foliage Plants</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <div className='w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 xl:w-32 xl:h-32 bg-brand-accent rounded-full overflow-hidden hover:cursor-pointer hover:scale-105 duration-300'>
                    <img src={SucculentsCacti} alt="" className='h-full w-full object-cover'/>
                </div>
                <p className='mt-4 text-xs md:text-sm xl:text-base hover:cursor-pointer hover:text-brand-primary text-center'>Succulents & Cacti</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <div className='w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 xl:w-32 xl:h-32 bg-brand-accent rounded-full overflow-hidden hover:cursor-pointer hover:scale-105 duration-300'>
                    <img src={FloweringPlants} alt="" className='h-full w-full object-cover'/>
                </div>
                <p className='mt-4 text-xs md:text-sm xl:text-base hover:cursor-pointer hover:text-brand-primary text-center'>Flowering Plants</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <div className='w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 xl:w-32 xl:h-32 bg-brand-accent rounded-full overflow-hidden hover:cursor-pointer hover:scale-105 duration-300'>
                    <img src={MiniaturePlants} alt="" className='h-full w-full object-cover'/>
                </div>
                <p className='mt-4 text-xs md:text-sm xl:text-base hover:cursor-pointer hover:text-brand-primary text-center'>Miniature Plants</p>
            </div>
        </div>
    </div>
  )
}

export default Category