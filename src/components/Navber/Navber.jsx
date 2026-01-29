import React, { useEffect, useState } from 'react'
import { IoIosArrowDown, IoMdClose } from "react-icons/io"
import logo from '../../assets/images/Logo_main/navber_Logo.png'
import { FiSearch } from "react-icons/fi"
import { FaRegHeart, FaBars } from "react-icons/fa"
import { MdOutlineShoppingCart } from "react-icons/md"
import { RiUser3Line } from "react-icons/ri"
import { Link, useLocation } from 'react-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { authinfo } from '../../redux/Slice/authSlice'
import { IoCloseOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { removeCart } from '../../redux/Slice/cartSlice'

const Navbar = () => {
    const [menuShow, setMenuShow] = useState(false);
    const [cartShow, setCartShow] = useState(false); 
    const [isSearchOpen, setIsSearchOpen] = useState(false); 
    const [searchKeyword, setSearchKeyWord] = useState('');

    const location = useLocation();
    const currentPath = location.pathname;
    const auth = getAuth();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const handleRemove = (id) => {
        dispatch(removeCart(id));
    };

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(authinfo({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                }))
            } else {
                dispatch(authinfo(null))
            }
        })
        return () => unsub()
    }, [dispatch, auth]);

    return (
        <>
        <nav className="border-b border-[rgba(0,0,0,0.25)] relative z-50 bg-white">
            {/* ---------- TOP BAR ---------- */}
            <div className="bg-black py-2 md:py-3 text-white">
                <div className="my-container flex items-center justify-between px-4 text-[12px] sm:text-[14px]">
                    <p>Summer Sale For All Swim Suits... OFF 50%! <Link to="/Shop" className="underline font-semibold ml-1 hidden sm:inline">ShopNow</Link></p>
                    <div className="flex items-center gap-1 cursor-pointer">
                        <span>English</span> <IoIosArrowDown />
                    </div>
                </div>
            </div>

            {/* ---------- MAIN NAVBAR ---------- */}
            <div className="my-container px-4">
                <div className="flex items-center justify-between py-5 lg:py-10">
                    
                    {/* logo: Search hole Moile e Hide hobe */}
                    <div className={`${isSearchOpen ? 'hidden md:block' : 'block'} shrink-0`}>
                        <Link to="/"><img src={logo} alt="logo" className="w-24 sm:w-32" /></Link>
                    </div>

                    {/* Desktop Menu: Search bar ope hole Onno gula hidden hobe */}
                    <ul className={`hidden lg:flex items-center gap-8 xl:gap-12 font-popins text-[16px] transition-all ${isSearchOpen ? 'opacity-0 invisible w-0 overflow-hidden' : 'opacity-100 visible'}`}>
                        <li><Link to="/" className="nav_item">Home</Link></li>
                        <li><Link to="/Shop" className="nav_item">Shop</Link></li>
                        <li><Link to="/contact" className="nav_item">Contact</Link></li>
                        <li><Link to="/about" className="nav_item">About</Link></li>
                        <li><Link to="/Register" className="nav_item">Sign Up</Link></li>
                    </ul>

                    {/* Search and Action */}
                    <div className={`flex items-center justify-end gap-3 sm:gap-6 ${isSearchOpen ? 'flex-1' : ''}`}>
                        
                        {/* Animatade Search bar */}
                        <div className={`flex items-center bg-[#F5F5F5] rounded transition-all duration-500 ease-in-out relative ${isSearchOpen ? 'w-full px-4' : 'w-10 h-10 md:w-48 xl:w-60 px-0 md:px-2'}`}>
                            <input 
                                type="text" 
                                placeholder="What are you looking for?" 
                                className={`bg-transparent w-full py-2 pl-4 pr-10 text-[14px] outline-none text-black ${isSearchOpen ? 'block' : 'hidden md:block'}`}
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyWord(e.target.value)}
                            />
                            {isSearchOpen ? (
                                <IoMdClose onClick={() => setIsSearchOpen(false)} className="absolute right-3 cursor-pointer text-xl text-black z-10" />
                            ) : (
                                <FiSearch onClick={() => setIsSearchOpen(true)} className="absolute right-3 cursor-pointer text-xl text-black" />
                            )}
                        </div>

                        {/* Icon: Search ber open hole Mobile Device e hidden hobe  */}
                        <div className={`${isSearchOpen ? 'hidden md:flex' : 'flex'} items-center gap-2 sm:gap-4 transition-all duration-300`}>
                            {currentPath !== '/Register' && currentPath !== '/login' && (
                                <>
                                    <Link to="/Wishlist" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#DB4444] group transition">
                                        <FaRegHeart className="text-[20px] text-black group-hover:text-white" />
                                    </Link>
                                    <button onClick={() => setCartShow(true)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#DB4444] group transition relative">
                                        <MdOutlineShoppingCart className="text-[20px] text-black group-hover:text-white" />
                                        {cartItems.length > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-[#DB4444] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center group-hover:bg-black">
                                                {cartItems.length}
                                            </span>
                                        )}
                                    </button>
                                    <Link to="/Profile" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#DB4444] group transition">
                                        <RiUser3Line className="text-[20px] text-black group-hover:text-white" />
                                    </Link>
                                </>
                            )}
                            <div className="lg:hidden flex items-center ml-1">
                                <FaBars className="text-2xl cursor-pointer text-black" onClick={() => setMenuShow(true)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ---------- Mobile Menue (Sign Up Fixed) ---------- */}
            <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#DB4444] gap-8 text-white text-2xl font-semibold transform transition-transform duration-500 ${menuShow ? 'translate-x-0' : '-translate-x-full'}`}>
                <IoMdClose onClick={() => setMenuShow(false)} className="absolute top-6 right-6 text-4xl cursor-pointer" />
                <Link to="/" onClick={() => setMenuShow(false)}>Home</Link>
                <Link to="/Shop" onClick={() => setMenuShow(false)}>Shop</Link>
                <Link to="/contact" onClick={() => setMenuShow(false)}>Contact</Link>
                <Link to="/about" onClick={() => setMenuShow(false)}>About</Link>
                <Link to="/Register" onClick={() => setMenuShow(false)}>Sign Up</Link>
            </div>
        </nav>

        {/* --Shopping Cart Bar--- */}
        <div className={`fixed top-0 right-0 h-screen bg-white shadow-2xl z-100 transition-transform duration-300 ease-in-out 
            ${cartShow ? 'translate-x-0' : 'translate-x-full'} 
            w-full sm:w-100 md:w-112.5`}>
            
            <div className='flex justify-between py-5 px-5 items-center border-b'>
                <h3 className='text-[24px] font-inter text-black font-medium'>Shopping Cart</h3>
                <IoCloseOutline onClick={() => setCartShow(false)} className='text-[30px] cursor-pointer hover:text-red-500 transition' />
            </div>

            <div className="overflow-y-auto h-[calc(100vh-200px)] px-5">
                {cartItems.length > 0 ? (
                    cartItems.map(item => (
                        <div key={item.id} className='flex justify-between items-center py-5 border-b'>
                            <div className='flex items-center gap-4'>
                                <img className='w-16 h-16 object-cover rounded bg-gray-100 border' src={item.thumbnail} alt={item.title} />
                                <div>
                                    <h3 className="font-medium text-[14px] sm:text-[16px] text-black leading-tight">{item.title}</h3>
                                    <p className="text-gray-600 text-sm mt-1">{item.quantity} x ${item.price}</p>
                                </div>
                            </div>
                            <button onClick={() => handleRemove(item.id)} className="text-xl text-gray-400 hover:text-red-600 transition duration-200 p-2">
                                <MdDelete />
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-4 opacity-40">
                         <MdOutlineShoppingCart className="text-6xl text-gray-400" />
                         <p className="text-center text-gray-500 font-popins">Your cart is empty!</p>
                    </div>
                )}
            </div>

            <div className='absolute bottom-0 left-0 w-full p-6 bg-white border-t'>
                <Link to="/cart" onClick={() => setCartShow(false)} className='block text-center bg-[#DB4444] text-white font-popins text-[18px] font-medium rounded-md py-3 hover:bg-black transition duration-300'>
                    View Cart
                </Link>
            </div>
        </div>

        {cartShow && <div onClick={() => setCartShow(false)} className="fixed inset-0 bg-black/50 z-90"></div>}
        </>
    )
}

export default Navbar;