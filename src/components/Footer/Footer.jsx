import React from 'react'
import footerlogo from '../../assets/images/Logo_main/footer_Logo.png'
import Qrcode from '../../assets/images/Footer_main/Qrcode.png'
import playstore from '../../assets/images/Footer_main/playstore.png'
import appstore from '../../assets/images/Footer_main/appstore.png'
import { RiFacebookLine } from "react-icons/ri";
import { FiTwitter } from "react-icons/fi";
import { IoLogoInstagram } from "react-icons/io";
import { RiLinkedinLine } from "react-icons/ri";

function Footer() {
  return (
    <>
      <footer className='bg-black'>
        <div className="my-container px-4">
          {/* Main Footer Content */}
          <div className="flex flex-col lg:flex-row pt-12 md:pt-20 pb-12 md:pb-25 gap-10 lg:gap-10 xl:gap-21.75">
            
            {/* Logo & Subscribe */}
            <div className='w-full lg:w-[20%]'>
              <img src={footerlogo} alt="logo" className="mb-4" />
              <h3 className='text-[#FAFAFA] text-[18px] md:text-[20px] font-popins font-medium leading-7 py-4 md:py-6'>Subscribe</h3>
              <p className='text-[#FAFAFA] text-[14px] md:text-[16px] font-popins font-normal leading-6'>Get 10% off your first order</p>
            </div>

            {/* Grid Container for Middle Sections on Mobile/Tablet */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-1 gap-10 lg:gap-10 xl:gap-21.75">
              
              {/* Support */}
              <div className='w-full'>
                <h3 className='text-[#FAFAFA] text-[18px] md:text-[20px] font-popins font-medium leading-7 pb-4 md:pb-6 text-nowrap'>
                  Support
                </h3>
                <div className='flex flex-col gap-3 md:gap-4'>
                  <p className="text-[#FAFAFA] text-[14px] md:text-[16px] font-popins leading-6 font-normal">
                    <a href="https://www.google.com/maps?q=Dhaka+Bangladesh" className="hover:underline" target="_blank" rel="noreferrer">
                      📍 111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
                    </a>
                  </p>
                  <p className="text-[#FAFAFA] text-[14px] md:text-[16px] font-popins leading-6 font-normal">
                    <a href="mailto:exclusive@gmail.com" className="hover:underline">
                      📧 exclusive@gmail.com
                    </a>
                  </p>
                  <p className="text-[#FAFAFA] text-[14px] md:text-[16px] font-popins leading-6 font-normal">
                    <a href="tel:+88015888889999" className="hover:underline text-nowrap">
                      📞 +88015-88888-9999
                    </a>
                  </p>
                </div>
              </div>

              {/* Account */}
              <div className='w-full lg:w-auto min-w-30'>
                <h3 className='text-[#FAFAFA] text-[18px] md:text-[20px] font-popins font-medium leading-7 pb-4 md:pb-5'>
                  Account
                </h3>
                <div className='flex flex-col gap-3 md:gap-4'>
                  <a href="#" className='text-[#FAFAFA] text-[14px] md:text-[16px] font-popins leading-6 font-normal hover:underline'>My Account</a>
                  <a href="#" className='text-[#FAFAFA] text-[14px] md:text-[16px] font-popins leading-6 font-normal hover:underline text-nowrap'>Login / Register</a>
                  <a href="#" className='text-[#FAFAFA] text-[14px] md:text-[16px] font-popins leading-6 font-normal hover:underline'>Cart</a>
                  <a href="#" className='text-[#FAFAFA] text-[14px] md:text-[16px] font-popins leading-6 font-normal hover:underline'>Wishlist</a>
                </div>
              </div>

              {/* Quick Link */}
              <div className='w-full lg:w-auto min-w-30'>
                <h3 className='text-[#FAFAFA] text-[18px] md:text-[20px] font-popins font-medium leading-7 pb-4 md:pb-5'>
                  Quick Link
                </h3>
                <div className='flex flex-col gap-3 md:gap-4'>
                  <a href="#" className='text-[#FAFAFA] text-[14px] md:text-[16px] font-popins leading-6 font-normal hover:underline'>Privacy Policy</a>
                  <a href="#" className='text-[#FAFAFA] text-[14px] md:text-[16px] font-popins leading-6 font-normal hover:underline'>Terms Of Use</a>
                  <a href="#" className='text-[#FAFAFA] text-[14px] md:text-[16px] font-popins leading-6 font-normal hover:underline'>FAQ</a>
                  <a href="#" className='text-[#FAFAFA] text-[14px] md:text-[16px] font-popins leading-6 font-normal hover:underline'>Contact</a>
                </div>
              </div>
            </div>

            {/* Download App */}
            <div className='w-full lg:w-[21%]'>
              <h3 className='text-[#FAFAFA] text-[18px] md:text-[20px] font-popins font-medium leading-7 pb-4 md:pb-6'>
                Download App
              </h3>
              <div className='flex gap-2.5 pb-6'>
                <div className='shrink-0'>
                  <img src={Qrcode} alt="QR Code" className='w-20 md:w-auto' />
                </div>
                <div className='flex flex-col gap-2.5'>
                  <a href="#">
                    <img src={playstore} alt="Playstore" className='w-28 md:w-auto' />
                  </a>
                  <a href="#">
                    <img src={appstore} alt="Appstore" className='w-28 md:w-auto' />
                  </a>
                </div>
              </div>
              <div className='flex gap-6 justify-center lg:justify-start'>
                <a href="#" className='text-[#FFFFFF] transition hover:scale-110'><RiFacebookLine className='text-[20px]'/></a>
                <a href="#" className='text-[#FFFFFF] transition hover:scale-110'><FiTwitter className='text-[20px]'/></a>
                <a href="#" className='text-[#FFFFFF] transition hover:scale-110'><IoLogoInstagram className='text-[20px]'/></a>
                <a href="#" className='text-[#FFFFFF] transition hover:scale-110'><RiLinkedinLine className='text-[20px]'/></a>
              </div>
            </div>

          </div>
        </div>

        {/* Copyright Bar */}
        <div className='border-t border-[rgba(255,255,255,0.2) md:border-[rgba(255,255,255,0.25)] pt-4 pb-6 px-4'>
          <p className='text-[rgba(255,255,255,0.4)] text-[12px] md:text-[16px] font-popins font-normal text-center leading-6'>
            © Copyright Rimel 2022. All right reserved
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer