import React from 'react'
import check1 from '../../assets/images/CheckOut/check1.png'
import check2 from '../../assets/images/CheckOut/check2.png'

function CheckOut() {
    const subtotal = localStorage.getItem("cartSubtotal") || 0;

  return (
    <>
    <section>
    <div className="my-container pt-10 md:pt-20 lg:pt-45.25 pb-20 lg:pb-47 px-5 xl:px-0">
        <div className='pb-8 md:pb-12'>
            <h3 className='text-[#000000] text-[28px] md:text-[36px] font-inter font-medium leading-tight'>Billing Details</h3>
        </div>

        {/* Flex wrap add kora hoyeche jate mobile e column hoye jay */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 xl:gap-43.25">
            
            {/* ------- Billing Form (Left) ------- */}
            <div className='w-full lg:w-[45%] flex flex-col gap-8 [&>div>label]:text-[rgba(0,0,0,0.4)] [&>div>label]:text-[16px] [&>div>label]:font-popins [&>div>label]:font-normal [&>div>label]:leading-6 [&>div>input]:bg-[#F5F5F5] [&>div>input]:w-full [&>div>input]:py-4 [&>div>input]:rounded-sm [&>div>input]:text-black [&>div>input]:text-[16px] [&>div>input]:font-popins [&>div>input]:font-normal [&>div>input]:outline-0 [&>div>input]:px-3 [&>div>input]:mt-2 [&>div>label>span]:text-[#DB4444]'>
                <div>
                    <label>First Name<span>*</span></label>
                    <input type="text" />
                </div>
                <div>
                    <label>Company Name</label>
                    <input type="text" />
                </div>
                <div>
                    <label>Street Address<span>*</span></label>
                    <input type="text" />
                </div>
                <div>
                    <label>Apartment, floor, etc. (optional)</label>
                    <input type="text" />
                </div>
                <div>
                    <label>Town/City<span>*</span></label>
                    <input type="text" />
                </div>
                <div>
                    <label>Phone Number<span>*</span></label>
                    <input type="text" />
                </div>
                <div>
                    <label>Email Address<span>*</span></label>
                    <input type="text" />
                </div>
            </div>

            {/* ------- Order Summary (Right) ------- */}
            <div className='w-full lg:w-[55%]'>
                <div className="w-full lg:w-[90%] xl:w-[80%] flex flex-col gap-8">
                    
                    {/* Items List */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div className='flex gap-4 md:gap-6 items-center'>
                                <img src={check2} alt="monitor" className="w-12 h-12 object-contain" />
                                <span className='text-[#000000] text-[16px] font-popins font-normal'>LCD Monitor</span>
                            </div>
                            <span className='text-[#000000] text-[16px] font-popins font-normal'>$650</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className='flex gap-4 md:gap-6 items-center'>
                                <img src={check1} alt="gamepad" className="w-12 h-12 object-contain" />
                                <span className='text-[#000000] text-[16px] font-popins font-normal'>H1 Gamepad</span>
                            </div>
                            <span className='text-[#000000] text-[16px] font-popins font-normal'>$550</span>
                        </div>
                    </div>

                    {/* Calculation Section */}
                    <div className='space-y-4 border-t border-[rgba(0,0,0,0.1)] pt-4'>
                        <div className='flex justify-between border-b border-[rgba(0,0,0,0.1)] pb-4'>
                            <span>Subtotal:</span>
                            <span>${subtotal}</span>
                        </div>
                        <div className='flex justify-between border-b border-[rgba(0,0,0,0.1)] pb-4'>
                            <span>Shipping:</span>
                            <span>Free</span>
                        </div>
                        <div className='flex justify-between font-medium text-lg'>
                            <span>Total:</span>
                            <span>${subtotal}</span>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className='space-y-4'>
                        <div className='flex items-center gap-4 cursor-pointer group'>
                            <input id='Stripe' name='payment_method' type="radio" className="accent-black w-5 h-5" />
                            <label htmlFor="Stripe" className='cursor-pointer font-popins'>Stripe</label>
                        </div>
                        <div className='flex items-center gap-4 cursor-pointer group'>
                            <input id='cash' name='payment_method' type="radio" className="accent-black w-5 h-5" />
                            <label htmlFor="cash" className='cursor-pointer font-popins'>Cash on delivery</label>
                        </div>
                    </div>

                    {/* Coupon Section */}
                    <div className='flex flex-col sm:flex-row gap-4 pt-4'>
                        <input type="text" className='grow py-4 px-6 border border-black rounded-sm placeholder:text-gray-400 outline-none' placeholder='Coupon Code' />
                        <button className='bg-[#DB4444] text-white px-8 py-4 rounded-sm hover:bg-black transition-colors'>Apply Coupon</button>
                    </div>

                    {/* Place Order Button */}
                    <div className='pt-4'>
                        <button className='w-full sm:w-auto bg-[#DB4444] text-white px-12 py-4 rounded-sm hover:bg-black transition-all active:scale-95 shadow-md'>Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
    </>
  )
}

export default CheckOut