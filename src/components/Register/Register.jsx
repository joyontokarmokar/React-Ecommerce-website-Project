import React, { useEffect, useState } from 'react'
import register from '../../assets/images/Register/Register.png'
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router';
import { FaEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification  } from "firebase/auth";

function Register() {
  const auth = getAuth();
  const [formdata, setFormData] = useState({
      name:'',
      email:'',
      password:'',
      confirmpassword:'',
  })
  //show password Icon
  const [showpassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  //Success Pop Up
  const [Success, setSuccess] = useState(false)
  //Errors State
  const [errors, setErrors] = useState({})
  //Form Validaticon
  const validate = () => {
  let newErrors = {}
  const gmailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|\\:;"'<>,.?\/])(?=.{8,}).*$/;

  if (!formdata.name) {
    newErrors.name = 'Please enter your name'
  }
  if (!formdata.email) {
    newErrors.email = 'Please enter your email'
  }
  else if (!gmailregex.test(formdata.email)){
    newErrors.email = 'Please enter valided email'
  }
  if (!formdata.password) {
    newErrors.password = 'Please enter your password'
  }
  else if (!passregex.test(formdata.password)){
    newErrors.password = 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
  }
  if (!formdata.confirmpassword) {
    newErrors.confirmpassword = 'Please enter confirm password'
  }
  else if (!newErrors.password && formdata.password !== formdata.confirmpassword) {
  newErrors.confirmpassword = 'Password and confirm password do not match';
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
} 

// HandelChange
  const handleChange = (e) => {
  const { name, value } = e.target
  setFormData({
    ...formdata,
    [name]: value,
  })
}
//HandelSubmit
const handleSubmit = async (e) => {
  e.preventDefault()

  if (validate()) {
    setSuccess(true)
    createUserWithEmailAndPassword(auth, formdata.email, formdata.password)
    .then((userCredential) => {
      updateProfile(auth.currentUser, {
        displayName: formdata.name,
      })
      console.log(userCredential);
    })
    .then ( () => sendEmailVerification(auth.currentUser))
    .catch(error => console.log(error))
  }
}
useEffect(() => {
  if (Success) {
    setTimeout(() => setSuccess(false), 5000);
  }
}, [Success]);

  //Input er jonno
    const registerInputs = [
  {
    id: 1,
    name: "name",
    type: "text",
    placeholder: "Name",
  },
  {
    id: 2,
    name: "email",
    type: "text",
    placeholder: "Email or Phone Number",
  },
  {
    id: 3,
    name: "password",
    type: showpassword ? 'text' : 'password',
    placeholder: "Password",
  },
  {
    id: 4,
    name: "confirmpassword",
    type: showConfirmPassword ? 'text' : 'password',
    placeholder: "Confirm Password",
  },
];

  return (
    <>
    <section className='pt-10 md:pt-20 lg:pt-26.75 pb-20 md:pb-61.5 px-5 xl:px-0'>
    <div className="my-container">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 xl:gap-32.25 items-center">
            
            {/* ====== Left Side (Image) ====== */}
            <div className="hidden lg:block lg:w-[55%] xl:w-[60%]">
                <img src={register} alt="Register Illustration" className="w-full h-auto object-contain" />
            </div>

            {/* ====== Right Side (Form) ====== */}
            <div className="w-full lg:w-[45%] xl:w-[40%] max-w-125 lg:max-w-none mx-auto">
                
                {/* ✅ Success Message */}
                <div className={`
                    flex justify-between mb-6 p-4 rounded text-green-700 bg-green-100 transition-all duration-500
                    ${Success ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none absolute"}
                `}>
                    <p className="text-sm md:text-base">✅ Registration successful!</p>
                    <button className='cursor-pointer font-bold' onClick={() => setSuccess(false)}>✕</button>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Heading */}
                    <div className="text-center lg:text-left">
                        <h3 className='text-[#000000] text-[28px] md:text-[36px] font-inter font-medium leading-tight pb-3 md:pb-6'>
                            Create an account
                        </h3>
                        <p className='text-[#000000] text-[14px] md:text-[16px] font-normal font-popins leading-6'>
                            Enter your details below
                        </p>
                    </div>

                    {/* Input Fields */}
                    <div className="pt-8 md:pt-11 flex flex-col gap-6 md:gap-8">
                        {registerInputs.map((item) => (
                            <div key={item.id} className='relative'>
                                <input
                                    type={item.name === "password" ? (showpassword ? "text" : "password") : 
                                          item.name === "confirmpassword" ? (showConfirmPassword ? "text" : "password") : item.type}
                                    name={item.name}
                                    placeholder={item.placeholder}
                                    value={formdata[item.name]}
                                    onChange={handleChange}
                                    className={`
                                        w-full outline-0 border-b text-[16px] font-popins pb-2 transition-all
                                        ${errors[item.name] ? "border-red-500" : "border-[rgba(0,0,0,0.5)] focus:border-black"}
                                    `}
                                />
                                
                                {/* Password Toggle Icons */}
                                {item.name === "password" && (
                                    <div
                                        onClick={() => setShowPassword(!showpassword)}
                                        className="w-10 h-10 text-[20px] flex justify-center items-center cursor-pointer absolute -top-1 right-0 text-gray-500">
                                        {showpassword ? <FaRegEye /> : <FaEyeSlash />}
                                    </div>
                                )}

                                {item.name === "confirmpassword" && (
                                    <div
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="w-10 h-10 text-[20px] flex justify-center items-center cursor-pointer absolute -top-1 right-0 text-gray-500">
                                        {showConfirmPassword ? <FaRegEye /> : <FaEyeSlash />}
                                    </div>
                                )}

                                {/* Error Messages */}
                                <p className={`
                                    text-red-500 text-[12px] md:text-[14px] font-normal font-popins mt-1 h-4 transition-opacity duration-300
                                    ${errors[item.name] ? "opacity-100" : "opacity-0"}
                                `}>
                                    {errors[item.name] || " "}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Buttons & Links */}
                    <div className="pt-8 md:pt-10 space-y-4">
                        <button
                            type="submit"
                            className="bg-[#DB4444] w-full py-4 text-[16px] text-[#FAFAFA] font-popins font-medium rounded-sm cursor-pointer hover:bg-black transition-all active:scale-95 shadow-sm">
                            Create Account
                        </button>
                        
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 border border-[rgba(0,0,0,0.4)] w-full py-4 text-[16px] text-[#000000] font-popins font-medium rounded-sm cursor-pointer hover:bg-gray-50 transition-all active:scale-95">
                            <FcGoogle className='text-[24px]'/>
                            <span>Sign up with Google</span>
                        </button>
                        
                        <p className='text-[#000000] text-[14px] md:text-[16px] font-normal font-popins pt-6 text-center'>
                            Already have account?
                            <Link to="/login" className='font-medium ms-2 border-b border-black pb-0.5 hover:text-[#DB4444] hover:border-[#DB4444] transition-colors'>
                                Log in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
    </>
  )
}

export default Register