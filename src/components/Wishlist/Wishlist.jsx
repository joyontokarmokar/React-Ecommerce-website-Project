import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../redux/Slice/wishlistSlice"; // পাথ চেক করে নিবেন
import { BsTrash3 } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Swal from 'sweetalert2';
import { Link } from "react-router";

const Wishlist = () => {
  const dispatch = useDispatch();
  // Redux Wiahlist e data asar jonno
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
    Swal.fire({
      title: "Removed!",
      text: "Item has been removed from wishlist.",
      icon: "info",
      timer: 1000,
      showConfirmButton: false,
    });
  };

  return (
    <>
      <section className="pt-10 md:pt-20 pb-15 md:pb-25 px-4 xl:px-0">
        <div className="my-container">
          <div className="pb-8 md:pb-15 flex justify-between items-center">
            <h3 className="font-popins font-normal text-[18px] md:text-[20px] text-black leading-6.5">
              Wishlist ({wishlistItems.length})
            </h3>
            <button className="border border-[rgba(0,0,0,0.5)] px-6 py-2 rounded-sm text-[14px] font-medium md:hidden">
              Move All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-7.5">
            {wishlistItems.map((related) => (
              <div key={related.id} className="product_item group">
                <div className="bg-[#F5F5F5] pt-10 px-6 pb-16 relative rounded-sm overflow-hidden">
                  <img
                    src={related.image}
                    alt={related.name}
                    className="mx-auto h-37.5 md:h-45 object-contain transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                  />

                  {related.discound && (
                    <div className="w-12 h-6 md:w-13.75 md:h-6.5 rounded-sm bg-[#DB4444] flex items-center justify-center absolute top-3 left-3">
                      <span className="text-[#FAFAFA] text-[10px] md:text-[12px] font-popins font-normal">
                        -{related.discound}%
                      </span>
                    </div>
                  )}

                  {/* Delete Icon - Now Functional */}
                  <div
                    className="w-8 h-8 md:w-8.5 md:h-8.5 rounded-full bg-[#FFFFFF] flex justify-center items-center absolute top-3 right-3 cursor-pointer hover:bg-[#DB4444] hover:text-white transition-colors shadow-sm"
                    onClick={() => handleRemove(related.id)}
                  >
                    <BsTrash3 className="text-sm md:text-base" />
                  </div>

                  <button className="absolute bottom-0 left-0 w-full bg-black text-white py-2.5 flex items-center justify-center gap-2 text-[12px] md:text-[14px] font-popins opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 cursor-pointer">
                    <AiOutlineShoppingCart className="text-[16px]" />
                    <Link to={"/cart"}> Add To Cart</Link>
                  </button>
                </div>

                <div className="pt-4">
                  <h3 className="text-[#000000] text-[14px] md:text-[16px] font-popins leading-6 font-medium truncate">
                    {related.name}
                  </h3>
                  <div className="pt-1 flex items-center gap-3">
                    <span className="text-[#DB4444] text-[14px] md:text-[16px] font-popins font-medium">
                      ${related.price}
                    </span>
                    {related.dprice && (
                      <del className="text-[rgba(0,0,0,0.50)] text-[14px] md:text-[16px] font-popins font-medium">
                        ${related.dprice}
                      </del>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {wishlistItems.length === 0 && (
            <p className="text-center py-10 text-gray-500">Your wishlist is empty!</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Wishlist;