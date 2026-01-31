import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileEdit from '../component/UserProfileEdit';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { AxiosError } from 'axios';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { setUserDetails } from '../store/userSlice';
import fetchUserDetails from '../utils/fetchUserDetails';


const Profile = () => {
    const user =useSelector(state => state?.user)
    const [openProfileEdit, setProfileEdit] = useState(false)
    const [userData,setUserData] =useState({
      name : user.name,
      email : user.email,
      mobile : user.mobile
    })
    const [loading,setloading]= useState(false)

    const dispatch = useDispatch()

    useEffect(()=>{
        setUserData({
          name : user.name,
          email : user.email,
          mobile : user.mobile
        })
    },[user])

    const handleOnChange =(e)=>{
        const {name,value} = e.target 
      
      setUserData((preve)=>{
        return{
          ...preve,
          [name]:value
          
        }
      })
    }

    const handleSubmit = async(e)=>{
      e.preventDefault()
      try {
          setloading(true)
          const response =await Axios({
          ...SummaryApi.updateUserDetails,
          data: userData
          })
          const {data: responseData}= response

          if(responseData.success){
            toast.success(responseData.message)
            const userData =await fetchUserDetails()
            dispatch(setUserDetails(userData.data))
          }
      } catch (error) {
        AxiosToastError(error)
      }finally{
        setloading(false)
      }
    }
  return (
    <div className='p-4'>
      {/** Profile updload display image*/ }
        <div className='w-20 h-20 bg-red-400 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
            {
              user?.avatar ?(
                  <img 
                   alt={user.name}
                   src={user.avatar} 
                   className='w-full h-full  '/>
                  ) : (
                <FaRegUserCircle size={70} />
              )
            }
        </div>
        <button onClick={()=> setProfileEdit(true)} className='text-sm min-w-20 border border-blue-200 hover:border-blue-700
         hover:bg-blue-300 px-3 py-1 rounded-full mt-4'>Edit</button>
          {
            openProfileEdit && (
            <UserProfileEdit close={()=> setProfileEdit(false)}/>

            )
          }

          {/**User Details */}

          <form className='mt-4 grid gap-4 ' onSubmit={handleSubmit}>
              <div className='grid'>
                  <label>Name</label>
                  <input 
                  type="text" 
                  placeholder='Enter your Name'
                  className='p-2 bg-blue-50 outline-none border focus-within:border-blue-900 rounded'
                  value={userData.name}
                  name = "name"
                  onChange={handleOnChange}
                  required
                  />
              </div>

               <div className='grid'>
                  <label htmlFor='email'>Email</label>
                  <input 
                  type="email"
                  id='email' 
                  placeholder='Enter your Email'
                  className='p-2 bg-blue-50 outline-none border focus-within:border-blue-900 rounded'
                  value={userData.email}
                  name = "email"
                  onChange={handleOnChange}
                  required
                  />
              </div>

              <div className='grid'>
                  <label htmlFor='mobile'>Mobile</label>
                  <input 
                  type="number"
                  id='mobile' 
                  placeholder='Enter your Phn Number'
                  className='p-2 bg-blue-50 outline-none border focus-within:border-blue-900 rounded'
                  value={userData.mobile}
                  name = "mobile"
                  onChange={handleOnChange}
                  required
                  />
              </div>

              <button className='border px-4 py-2 font-semibold
              hover:bg-green-500 text-black hover:text-white rounded'>
                {
                  loading ? "Loading..." : "Submit"
                }
                </button>
          </form>
    </div>
  )
}

export default Profile
