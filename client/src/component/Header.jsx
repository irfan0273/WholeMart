import React  from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import useMobile from '../hooks/useMoblie';
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import { useState } from 'react';
import UserMenu from './UserMenu';


const Header = () => {
  const [isMoblie]= useMobile()
  const location = useLocation()
  const isSearchPage = location.pathname === '/search'
  const navigate = useNavigate()
  const user = useSelector((state)=> state?.user)
  const [openUserMenu, setOpenUserMenu] = useState(false)
  
  const  redirectToLoginPage=()=>{
    navigate('/login')

  }

  const handleCloseUserMenu= ()=>{
    setOpenUserMenu(false)
  }

  const handleMoblieUser=()=>{
    if (!user._id){
      navigate('/login')
      return
    }
    navigate('/user')

  }

  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex  flex-col justify-center bg-white" >
      {
        !(isSearchPage && isMoblie) && (
            <div className='container mx-auto  flex items-center p-2 justify-between  '>
      {/**logo */}
      
        <Link to={'/'} className='h-full flex items-center justify-center'>
          <img src={logo} 
          width={170}
          height={60}
          alt='logo' 
          className='hidden md:block'/>

             <img src={logo} 
          width={120}
          height={60}
          alt='logo'
          className='md:hidden' />
        </Link>
        
      

      {/**Search */}
      <div className='hidden lg:block'>
        <Search/>
      </div>

      {/**Login */}
      <div className=''>
        {/**User icon display in only mobile */}

        <button className='text-neutral-500 lg:hidden' onClick={handleMoblieUser}>
           <FaUserCircle size={26} />
        </button>

        {/**desktop */}
        <div className='hidden lg:flex items-center gap-10'>
          {
            user?._id?(
              <div className='relative'>
                <div onClick={()=>setOpenUserMenu(preve => !preve)} className='flex items-center select-none gap-2 cursor-pointer'>
                  <p>Account</p>
                  {
                    openUserMenu ? (
                      
                       <GoTriangleUp size={24}/> 
                    ):(
                      <GoTriangleDown size={24}/>
                      
                    )
                  }
                </div>
                {
                  openUserMenu && (
                      <div className='absolute right-0 top-12 '>
                      <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                        <UserMenu close={handleCloseUserMenu}/>
                      </div>
                  </div>
                  )
                }
                
              </div>
            ) :(

              <button onClick={redirectToLoginPage} className='text-lg px-2'>Login </button>
            )

          }
          <button className='flex items-center gap-2 bg-secondary-100 hover:bg-green-800 px-3 py-3 rounded text-white '>
            {/**Cart icon */}
             <div className='animate-bounce'>
              <IoCartOutline size={26}/>
             </div>
             <div className='font-semibold'>
              <p>My Cart</p>
             </div>
          </button>
       </div>
      </div>
    
            </div>
        )
      }
     
      <div className='container mx-auto px-2 lg:hidden'>
        <Search/>
      </div>
    </header>
  )
}

export default Header
