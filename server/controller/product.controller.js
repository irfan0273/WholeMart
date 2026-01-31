import productModel from "../model/product.model.js"

export const createProductController =async(request,response)=>{
  try {
      const {
        name,
        image,
        category,
        subCategory,
        unit,stocks,
        description,
        discount,
        more_details,
        price
      }=request.body
      if(!name && !image[0] && !category[0] && !subCategory[0] && !unit && !stocks && !description && !more_details && !price){
        return response.status(400).json({
            message : "Enter required fields",
            error : true,
            success : false
        })
      }
      const product =new productModel({
         name,
        image,
        category,
        subCategory,
        unit,stocks,
        description,
        discount,
        more_details,
        price
      })

      const saveProduct = await product.save()

      return response.json({
          message : "Product Created",
          data : saveProduct,
          error : false,
          success : true
      })
  } catch (error) {
    return response.status(500).json({
        message : error.message || error,
        error : true,
        success : false
        
    })
  }
}

export const getProductController =async(request,response)=>{
  try {
      let {page, limit , search }= request.body

      if(!page){
        page =1
      }

      if(!limit){
        limit =10
      }

      const query =search ?{
        $text : {
          $search :search
        }
      } : {}

      const skip =(page -1)*limit

      const [data,totalCount] = await  Promise.all([
        productModel.find(query).sort({createdAt:-1}).skip(skip).limit(limit),
        productModel.countDocuments(query)
      ])

      return response.json({
          message : "Product Data",
          data : data,
          totalCount : totalCount,
          error : false,
          success : true,
          totalNoPage :Math.ceil(totalCount/limit)

      })
  } catch (error) {
    return response.status(500).json({
        message : error.message || error,
        error : true,
        success : false
    })
  }
}