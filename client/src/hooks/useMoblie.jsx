import React,{useEffect, useState} from "react"

const useMobile = (breakpoint= 768) => {
    const [isMoblie,setMoblie]=useState(window.innerWidth< breakpoint)
    
    const handleResize = () => {
        const checkpoint = window.innerWidth < breakpoint
       setMoblie(checkpoint)
    }
useEffect(() => {
   handleResize()

   window.addEventListener("resize", handleResize)
   return () => {
       window.removeEventListener("resize", handleResize)
   }
}, [])

    return[ isMoblie]
}
export default useMobile