import React from 'react'

function NotFound() {
  return (
    <>
    <section className='pt-60.25 pb-35'>
      <div className="my-container text-center">
        <h2 className='text-[#000000] text-[110px] font-inter font-medium leading-28.75 pb-10'>404 Not Found</h2>
        <p className='text-black text-[16px] font-popins font-normal leading-6 pb-24'>Your visited page not found. You may go home page.</p>
        <a href="" className='text-[#FAFAFA] text-[16px] font-popins font-medium leading-6 bg-[#DB4444] rounded-sm py-4 px-12'>Back to home page</a>
      </div>
    </section>
    </>
  )
}

export default NotFound