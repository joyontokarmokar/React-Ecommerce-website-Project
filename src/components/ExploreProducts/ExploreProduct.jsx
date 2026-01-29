import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline
} from "react-icons/ti";
import { Link } from 'react-router-dom';
import { MdOutlineShoppingCart } from "react-icons/md";
import { addToCart } from '../../redux/Slice/cartSlice'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

function ExploreProduct() {

  const [products, setProducts] = useState([])
  const [loder, setLoder] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const dispatch = useDispatch()
  const [cartSuccess, setCartSuccess] = useState(false)

  useEffect(() => {
    setLoder(true);
    axios
      .get('https://dummyjson.com/products')
      .then(res => setProducts(res.data.products))
      .catch(err => console.log(err))
      .finally(() => setLoder(false));
  }, [])
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
      //handelAddToCart
      const handleAddToCart = (id) => {
      const itemToAdd = products.find(product => product.id === id);
        if (itemToAdd) {
          dispatch(addToCart({
              id: itemToAdd.id,
              title: itemToAdd.title,
              price: itemToAdd.price,
              thumbnail: itemToAdd.thumbnail,
              quantity: 1
        }));
        setCartSuccess(true);
    }
};

  return (
    <section className="my-container pb-20 px-5 xl:px-0">
      
      {/* Header */}
      <div className="pb-14 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold font-inter text-gray-900">
          Explore Our Products
        </h2>
      </div>

      {/* Products */}
      {loder ? (
        // Skeleton Loader
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse space-y-4">
              <div className="h-52 w-full rounded-lg bg-gray-200" />
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, visibleCount).map(product => {

            const discountedPrice = (product.price - (product.price * product.discountPercentage) / 100).toFixed(2);
            const rating = product.rating;
            const fullStar = Math.floor(rating);
            const halfStar = rating - fullStar >= 0.5;

            return (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-out overflow-hidden cursor-pointer group">
                <Link to={`/Product/Details/${product.id}`}>
                  <div className="bg-gray-100 p-4 flex justify-center items-center h-52 relative">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className='top-5 right-5 absolute'>
                        <div 
                            onClick={() => handleAddToCart(product.id)} 
                            className='bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-[#DB4444] hover:text-white transition-all duration-300'
                            title="Add to Cart">
                            <MdOutlineShoppingCart className='text-[20px]'/>
                        </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {product.title}
                    </h3>

                    <div className="flex items-center gap-2 mt-2">
                      <del className="text-gray-400">${product.price}</del>
                      <span className="text-red-600 font-semibold">${discountedPrice}</span>
                    </div>

                    <div className="flex items-center gap-1 mt-2">
                      {Array.from({ length: 5 }).map((_, i) => {
                        if (i < fullStar)
                          return <TiStarFullOutline key={i} className="text-yellow-400" />
                        if (i === fullStar && halfStar)
                          return <TiStarHalfOutline key={i} className="text-yellow-400" />
                        return <TiStarOutline key={i} className="text-yellow-400" />
                      })}
                      <span className="text-gray-500 text-sm ml-1">({product.stock})</span>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      )}

      {/* View More Button */}
      {visibleCount < products.length && !loder && (
        <div className="text-center mt-10">
          <button
            onClick={() => setVisibleCount(prev => prev + 4)}
            className="bg-red-600 text-white px-8 py-3 rounded-md font-medium text-base hover:bg-red-700 active:scale-95 transition-all duration-200 cursor-pointer">
            View More Products
          </button>
        </div>
      )}
    </section>
  )
}

export default ExploreProduct;
