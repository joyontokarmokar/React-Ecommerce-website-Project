import React, { useEffect, useState } from 'react'
import phone from '../../assets/images/Category_main/Category1.png'
import axios from 'axios'
import { Link } from 'react-router'

function Category() {
    const [categories, setCategoryes] = useState([])
    useEffect(() => {
        axios.get('https://dummyjson.com/products/categories')
        .then(result => setCategoryes(result.data))
    }, [])      
    
  return (
    <>
    <section className='pt-10 lg:pt-20'>
    <div className="my-container border-b border-[rgba(0,0,0,0.25)] px-5 xl:px-0 pb-18 lg:pb-20 xl:pb-32.5">
        {/*==================== Main Header ======================*/}
        <div className='pb-15'>
            <h3 className='text-[#000000] text-[30px] lg:text-[36px] font-inter font-semibold leading-tight text-center md:text-left'>
                Browse By Category
            </h3>
        </div>

        {/*==================== Grid Section ======================*/}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5 xl:gap-7.5">
            {
                categories.slice(0, 6).map((category, index) => (
                    <Link key={index} to={`/products/category/${category.slug}`} className="block h-full">
                        <div className='group border border-[rgba(0,0,0,0.3)] rounded-sm text-center flex flex-col items-center justify-center py-6 px-2 h-36 md:h-40 lg:h-44 transition-all duration-300 hover:bg-[#DB4444] hover:border-[#DB4444] hover:shadow-lg active:scale-95'>
                            
                            {/* Icon - Hover-e filter diye white kora hoyeche */}
                            <img 
                                className='mx-auto pb-4 transition-all duration-300 group-hover:brightness-0 group-hover:invert' 
                                src={phone} 
                                alt={category.name} 
                            />
                            
                            {/* Category Name - Fixed size and line clamp */}
                            <p className='font-popins text-[14px] lg:text-[15px] text-[#000000] leading-tight font-normal group-hover:text-white transition-colors duration-300 line-clamp-2'>
                                {category.name}
                            </p>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>
</section>
    </>
  )
}

export default Category