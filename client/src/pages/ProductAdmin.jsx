import React from 'react'
import AxiosToastError from '../utils/AxiosToastError'
import { useEffect } from 'react'
import { useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import Loading from '../component/Loading'

const ProductAdmin = () => {
    const [productData, setProductData] = useState([])
      const [page,setPage] = useState(1)
      const [loading,setLoading] = useState(false)

  
      const fetchProductData =async()=>{
          try {
            setLoading(true)
              const response =await Axios({
                  ...SummaryApi.getProduct,
                  data: {
                      page :page,
                  }
              })
  
              const {data :responseData}= response 
  
              if(responseData.success){
                  setProductData(responseData.data)
              }
          } catch (error) {
              AxiosToastError(error)
          }finally{
            setLoading(false)
          }
      }
  
      useEffect(()=>{
          fetchProductData()
      },[])
  return (
    <section>
      <div className='p-2  bg-white shadow-md flex items-center justify-between '>
        <h2 className='font-semibold'>Product</h2>
      </div>
      {
        loading && (
        <Loading/>
      )
      }

      {
        productData.map((p,index)=>{
          return(
            <ProductCardAdmin ?>
          )
        })
      }
    </section>
  )
}

export default ProductAdmin
