import React, { useEffect, useState } from 'react'
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from "react-icons/ti";
import { FaMinus } from "react-icons/fa6";
import { PiPlusBold } from "react-icons/pi";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useParams } from 'react-router'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/Slice/cartSlice'
import { addToWishlist } from '../../redux/Slice/wishlistSlice';
import Swal from 'sweetalert2';

// Images
import Arrivl1 from '../../assets/images/NewArrival_main/arrivals1.png'
import Arrivl2 from '../../assets/images/NewArrival_main/arrivals2.png'
import Arrivl3 from '../../assets/images/NewArrival_main/arrivals3.png'
import Arrivl4 from '../../assets/images/NewArrival_main/arrivals4.png'

function ProductDetails() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [productdetails, setProductdetails] = useState({})
    const [tags, setTags] = useState([])
    const [previewImg, setpreviewImg] = useState('')
    const [gallary, setGallary] = useState([])
    const [cartSuccess, setCartSuccess] = useState(false)
    
    // Selection States
    const [selectedColor, setSelectedColor] = useState('blue')
    const [selectedSize, setSelectedSize] = useState('M')
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        axios.get(`https://dummyjson.com/products/${id}`)
            .then((details) => {
                setProductdetails(details.data)
                setTags(details.data.tags || [])
                setpreviewImg(details.data.thumbnail)
                setGallary(details.data.images || [])
            })
    }, [id])

    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    
    const Related_products = [
        { id: 1, name: 'HAVIT HV-G92 Gamepad', image: Arrivl1, dprice: '120', price: '160', ratting: '88', discound: '40' },
        { id: 2, name: 'AK-900 Wired Keyboard', image: Arrivl2, dprice: '960', price: '1160', ratting: '75', discound: '35' },
        { id: 3, name: 'IPS LCD Gaming Monitor', image: Arrivl3, dprice: '370', price: '400', ratting: '99', discound: '30' },
        { id: 4, name: 'RGB liquid CPU Cooler', image: Arrivl4, dprice: '160', price: '170', ratting: '65' },
    ]
    //wishlist e Add hobar jonno
    const handleAddToWishlist = (product) => {
  dispatch(addToWishlist(product));
  Swal.fire({
    title: "Added!",
    text: "Product added to your wishlist.",
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
  });
};
    // Add Cart Notification er jonno
        useEffect(() => {
            if (cartSuccess) {
                const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            width: 'auto', 
            padding: '10px', 
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
        Toast.fire({
            icon: 'success',
            title: 'Added to cart successfully!'
        }).then(() => {
            setCartSuccess(false);
        });
    }
    }, [cartSuccess]);

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: productdetails.id,
            title: productdetails.title,
            price: productdetails.price,
            thumbnail: productdetails.thumbnail,
            quantity
        }))
        setCartSuccess(true)
    }

    return (
        <section className='pt-10 md:pt-25 pb-14'>
            <div className="my-container px-4">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-17">
                    
                    {/* Left Side: Images */}
                    <div className="w-full lg:w-[60%] flex flex-col-reverse md:flex-row gap-5">
                        <div className='w-full md:w-[25%] flex md:flex-col flex-row gap-4 overflow-x-auto'>
                            {gallary.map((gal, index) => (
                                <div key={index} onClick={() => setpreviewImg(gal)} 
                                     className={`bg-[#F5F5F5] p-2 rounded-sm cursor-pointer border-2 transition-all ${previewImg === gal ? 'border-[#DB4444]' : 'border-transparent'}`}>
                                    <img src={gal} alt="gallery" className="w-16 h-16 md:w-full md:h-24 object-contain" />
                                </div>
                            ))}
                        </div>
                        <div className='bg-[#F5F5F5] w-full md:w-[75%] p-6 flex items-center justify-center rounded-sm'>
                            <img src={previewImg} alt={productdetails.title} className='max-h-75 md:max-h-125 object-contain' />
                        </div>
                    </div>

                    {/* Right Side: Details */}
                    <div className="w-full lg:w-[40%]">
                        <h3 className='text-black text-2xl md:text-3xl font-semibold mb-3'>{productdetails.title}</h3>
                        
                        {/* Star Rating */}
                        <div className='flex gap-2 items-center mb-4'>
                            <div className='flex text-[#FFAD33]'>
                                <TiStarFullOutline /><TiStarFullOutline /><TiStarFullOutline /><TiStarFullOutline /><TiStarHalfOutline />
                            </div>
                            <span className='text-gray-400 font-popins leading-6 text-sm'>({productdetails.reviews?.length || 0} Reviews)</span>
                        </div>

                        <h4 className='text-2xl font-inter leading-6 font-medium mb-4'>${productdetails.price}</h4>
                        <p className='text-sm text-gray-600 mb-6 pb-6 border-b font-popins leading-6 border-gray-300'>{productdetails.description}</p>

                        {/* Colours - Selectable Radio Button */}
                        <div className='mb-6 flex items-center gap-4'>
                            <h3 className='text-lg font-inter leading-6'>Colours:</h3>
                            <div className='flex gap-2'>
                                <div onClick={() => setSelectedColor('blue')} className={`w-6 h-6 rounded-full bg-[#A0BCE0] cursor-pointer border-2 ${selectedColor === 'blue' ? 'border-black' : 'border-transparent'}`}></div>
                                <div onClick={() => setSelectedColor('red')} className={`w-6 h-6 rounded-full bg-[#E07575] cursor-pointer border-2 ${selectedColor === 'red' ? 'border-black' : 'border-transparent'}`}></div>
                            </div>
                        </div>

                        {/* Size - Selectable */}
                        <div className='mb-6 flex items-center gap-4'>
                            <h3 className='text-lg font-inter'>Size:</h3>
                            <div className='flex gap-2 flex-wrap'>
                                {sizes.map(size => (
                                    <button 
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-10 h-10 border font-popins leading-6 rounded-sm text-sm font-medium transition-all cursor-pointer ${selectedSize === size ? 'bg-[#DB4444] text-white border-[#DB4444] font-popins leading-6' : 'border-gray-400 hover:border-black'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity & Cart */}
                        <div className='flex flex-wrap gap-4 items-center'>
                            <div className='flex border border-gray-400 rounded-sm h-11'>
                                <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className='px-3 hover:bg-gray-100 cursor-pointer'><FaMinus /></button>
                                <span className='w-14 flex items-center justify-center font-bold border-x border-gray-400'>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className='px-3 bg-[#DB4444] text-white cursor-pointer'><PiPlusBold /></button>
                            </div>
                            <button onClick={handleAddToCart} className='flex-1 bg-[#DB4444] text-white py-2.5 rounded-sm font-medium hover:bg-black transition-all font-popins leading-6 cursor-pointer'>Add to Cart</button>
                            <div 
                                onClick={() => handleAddToWishlist({
                                    id: productdetails.id,
                                    name: productdetails.title, 
                                    price: productdetails.price,
                                    image: productdetails.thumbnail, 
                                    discount: productdetails.discountPercentage
                                })} 
                                className='p-2 border border-gray-400 rounded-sm cursor-pointer hover:bg-red-50'>
                                <AiOutlineHeart className='text-2xl' />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Full Description & Features */}
                <div className='mt-16 flex flex-col gap-10'>
                    <div>
                        <h3 className='text-2xl font-inter leading-6 font-semibold mb-4'>Description</h3>
                        <p className='text-gray-600 font-popins leading-relaxed'>{productdetails.description}</p>
                    </div>
                    <div>
                        <h3 className='text-2xl font-inter leading-6 font-semibold mb-4'>Features</h3>
                        <p className='text-gray-600 font-popins leading-relaxed'>
                            The St. Louis Meramec Canoe Company was founded by Alfred Wickett in 1922. 
                            Wickett had previously worked for the Old Town Canoe Co from 1900 to 1914.
                        </p>
                    </div>
                    <div>
                        <h3 className='text-2xl font-inter leading-6 font-semibold mb-4'>Keywords</h3>
                        <div className='flex flex-wrap gap-2'>
                            {tags.map((tag, i) => (
                                <span key={i} className='bg-gray-100 px-4 py-2 rounded-full text-xs text-gray-600 border border-gray-200 font-popins'>#{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div className='mt-20'>
                    <div className='flex items-center gap-4 mb-10'>
                        <div className='w-5 h-10 bg-[#DB4444] rounded-sm'></div>
                        <h2 className='text-2xl font-semibold font-inter leading-6'>Related Items</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Related_products.map(related => (
                            <div key={related.id} className='group'>
                                <div className='bg-[#F5F5F5] p-10 h-62.5 relative flex items-center justify-center rounded-sm'>
                                    <img src={related.image} alt="" className='group-hover:scale-105 transition-all' />
                                    {related.discound && (
                                        <div className='absolute top-3 left-3 bg-[#DB4444] text-white text-xs px-2 py-1 rounded-sm font-popins'>-{related.discound}%</div>
                                    )}
                                </div>
                                <h3 className='mt-4 font-medium font-inter leading-6'><Link to={`/product/${related.id}`}>{related.name}</Link></h3>
                                <p className='mt-2 flex gap-3 font-popins'><span className='text-[#DB4444]'>${related.dprice}</span><del className='text-gray-400'>${related.price}</del></p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductDetails