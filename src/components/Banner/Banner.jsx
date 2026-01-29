import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import apple_logo from '../../assets/images/Banner_main/apple_logo.png'
import { HiArrowSmallRight } from "react-icons/hi2";
import iphone_14 from '../../assets/images/Banner_main/iphone14.png'
import iphone_15 from '../../assets/images/Banner_main/iphone15.png'
import iphone_17 from '../../assets/images/Banner_main/iphone17.png'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { Link } from 'react-router';

function Banner() {
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        arrows:false,
  };
  const [categories, setCategoryes] = useState([])
    useEffect(() => {
        axios.get('https://dummyjson.com/products/categories')
        .then(result => setCategoryes(result.data))
    }, [])  
  return (
    <>
    <section className="pb-10 lg:pb-16 px-5 xl:px-0">
    <div className="my-container">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-11.25">
            
            {/* ====== Sidebar (Categories) ====== */}
            {/* Mobile-e eita hide thakbe, Laptop size (lg) theke dekhabe */}
            <div className="hidden lg:flex w-[20%] category flex-col gap-4 pt-10 border-r border-[rgba(0,0,0,0.25)] pr-4">
                {categories.slice(0, 9).map((category, index) => (
                    <Link 
                        key={index} 
                        to={`/products/category/${category.slug}`}
                        className="font-popins text-[16px] text-black hover:text-[#DB4444] transition-all"
                    >
                        {category.name}
                    </Link>
                ))}
            </div>

            {/* ====== Main Slider ====== */}
            <div className="w-full lg:w-[80%] pt-6 lg:pt-10">
                <Slider {...settings}>
                    {[iphone_14, iphone_15, iphone_17].map((img, index) => (
                        <div key={index} className="slider_item outline-none">
                            <div className='bg-black flex flex-col sm:flex-row min-h-87.5 sm:min-h100 lg:min-h-111 overflow-hidden'>
                                
                                {/* Text Content */}
                                <div className="w-full sm:w-[45%] lg:w-[40%] pt-10 sm:pt-14.5 px-8 sm:ps-16 flex flex-col justify-center items-center sm:items-start text-center sm:text-left">
                                    <div className="flex gap-4 md:gap-6 items-center pb-4 md:pb-5">
                                        <img src={apple_logo} alt="Apple Logo" className="w-8 md:w-auto" />
                                        <span className='font-popins text-[14px] md:text-[16px] text-[#FAFAFA] leading-6 font-normal'>
                                            iPhone {index === 0 ? '14' : '15'} Series
                                        </span>
                                    </div>
                                    
                                    <h2 className="font-inter text-[#FAFAFA] font-semibold text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] xl:text-[56px] leading-tight">
                                        <span className="block whitespace-nowrap">Up to {20 - index}%</span>
                                        <span className="block">off Voucher</span>
                                    </h2>

                                    <div className='flex gap-2 pt-6 items-center group cursor-pointer'>
                                        <a href="#" className='font-popins text-[14px] md:text-[16px] font-medium leading-6 text-[#FAFAFA] border-b border-[#FAFAFA] pb-1 group-hover:text-[#DB4444] group-hover:border-[#DB4444] transition-all'>
                                            Shop Now
                                        </a>
                                        <HiArrowSmallRight className='text-[#FAFAFA] text-xl group-hover:translate-x-2 transition-transform'/>
                                    </div>
                                </div>

                                {/* Image Side */}
                                <div className="w-full sm:w-[55%] lg:w-[60%] flex items-center justify-center p-6 sm:pt-4">
                                    <img 
                                        src={img} 
                                        alt="Product" 
                                        className="w-full max-w-62.5 sm:max-w-none h-auto object-contain transform hover:scale-105 transition-transform duration-500" 
                                    />
                                </div>

                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

        </div>
    </div>
</section>
    </>
  )
}

export default Banner