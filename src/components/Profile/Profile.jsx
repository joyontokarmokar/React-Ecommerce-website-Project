import { getAuth, signOut, updatePassword, updateProfile } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authinfo, logout } from '../../redux/Slice/authSlice'
import { useNavigate } from 'react-router'
import swal from 'sweetalert';
import { FaEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";

function Profile() {
    const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux theke User Data niya
  const loggeduser = useSelector((state) => state.auth.value);

  // State initialization
  const [name, setName] = useState(loggeduser?.displayName || '');
  const [password, setPassword] = useState('');
  const [conpass, setConPass] = useState('');
  const [passerror, setPassError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showpassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Logout Function
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Update Profile & Password
  const updateInfo = async (e) => {
    e.preventDefault();
    setPassError('');

    if (!name.trim()) {
      swal("Error", "Name cannot be empty", "error");
      return;
    }

    try {
      // If Password file kichu likha thakle Update hobe
      if (password) {
        if (password !== conpass) {
          setPassError('Password & Confirm Password do not match');
          return;
        }
        if (password.length < 6) {
          setPassError('Password must be at least 6 characters long');
          return;
        }
        await updatePassword(auth.currentUser, password);
        setPassword('');
        setConPass('');
      }

      // profile Name Update 
      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      //  Redux Store Update( jate referech korleo name change na hoy)
      dispatch(authinfo({ 
        ...loggeduser, 
        displayName: name 
      }));

      setSuccess(true);

    } catch (error) {
      console.error(error);
      if (error.code === 'auth/requires-recent-login') {
        swal("Security Alert", "Please login again to change sensitive info", "warning")
        .then(() => handleLogOut());
      } else {
        swal("Error", error.message, "error");
      }
    }
  };

  // Success alert logic
  useEffect(() => {
    if (success) {
      swal({
        title: "Good job!",
        text: "Profile Updated Successfully",
        icon: "success",
        button: "Ok",
      }).then(() => {
        setSuccess(false);
      });
    }
  }, [success]);

  
  return (
    <>
   <section className='pb-20 lg:pb-35'>
  <div className="my-container px-5 xl:px-0">
    {/* Welcome Message */}
    <div className='text-center md:text-end py-10 md:py-20'>
      <p className='text-[#000000] text-[14px] font-popins font-normal'>
        Welcome! <span className='text-[#DB4444] font-medium'>{loggeduser?.displayName}</span>
      </p>
    </div>

    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-21.25">
      
      {/* ====== Left Site (Sidebar Menu) ====== */}
      <div className="w-full lg:w-[25%] xl:w-[20%] flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 no-scrollbar">
        <a href="" className="whitespace-nowrap px-4 py-3 rounded-lg bg-gray-100 text-black text-[15px] font-popins font-medium transition-all hover:bg-black hover:text-white lg:hover:translate-x-2">
          My Account
        </a>
        <a href="" className="whitespace-nowrap px-4 py-3 rounded-lg bg-gray-100 text-black text-[15px] font-popins font-medium transition-all hover:bg-black hover:text-white lg:hover:translate-x-2">
          My Orders
        </a>
        <a href="" className="whitespace-nowrap px-4 py-3 rounded-lg bg-gray-100 text-black text-[15px] font-popins font-medium transition-all hover:bg-black hover:text-white lg:hover:translate-x-2">
          My WishList
        </a>
        <button
          onClick={handleLogOut}
          className="whitespace-nowrap text-left px-4 py-3 rounded-lg bg-red-100 text-red-600 text-[15px] font-popins font-medium transition-all hover:bg-red-600 hover:text-white lg:hover:translate-x-2 cursor-pointer"
        >
          LogOut
        </button>
      </div>

      {/* ====== Right Site (Edit Profile Form) ====== */}
      <div className="w-full lg:w-[75%] xl:w-[80%] rounded-sm shadow-none md:shadow-Cart py-6 md:py-10 px-5 md:px-10 lg:px-20 border border-gray-100 md:border-none">
        <h3 className='text-[#DB4444] text-[20px] font-popins font-medium pb-6 md:pb-8 text-center md:text-left'>
          Edit Your Profile
        </h3>
        
        <form onSubmit={updateInfo} className="space-y-6">
          {/* Row 1: First & Last Name */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className='w-full md:w-1/2 flex flex-col gap-2'>
              <label className="text-black font-popins">First Name</label>
              <input 
                onChange={(e) => setName(e.target.value)} 
                value={name}
                type="text" 
                placeholder='Md. Nahid Hasan' 
                className='py-3 px-4 text-[rgba(0,0,0,0.5)] bg-[#F5F5F5] rounded-sm outline-none focus:ring-1 focus:ring-red-400' 
              />
            </div>
            <div className='w-full md:w-1/2 flex flex-col gap-2'>
              <label className="text-black font-popins">Last Name</label>
              <input type="text" placeholder='Himel' className='py-3 px-4 text-[rgba(0,0,0,0.5)] bg-[#F5F5F5] rounded-sm outline-none focus:ring-1 focus:ring-red-400' />
            </div>
          </div>

          {/* Row 2: Email & Address */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className='w-full md:w-1/2 flex flex-col gap-2'>
              <label className="text-black font-popins">Email</label>
              <input type="text" placeholder={loggeduser?.email} disabled className='py-3 px-4 text-[rgba(0,0,0,0.5)] bg-[#F5F5F5] rounded-sm outline-none opacity-70 cursor-not-allowed' />
            </div>
            <div className='w-full md:w-1/2 flex flex-col gap-2'>
              <label className="text-black font-popins">Address</label>
              <input type="text" placeholder='Kingston, 5236, United State' className='py-3 px-4 text-[rgba(0,0,0,0.5)] bg-[#F5F5F5] rounded-sm outline-none focus:ring-1 focus:ring-red-400' />
            </div>
          </div>

          {/* Password Section */}
          <div className="flex flex-col gap-4">
            <label className="text-black font-popins">Password Changes</label>
            <input
              type="password"
              placeholder="Current Password"
              className="w-full py-3 px-4 bg-[#F5F5F5] rounded-sm outline-none focus:ring-1 focus:ring-red-400"
            />
            
            <div className="relative">
              <input
                type={showpassword ? "text" : "password"}
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 px-4 bg-[#F5F5F5] rounded-sm outline-none focus:ring-1 focus:ring-red-400"
              />
              <div onClick={() => setShowPassword(!showpassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[20px] cursor-pointer text-gray-500">
                {showpassword ? <FaRegEye /> : <FaEyeSlash />}
              </div>
            </div>

            {passerror && <p className="text-red-500 text-sm font-popins">{passerror}</p>}

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                value={conpass}
                onChange={(e) => setConPass(e.target.value)}
                className="w-full py-3 px-4 bg-[#F5F5F5] rounded-sm outline-none focus:ring-1 focus:ring-red-400"
              />
              <div onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[20px] cursor-pointer text-gray-500">
                {showConfirmPassword ? <FaRegEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className='flex flex-row justify-center md:justify-end gap-6 md:gap-10 items-center pt-4'>
            <button type="button" onClick={() => navigate('/profile')} className="text-black hover:text-red-600 transition-colors font-popins cursor-pointer">Cancel</button>
            <button type='submit' className='text-white text-[16px] font-popins font-medium bg-[#DB4444] rounded-sm py-4 px-8 md:px-12 hover:bg-black transition-all active:scale-95 cursor-pointer'>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
    </>
  )
}


export default Profile