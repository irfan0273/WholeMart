import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  })
  const navigate =useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }
  const validValue = Object.values(data).every(el =>el)

  const handleSubmit = async(e) => {
    e.preventDefault()
      

  try {
     const response = await Axios({
        ...SummaryApi.forgot_password,
        data: data
     })

     if(response.data.error){
      toast.error(response.data.message)
     }
     if(response.data.success){
      toast.success(response.data.message)
      navigate("/verify-otp",{
        state: data
      })
      setData({
        email: "",
      })
      
     }


      console.log("response",response)
  } catch (error) {
    AxiosToastError(error)
  }
    
  
  }
  return (
    <section className=' w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
       
       <p className='font-semibold text-lg mb-3'>Forgot Password</p>

        <form className='grid gap-2 py:4' onSubmit={handleSubmit}>
          <div className='grid gap-1'>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id='email'
              className='bg-blue-50 p-2 border rounded outline-none focus-within:border-primary-200'
              name='email'
              value={data.email}
              onChange={handleChange}
              placeholder='Enter your email'
            />
          </div>
        
          <button disabled={!validValue} className={`${validValue? "bg-green-600 hover:bg-green-800" :"bg-gray-500" } text-white py-2 rounded font-semibold mt-3 tracking-wide `}>Sent OTP</button>
        </form>

        <p>
         Already have an account ? <Link to={'/login'} className='font-semibold text-blue-400 hover:text-blue-700'>Login</Link>
        </p>
      </div>
    </section>
  )
}
export default ForgotPassword