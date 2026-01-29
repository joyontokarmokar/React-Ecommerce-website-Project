import React from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Link } from 'react-router-dom'; // Note: corrected from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeCart, updateQuantity } from '../../redux/Slice/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline } from "react-icons/io5";


const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const incrementQuantity = (item) => {
        dispatch(updateQuantity({
            id: item.id,
            quantity: item.quantity + 1,
        }));
    };

    const decrementQuantity = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({
                id: item.id,
                quantity: item.quantity - 1,
            }));
        }
    };

    // Subtotal using reduce (Optimized approach)
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

    //Cart theke products remove korar jonno
    const handleRemove =  (id) => {
        dispatch(removeCart(id))
    }
    //Cart er sob remove er jonno
    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <section className='pt-10 md:pt-45.25 pb-20 overflow-hidden'>
    <div className="my-container px-4">
        
        {cartItems.length > 0 ? (
            <>
                {/* Header Row  */}
                <div className="hidden md:grid grid-cols-4 px-10 py-6 shadow-cart rounded-sm mb-10 bg-white border border-gray-100">
                    <h3 className="font-popins text-[16px]">Product</h3>
                    <h3 className="font-popins text-[16px] text-center">Price</h3>
                    <h3 className="font-popins text-[16px] text-center">Quantity</h3>
                    <h3 className="font-popins text-[16px] text-end">Subtotal</h3>
                </div>

                {/* Cart Items List */}
                <div className="min-h-25">
                    <AnimatePresence mode='popLayout'>
                        {cartItems.map((cart, index) => (
                            <motion.div 
                                key={cart.id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.05 }}
                                className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0 px-6 md:px-10 py-6 shadow-cart rounded-sm mb-6 md:mb-10 items-center relative bg-white border border-gray-50">
                                {/* Product Info Section */}
                                <div className='flex gap-4 md:gap-5 items-center'>
                                    <div className='relative group'> 
                                        <img className='w-12 md:w-15 h-12 md:h-15 object-cover border rounded-sm' src={cart.thumbnail} alt={cart.title} />
                                        <div onClick={() => handleRemove(cart.id)} className='absolute -top-2 -left-2 bg-[#DB4444] text-white rounded-full w-5 h-5 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity'>
                                            <IoCloseOutline className='text-[16px]' />
                                        </div>
                                    </div>
                                    <h3 className='font-popins text-[14px] md:text-[16px] leading-tight'>{cart.title}</h3>
                                </div>

                                {/* Price, Quantity, Subtotal Section */}
                                <div className='flex md:justify-center items-center justify-between'>
                                    <span className="md:hidden text-gray-500">Price:</span>
                                    <h3 className='font-popins'>${cart.price}</h3>
                                </div>
                                <div className='flex md:justify-center items-center justify-between'>
                                    <span className="md:hidden text-gray-500">Quantity:</span>
                                    <div className='flex items-center justify-between w-18 h-11 border border-[rgba(0,0,0,0.4)] rounded-sm px-3'>
                                        <span>{cart.quantity}</span>
                                        <div className='flex flex-col'>
                                            <MdKeyboardArrowUp onClick={() => incrementQuantity(cart)} className='cursor-pointer hover:text-[#DB4444] select-none' />
                                            <MdKeyboardArrowDown onClick={() => decrementQuantity(cart)} className='cursor-pointer hover:text-[#DB4444] select-none' />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex md:justify-end items-center justify-between'>
                                    <span className="md:hidden text-gray-500 font-bold select-none">Subtotal:</span>
                                    <h3 className='font-popins font-medium'>${(cart.price * cart.quantity).toFixed(2)}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col sm:flex-row justify-between gap-4'>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link to="/" className='inline-block w-full sm:w-auto text-center border border-[rgba(0,0,0,0.5)] rounded-sm py-3 px-12 hover:bg-[#DB4444] hover:text-white transition-all select-none'>
                            Return To Shop
                        </Link>
                    </motion.div>
                    <button className='border border-[rgba(0,0,0,0.5)] rounded-sm py-3 px-12 hover:bg-[#DB4444] hover:text-white transition-all select-none'>
                        Update Cart
                    </button>
                </div>

                {/*  Cart Total Card */}
                <div className='flex justify-end pt-16 md:pt-28'>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className='w-full md:w-117.5 border border-black px-5 pt-8 pb-10 rounded-sm'>
                        <h3 className='font-popins font-medium text-[20px] pb-6'>Cart Total</h3>
                        <div className='flex justify-between py-4 border-b border-[rgba(0,0,0,0.4)] select-none'>
                            <span>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className='flex justify-between py-4 border-b border-[rgba(0,0,0,0.4)]'>
                            <span>Shipping:</span>
                            <span>Free</span>
                        </div>
                        <div className='flex justify-between py-4'>
                            <span className='font-bold'>Total:</span>
                            <span className='font-bold'>${subtotal.toFixed(2)}</span>
                        </div>
                        <Link to="/checkout" className='block text-center mt-8 py-4 bg-[#DB4444] text-white rounded-sm hover:bg-black transition-all'>
                            Proceed to checkout
                        </Link>
                    </motion.div>
                </div>
            </>
        ) : (
            /* Empty Cart State (If cartItems.length === 0 hoy tokhn) */
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 px-6 bg-[#f9f9f9] rounded-lg border-2 border-dashed border-gray-300">
                <div className="mb-6 bg-white p-5 rounded-full shadow-md">
                    <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <h2 className="font-popins text-[22px] font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
                <p className="font-popins text-gray-500 mb-8 text-center">Add some products to your cart to see them here.</p>
                <Link to="/" className="bg-[#DB4444] text-white px-10 py-3 rounded-sm font-popins hover:bg-black transition-all">
                    Go Shopping
                </Link>
            </motion.div>
        )}
    </div>
</section>
    );
};

export default Cart;