import React, { useState } from 'react'
import UploadCategoryModel from '../component/UploadCategoryModel'
import { useEffect } from 'react'
import Loading from '../component/Loading'
import NoData from '../component/NoData'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import EditCategory from '../component/EditCategory'
import ConfirmBox from '../component/ConfirmBox'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { useSelector } from 'react-redux'
import { all } from 'axios'

const Category = () => {

    const [openUploadCategory, setUploadCategory] =useState(false)
    const [loading, setLoading]= useState(false)
    const [categoryData,setCategoryData]=useState([])
    const [openEdit,setOpenEdit] =useState(false)
    const [editData,setEditData] = useState({
      name : "",
      image : ""
    })
    const [openConfirmBoxDelete,setOpenConfirmBoxDelete] = useState(false)
    const [deletecategory, setDeleteCategory] = useState({
      _id: ""
    })

    const allCategory = useSelector(state =>state.product.allCategory)

    useEffect(()=>{
      setCategoryData(allCategory)
    },[allCategory])
  
    const fetchCategory =async()=>{
      try {
        setLoading(true)
        const response =await Axios({
          ...SummaryApi.getCatrgory
        })

        const {data : responseData} =response

        if(responseData.success){
          setCategoryData(responseData.data)
        }
      } catch (error) {
        AxiosToastError(error)
      }finally{
        setLoading(false)
      }
    }
    useEffect(()=>{
      fetchCategory()
    },[])

    const handleDeleteCategory = async()=>{
      try {
        const response = await Axios({
          ...SummaryApi.deleteCategory,
          data: deletecategory
        })

        const {data : responseData} =response
        if(responseData.success){
          toast.success(responseData.message)
          setOpenConfirmBoxDelete(false)
          fetchCategory()
        }
      } catch (error) {
        AxiosToastError(error)
      }
    }
  return (
    <section>
        <div className='p-2  bg-white shadow-md flex items-center justify-between '>
            <h2 className='font-semibold'>Category</h2>
            <button onClick={()=>setUploadCategory(true)} 
            className='text-sm border border-green-600 hover:bg-green-500 hover:text-white
             px-3 py-1 rounded '>Add Category</button>
        </div>
        {
          !categoryData[0]&& !loading &&(
            <NoData/>
          )
        }

        <div className='p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2'>
          {
          categoryData.map((category,index)=>{
            return(
              <div className='w-32 h-56  rounded shadow-md'>
                  <img
                     alt={category.name}
                     src={category.image}
                     className='w-full object-scale-down '
                     />

                     <div className='items-center h-9  flex gap-2'>
                      <button onClick={()=>{
                        setOpenEdit(true)
                        setEditData(category)
                      }} className='flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1  rounded '>
                        Edit
                      </button>
                      <button 
                      onClick={()=>{
                        setOpenConfirmBoxDelete(true) 
                        setDeleteCategory(category)
                      }}

                      className='flex-1  bg-red-100  hover:bg-red-200 text-red-600 font-medium py-1 rounded  '>
                        Delete
                      </button>
                     </div>
              </div>
            )
          })
        }
        </div>

        {
          loading && (
            <Loading/>
          )
        }

        {
            openUploadCategory && ( 
             <UploadCategoryModel fetchCategory={fetchCategory} close={()=>setUploadCategory(false)}/>
             )
        }
        {
          openEdit && (
            <EditCategory data={editData}close={()=>setOpenEdit(false)} fetchCategory={fetchCategory}/>
          )
        }
        {
          openConfirmBoxDelete &&(
            <ConfirmBox close={()=>setOpenConfirmBoxDelete(false)}cancel={()=>setOpenConfirmBoxDelete(false)} confirm={handleDeleteCategory}/>
          )
        }
    </section>
  )
}

export default Category
