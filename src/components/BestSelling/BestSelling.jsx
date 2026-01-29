import React from 'react'
import bestsell1 from '../../assets/images/BestSelling/bestsell1.png'
import bestsell2 from '../../assets/images/BestSelling/bestsell2.png'
import bestsell3 from '../../assets/images/BestSelling/bestsell3.png'
import bestsell4 from '../../assets/images/BestSelling/bestsell4.png'
import { TiStarFullOutline } from "react-icons/ti";

function BestSelling() {
    const Related_products = [
        {id:1, name:'The North Coat', image:bestsell1, dprice:'260', price:'360', ratting:'65'},
        {id:2, name:'Gucci Duffle Bag', image:bestsell2, dprice:'960', price:'1160', ratting:'65'},
        {id:3, name:'RGB Liquid CPU Cooler', image:bestsell3, dprice:'160', price:'170', ratting:'65'},
        {id:4, name:'Small Bookshelf', image:bestsell4, price:'360', ratting:'65'},
    ]

    return (
        <section>
    <div className="my-container px-5 xl:px-0 pt-20 pb-20 lg:pb-32">
        
        {/* ================= Header ================= */}
        <div className="flex justify-between items-center mb-8 md:mb-12">
            <h3 className='text-3xl md:text-4xl font-inter font-semibold text-gray-900'>
                Best Selling Products
            </h3>
            
            {/* View All Button: LG device-e dekhabe, MD-te hidden thakbe */}
            <a 
                href="#"
                className='hidden lg:inline-block bg-red-600 text-white text-base font-popins font-medium py-3 px-10 rounded-md hover:bg-black active:scale-95 transition-all duration-300 shadow-md'
            >
                View All
            </a>
        </div>

        {/* ================= Product Grid ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Related_products.map(related => (
                <div 
                    key={related.id} 
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-out overflow-hidden cursor-pointer group border border-gray-50 flex flex-col h-full"
                >
                    <div className="bg-gray-100 p-4 flex justify-center items-center h-52 relative">
                        <img 
                            src={related.image} 
                            alt={related.name} 
                            className="max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>

                    <div className="p-5 flex flex-col grow">
                        <h3 className='text-gray-900 text-lg font-medium truncate group-hover:text-red-600 transition-colors'>
                            {related.name}
                        </h3>

                        <p className='mt-auto pt-3 flex items-center gap-2'>
                            {related.dprice ? (
                                <>
                                    <span className='text-red-600 font-bold text-lg'>${related.dprice}</span>
                                    <del className='text-gray-400 text-sm'>${related.price}</del>
                                </>
                            ) : (
                                <span className='text-red-600 font-bold text-lg'>${related.price}</span>
                            )}
                        </p>

                        <div className='flex items-center gap-1 mt-2'>
                            <div className="flex text-yellow-400">
                                {Array(5).fill(0).map((_, i) => (
                                    <TiStarFullOutline key={i} />
                                ))}
                            </div>
                            <span className='text-gray-500 text-xs ml-2 font-medium'>({related.ratting})</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* ================= Mobile/Tablet Button ================= */}
        {/* View All Button: MD porjonto dekhabe, LG-te hidden hoye jabe */}
        <div className="lg:hidden text-center mt-10">
            <a 
                href="#"
                className='inline-block w-full sm:w-auto bg-red-600 text-white text-base font-popins font-medium py-3 px-12 rounded-md hover:bg-black active:scale-95 transition-all duration-300 shadow-md'
            >
                View All
            </a>
        </div>

    </div>
</section>
    )
}

export default BestSelling;
