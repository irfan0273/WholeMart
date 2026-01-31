import React from 'react'
import UserMenu from '../component/UserMenu'
import { IoClose } from "react-icons/io5";

const UserMenuMoblie = () => {
  return (
    <section  className='bg-white h-full w-full p-3' >
      <button onClick={()=>window.history.back()} className='text-neutral-700 block w-fit ml-auto'>
        <IoClose size={25}/>
      </button>
      <div className='container mx-auto px-3 pb-6'>
        <UserMenu/>
      </div>
    </section>
  )
}

export default UserMenuMoblie
