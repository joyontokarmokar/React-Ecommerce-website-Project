import React, { useEffect, useState } from 'react'
import register from '../../assets/images/Register/Register.png'
import { FaEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authinfo } from '../../redux/Slice/authSlice';

function Login() {
  const navigate = useNavigate()
  const auth = getAuth();
  //Dispatch Function reducer kaj er jonno
  const dispatch = useDispatch()
  // Form Data
  const [formData, setFormData] = useState({
    email:'',
    password:'',
  })
  //Show Passoword
  const [showpassword, setShowPassword] = useState(false)
  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]: value,
  });
};

//LonIn PopUp
const [Success, setSuccess] = useState(false)

//Error State
const [errors, setErrors] = useState({})

//Validation State
const Validate =() => {
  let newErrors = {}
  if(!formData.email){
    newErrors.email = 'Please Enter Your Email'
  }
  if(!formData.password){
    newErrors.password = 'Please Enter Your Password'
  }
  setErrors(newErrors)
  return Object.keys(newErrors).length === 0

}

//HandleSubmit
const handleSubmit = (e) => {
  e.preventDefault()

  if (Validate()) {
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        setErrors({})
          setSuccess(true)

          const user = userCredential.user
          dispatch(authinfo({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          }))
          setTimeout(() => navigate('/'), 1500)
        })
      .catch(() => {
        setErrors({ firebase: "Invalid email or password" })
      })
  }
}



//Regiser Input Info
  const registerInputs = [
  {
    id: 1,
    name: "email",
    type: "email",
    placeholder: "Email or Phone Number",
  },
  {
    id: 2,
    name: "password",
    type: showpassword ? 'text' : 'password',
    placeholder: "Password",
  },
];
  return (
    <>
    <section className='pt-10 md:pt-20 lg:pt-26.75 pb-20 md:pb-61.5 px-5 xl:px-0'>
    <div className="my-container">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 xl:gap-32.25 items-center">
            
            {/* ====== Left Side (Image) ====== */}
            <div className="hidden lg:block lg:w-[55%] xl:w-[60%]">
                <img src={register} alt="Auth Illustration" className="w-full h-auto object-contain" />
            </div>

            {/* ====== Right Side (Form) ====== */}
            {/* mx-auto add kora hoyeche jate mobile-e majhkhane thake */}
            <div className="w-full lg:w-[45%] xl:w-[40%] max-w-112.5 mx-auto lg:mx-0">
                
                {/* ❌ Error Message */}
                <div className={`
                    flex justify-between mb-4 p-4 rounded text-red-700 bg-red-100 transition-all duration-500
                    ${errors.firebase ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none absolute"}
                `}>
                    <p className="text-sm">❌ {errors.firebase}</p>
                    <button className="cursor-pointer font-bold" onClick={() => setErrors({})}>✕</button>
                </div>

                {/* ✅ Success Message */}
                <div className={`
                    flex justify-between mb-4 p-4 rounded text-green-700 bg-green-100 transition-all duration-500
                    ${Success ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none absolute"}
                `}>
                    <p className="text-sm">✅ LogIn successful!</p>
                    <button className='cursor-pointer font-bold' onClick={() => setSuccess(false)}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className="w-full">
                    {/* Heading - text-center for mobile */}
                    <div className="text-center lg:text-left">
                        <h3 className='text-[#000000] text-[28px] md:text-[36px] font-inter font-medium leading-tight pb-3'>
                            Log in to Exclusive
                        </h3>
                        <p className='text-[#000000] text-[16px] font-normal font-popins'>
                            Enter your details below
                        </p>
                    </div>

                    {/* Input Fields */}
                    <div className="pt-10 flex flex-col gap-6 md:gap-8">
                        {registerInputs.map((item) => (
                            <div key={item.id} className='relative'>
                                <input
                                    name={item.name}
                                    value={formData[item.name]}
                                    onChange={handleChange}
                                    type={item.type === "password" ? (showpassword ? "text" : "password") : item.type}
                                    placeholder={item.placeholder}
                                    className="w-full outline-0 border-b border-[rgba(0,0,0,0.5)] text-[16px] font-popins pb-2 focus:border-[#DB4444] transition-colors"
                                />
                                
                                {item.name === "password" && (
                                    <div
                                        onClick={() => setShowPassword(!showpassword)}
                                        className="w-10 h-10 text-[20px] flex justify-center items-center cursor-pointer absolute top-0 right-0 text-gray-500">
                                        {showpassword ? <FaRegEye /> : <FaEyeSlash />}
                                    </div>
                                )}
                                
                                <p className={`
                                    text-red-500 text-[12px] font-popins mt-1 min-h-5 transition-opacity duration-300
                                    ${errors[item.name] ? "opacity-100" : "opacity-0"}
                                `}>
                                    {errors[item.name] || ""}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Buttons & Links */}
                    <div className="pt-8 flex flex-col sm:flex-row gap-6 justify-between items-center">
                        <button
                            type="submit"
                            className="w-full sm:w-auto bg-[#DB4444] py-4 px-12 text-[16px] text-[#FAFAFA] font-popins font-medium rounded-sm cursor-pointer hover:bg-black transition-all active:scale-95 shadow-md">
                            Log In
                        </button>
                        <a href="#" className='text-[#DB4444] text-[16px] font-normal font-popins hover:underline transition-all'>
                            Forget Password?
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
    </>
  )
}

export default Login