import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline
} from "react-icons/ti";
import { Link, useParams } from 'react-router';

function CategoryProduct() {
    const { slug } = useParams();

const [loder, setLoder] = useState(true);
const [products, setProducts] = useState([]);
const [visibleCount, setVisibleCount] = useState(8);

useEffect(() => {
  setLoder(true);

  axios
    .get(`https://dummyjson.com/products/category/${slug}`)
    .then(res => {
      setProducts(res.data.products);
      setLoder(false);
    })
    .catch(err => {
      console.log(err);
      setLoder(false);
    });
}, [slug]);

  return (
    <>
       <section>
  <div className="my-container px-5 xl:px-0 pb-18.75">

    {/* ================= Header ================= */}
    <div className="pb-10 md:pb-16 pt-10">
      <h3 className="text-[#000000] text-[28px] md:text-[36px] font-inter leading-tight font-semibold capitalize text-center md:text-left">
        {slug?.replace('-', ' ')}
      </h3>
    </div>

    {/* ================= Products ================= */}
    {
      loder ? (
        // Skeleton Loader Responsive
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7.5">
          {
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4 py-1 animate-pulse">
                <div className="h-52 rounded-lg bg-gray-200"></div>
                <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                <div className="h-4 w-1/2 rounded bg-gray-200"></div>
              </div>
            ))
          }
        </div>
      ) : (
        // Main Product Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7.5 rounded-sm pb-15 md:pb-19">
          {products.slice(0, visibleCount).map((product) => {

            const discountedPrice = (
              product.price -
              (product.price * product.discountPercentage) / 100
            ).toFixed(2)

            const rating = product.rating
            const fullStar = Math.floor(rating)
            const halfStar = rating - fullStar >= 0.5

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl p-5 border border-transparent hover:border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 ease-out flex flex-col h-full"
              >
                {/* Image Container */}
                <Link to={`/Product/Details/${product.id}`} className="block mb-4 overflow-hidden rounded-xl">
                  <div className="bg-[#F5F5F5] p-8 h-56 flex items-center justify-center relative">
                    <img
                      src={product.thumbnail}
                      className="max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                      alt={product.title}
                    />
                    {/* Discount Badge */}
                    {product.discountPercentage > 0 && (
                        <div className="absolute top-3 left-3 bg-[#DB4444] text-white text-[11px] px-2.5 py-1 rounded-md">
                            -{Math.round(product.discountPercentage)}%
                        </div>
                    )}
                  </div>

                  <h3 className="pt-4 text-[#000000] text-[16px] font-popins leading-6 font-medium truncate group-hover:text-[#DB4444] transition-colors">
                    {product.title}
                  </h3>
                </Link>

                {/* Price & Rating (Auto-pushed to bottom) */}
                <div className="mt-auto">
                    <div className="flex items-center gap-3">
                      <span className="text-[#DB4444] text-[18px] font-popins font-semibold">
                        ${discountedPrice}
                      </span>
                      <del className="text-gray-400 text-[14px] font-popins font-medium">
                        ${product.price}
                      </del>
                    </div>

                    <div className="flex pt-2 gap-1 items-center">
                      <div className="flex text-[#FFAD33]">
                        {Array.from({ length: 5 }).map((_, i) => {
                            if (i < fullStar) return <TiStarFullOutline key={i} />
                            if (i === fullStar && halfStar) return <TiStarHalfOutline key={i} />
                            return <TiStarOutline key={i} />
                        })}
                      </div>
                      <span className="font-popins text-[13px] font-semibold text-gray-400 ml-1">
                        ({product.stock})
                      </span>
                    </div>
                </div>
              </div>
            )
          })}
        </div>
      )
    }

    {/* ================= View More Button ================= */}
    {
      !loder && visibleCount < products.length && (
        <div className="text-center mt-6">
          <button
            onClick={() => setVisibleCount(visibleCount + 4)}
            className="inline-block text-[16px] text-[#FAFAFA] font-popins font-medium bg-[#DB4444] rounded-md py-4 px-12 hover:bg-black hover:shadow-lg active:scale-95 transition-all duration-300"
          >
            View More Products
          </button>
        </div>
      )
    }

  </div>
</section>
    </>
  )
}

export default CategoryProduct