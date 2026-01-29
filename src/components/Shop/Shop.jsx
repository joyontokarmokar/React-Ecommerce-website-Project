import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from "react-icons/ti";
import { Link } from 'react-router';

function Shop() {
    const [loder, setLoder] = useState(true);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [visibleCount, setVisibleCount] = useState(8);
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Catagory er jonno
    useEffect(() => {
        axios.get('https://dummyjson.com/products/categories')
            .then(result => setCategories(result.data))
            .catch(err => console.log(err));
    }, []);

    // Product Fillter er jonno
    useEffect(() => {
        setLoder(true);
        let url = selectedCategory === 'all' 
            ? `https://dummyjson.com/products` 
            : `https://dummyjson.com/products/category/${selectedCategory}`;

        axios.get(url)
            .then(res => {
                setProducts(res.data.products);
                setLoder(false);
            })
            .catch(err => {
                console.log(err);
                setLoder(false);
            });
    }, [selectedCategory]);

    return (
        <section className="py-6 md:py-10 bg-white">
            <div className="my-container px-4">
                <h3 className="text-[28px] md:text-[36px] font-inter font-semibold mb-6 text-center">Shop</h3>

                {/* --- Category Horizontal Scroll (For All Devices) --- */}
                <div className="flex justify-center mb-8">
                    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x max-w-full lg:flex-wrap lg:justify-center">
                        <button 
                            onClick={() => {setSelectedCategory('all'); setVisibleCount(8);}}
                            className={`whitespace-nowrap px-6 py-2 rounded-full border text-sm md:text-base transition-all snap-start
                            ${selectedCategory === 'all' ? 'bg-[#DB4444] text-white border-[#DB4444]' : 'bg-white text-gray-600 border-gray-300 hover:border-black'}`}
                        >
                            All Products
                        </button>
                        
                        {categories.map((category, index) => {
                            const catSlug = typeof category === 'object' ? category.slug : category;
                            const catName = typeof category === 'object' ? category.name : category;
                            
                            return (
                                <button
                                    key={index}
                                    onClick={() => {setSelectedCategory(catSlug); setVisibleCount(8);}}
                                    className={`whitespace-nowrap px-6 py-2 rounded-full border text-sm md:text-base transition-all snap-start capitalize
                                    ${selectedCategory === catSlug ? 'bg-[#DB4444] text-white border-[#DB4444]' : 'bg-white text-gray-600 border-gray-300 hover:border-black'}`}
                                >
                                    {catName}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* --- Product Grid --- */}
                <div className="w-full">
                    {loder ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="animate-pulse space-y-4">
                                    <div className="h-44 md:h-64 bg-gray-100 rounded-xl"></div>
                                    <div className="h-4 bg-gray-100 w-3/4 rounded"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                {products.slice(0, visibleCount).map((product) => {
                                    const discountedPrice = (product.price - (product.price * product.discountPercentage) / 100).toFixed(2);
                                    
                                    return (
                                        <div key={product.id} className="group flex flex-col h-full border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                                            <Link to={`/Product/Details/${product.id}`} className="relative bg-[#F5F5F5] h-44 md:h-64 flex items-center justify-center p-4">
                                                <img src={product.thumbnail} className="max-h-full object-contain group-hover:scale-105 transition-transform" alt={product.title} />
                                                {product.discountPercentage > 0 && (
                                                    <div className="absolute top-2 left-2 bg-[#DB4444] text-white text-[10px] px-2 py-0.5 rounded">-{Math.round(product.discountPercentage)}%</div>
                                                )}
                                            </Link>
                                            
                                            <div className="p-3 md:p-4 flex flex-col grow">
                                                <h3 className="text-sm md:text-base font-medium text-black truncate mb-2">{product.title}</h3>
                                                <div className="mt-auto">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[#DB4444] font-bold text-sm md:text-base">${discountedPrice}</span>
                                                        <del className="text-gray-400 text-xs">${product.price}</del>
                                                    </div>
                                                    <div className="flex text-[#FFAD33] mt-1 text-xs">
                                                        {Array.from({ length: 5 }).map((_, i) => (
                                                            <TiStarFullOutline key={i} className={i < Math.floor(product.rating) ? "text-[#FFAD33]" : "text-gray-200"} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Load More */}
                            {visibleCount < products.length && (
                                <div className="text-center mt-10">
                                    <button onClick={() => setVisibleCount(prev => prev + 4)} className="bg-[#DB4444] text-white px-10 py-3 rounded hover:bg-black transition-colors">
                                        View More Products
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Shop;