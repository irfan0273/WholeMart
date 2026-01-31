import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { setUserDetails } from "../store/userSlice";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const navigate =useNavigate()
  const dispatch =useDispatch()

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
        ...SummaryApi.login,
        data: data
     })

     if(response.data.error){
      toast.error(response.data.message)
     }
     if(response.data.success){
      toast.success(response.data.message)
      localStorage.setItem('accesstoken',response.data.data.accesstoken)
      localStorage.setItem('refreshtoken',response.data.data.refreshtoken)

        const userDetails = await fetchUserDetails()
        dispatch(setUserDetails(userDetails.data))

      setData({
        email: "",
        password: "",
      })
      navigate("/")
     }


      console.log("response",response)
  } catch (error) {
    AxiosToastError(error)
  }
    
  
  }
  return (
    <section className=' w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
       

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
          <div className='grid gap-1'>
            <label htmlFor="password">Password:</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
              <input
                type={showPassword ? "text" : "password"}
                id='password'
                className='w-full outline-none'
                name='password'
                value={data.password}
                onChange={handleChange}
                placeholder='Enter your password'
              />

              <div onClick={() => setShowPassword(preve => !preve)} className='cursor-pointer'>
                {
                  showPassword ? (
                    <IoEyeOutline />
                  ) : (
                    <FaRegEyeSlash />

                  )
                }

              </div>
            </div>
            <Link to={'/forgot-password'} className='block ml-auto hover:text-blue-600 '>Forgot Password?</Link>
          </div>
        
          <button disabled={!validValue} className={`${validValue? "bg-green-600 hover:bg-green-800" :"bg-gray-500" } text-white py-2 rounded font-semibold mt-3 tracking-wide `}>Login</button>
        </form>

        <p>
         Don't have an account ? <Link to={'/register'} className='font-semibold text-blue-400 hover:text-blue-700'>Register</Link>
        </p>
      </div>
    </section>
  )
}
export default Login