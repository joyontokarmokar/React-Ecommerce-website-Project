import React from 'react'
import Arrivl1 from '../../assets/images/NewArrival_main/arrivals1.png'
import Arrivl2 from '../../assets/images/NewArrival_main/arrivals2.png'
import Arrivl3 from '../../assets/images/NewArrival_main/arrivals3.png'
import Arrivl4 from '../../assets/images/NewArrival_main/arrivals4.png'
import { TiStarFullOutline } from "react-icons/ti";
import { Link } from 'react-router'

function NewArrival() {
   const Related_products = [
          {id:1, name:'HAVIT HV-G92 Gamepad', image:Arrivl1, dprice:'120', price:'160', ratting:'88', discound:'40'},
          {id:2, name:'AK-900 Wired Keyboard', image:Arrivl2, dprice:'960', price:'1160', ratting:'75', discound:'35'},
          {id:3, name:'IPS LCD Gaming Monitor', image:Arrivl3, dprice:'370', price:'400', ratting:'99', discound:'30'},
          {id:4, name:'RGB liquid CPU Cooler', image:Arrivl4, dprice:'160', price:'170', ratting:'65'},
      ]
  return (
    <>
    <section className='pt-20 md:pt-30'>
  <div className="my-container px-5 xl:px-0 border-b border-[rgba(0,0,0,0.25)] pb-20 md:pb-25.5">
    
    {/* Header */}
    <div className='pb-7.75'>
      <h3 className='text-[#000000] text-[36px] font-inter leading-12 font-semibold text-center md:text-left'>
        New Arrivals
      </h3>
    </div>

    {/* Product Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7.5 rounded-sm pb-15 lg:pb-20 xl:pb-29.5">
      {Related_products.map(related => (
        <div 
          key={related.id} 
          className="product_item group bg-white rounded-lg hover:shadow-xl transition-all duration-300 ease-out cursor-pointer border border-transparent hover:border-gray-100"
        >
          {/* Image Box */}
          <div className='bg-[#F5F5F5] p-10 relative flex items-center justify-center h-64 overflow-hidden rounded-t-lg'>
            <img 
              src={related.image} 
              className='max-h-full object-contain transition-transform duration-500 group-hover:scale-110' 
              alt={related.name} 
            />
            
            {/* Discount Badge */}
            {related.discound && (
              <div className='w-13.75 h-6.5 rounded-sm bg-[#DB4444] text-center absolute top-3 left-3 flex items-center justify-center shadow-sm'>
                <span className='text-[#FAFAFA] text-[12px] font-popins font-normal'>-{related.discound}%</span>
              </div>
            )}

            {/* View Details Hover Overlay (Optional but Cool) */}
            <div className="absolute bottom-0 left-0 w-full bg-black text-white py-2 text-center text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Quick View
            </div>
          </div>

          {/* Product Content */}
          <div className="p-4">
            <h3 className='text-[#000000] text-[16px] font-popins leading-6 font-medium group-hover:text-[#DB4444] transition-colors'>
              <Link to={`/Product/Details/${related.id}`}>
                {related.name}
              </Link>
            </h3>
            
            <p className='pt-2 flex items-center gap-2'>
              <span className='text-[#DB4444] text-[16px] font-popins leading-6 font-medium'>${related.dprice}</span> 
              <del className='text-[rgba(0,0,0,0.50)] text-[14px] font-popins leading-6 font-medium'>${related.price}</del>
            </p>

            {/* Stars */}
            <div className='pt-2 flex gap-1 text-[#FFAD33]'>
              <TiStarFullOutline /><TiStarFullOutline /><TiStarFullOutline /><TiStarFullOutline /><TiStarFullOutline />
              <samp className='font-popins text-[14px] font-semibold text-[rgba(0,0,0,0.5)] ps-2'>({related.ratting})</samp>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* View All Button with Active Animation */}
    <div className='text-center'>
      <a 
        href="" 
        className='inline-block text-[16px] text-[#FAFAFA] font-popins font-medium leading-6 bg-[#DB4444] rounded-sm py-4 px-12 hover:bg-black active:scale-95 transition-all duration-200 shadow-md'
      >
        View All Products
      </a>
    </div>
  </div>
</section>
    </>
  )
}

export default NewArrival