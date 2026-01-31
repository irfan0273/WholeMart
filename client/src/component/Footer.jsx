import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
const Footer = () => {
  return (
 <footer className='border-t '>
    <div className='container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-4 '>
        <p>© All Rights Reserved 2025</p>
        <div className='flex items-center gap-4 justify-center text-2xl'>
            <a href='' className="hover:text-blue-500">
                <FaFacebook/>
            </a>
            <a href='https://www.instagram.com/irfaaan.6/'className="hover:text-blue-500">
                <FaInstagram/> 
            </a>
            <a href=''className="hover:text-blue-500">
                <FaWhatsapp/>
            </a>
        </div>
    </div>

 </footer>
  )
}

export default Footer
