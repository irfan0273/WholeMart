import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeftLong } from "react-icons/fa6";
import useMobile from '../hooks/useMoblie';

function Search() {
    const navigate= useNavigate();
    const location= useLocation();
    const [isSearchPage,setIsSearchPage]= useState(false)
    const [isMoblie]= useMobile()

useEffect(()=>{
  const isSearch =location.pathname==='/search'
  setIsSearchPage(isSearch)
},[location])

     const redirectToSearchPage=()=>{
      navigate('/search')
     }
     


  return (
    <div className='w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-600 bg-slate-50 group focus-within:border-primary-200'>
    <div>
        

      {
        (isMoblie && isSearchPage) ? (
          <Link to={"/"} className='flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200 bg-white rounded-full shadow-md'>
      <FaArrowLeftLong />
      </Link>
        ):(
          <button className='flex justify-center items-center h-full p-3 group-focus-within:text-primary-200'>
      <IoSearch  size={20}/>
      </button>
        )
        
      }

      
    </div>
      <div className='w-full h-full'>
        {
          !isSearchPage ? (
            // not in search page
             <div onClick={redirectToSearchPage} className='w-full h-full flex items-center'>
        <TypeAnimation
      sequence={[
        'Search "Milk"',
        1000, 
        'Search "Rice"',
        1000,
        'Search "Coconut Oil"',
        1000,
        'Search "Sugar"',
        1000
      ]}
      wrapper="span"
      speed={150}
      repeat={Infinity}
    />
      </div>
          ) :(
            //when i was search page
            <div className='w-full h-full'>
              <input type='text'
              placeholder='Search for Atta Dal And More'
              autoFocus
              className='bg-transparent w-full h-full outline-none'/>
            </div>
          )
        }

      </div>
     
    </div>
  )
}

export default Search
