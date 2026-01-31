import categoryModel from "../model/category.model.js";
import productModel from "../model/product.model.js";
import subCategoryModel from "../model/subCategory.model.js";

export const AddCategoryController =async (request,response)=>{
    try {
        const {name, image} = request.body
        if(!name, !image){
            return response.status(400).json({
                message : "Enter required fields",
                error : true,
                success : false
            })
        }

    const addcategory =new categoryModel({
        name,
        image
    })
    const saveCategory =await addcategory.save()

    if(!saveCategory){
        return response.status(500).json({
            message : "Not Created",
            error : true,
            success : false 
        })
    }

    return response.json({
        message: "Add category",
        data : saveCategory,
        error: false,
        success: true
    })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getCategoryController =async (request,response)=>{
    try {
        const data =await categoryModel.find().sort({createdAt :-1})

        return response.json({
            data : data,
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
export const updateCategoryController =async (request,response)=>{
    try {
        const {_id, name, image} = request.body

        const update = await categoryModel.updateOne({
            _id : _id
        },{
            name,
            image
        })
        return response.json({
            message : "Update category",
            data : update,
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

export const deleteCategoryController =async (request,response)=>{
    try {
        const {_id} =request.body

        const checkSubCategory =await subCategoryModel.find({
            category : {
                "$in" : [_id]
            }
        }).countDocuments()

        const checkProduct =await productModel.find({
            category : {
                "$in" : [_id]
            }
        }).countDocuments()

        if(checkSubCategory > 0  || checkProduct>0){
            return response.status(400).json({
                message : "Category is Already Used",
                error : true,
                success : false
            })
        }

        const deleteCategory = await categoryModel.deleteOne({_id :_id})

        return response.json({
            message : "Delete Category Successfully",
            data : deleteCategory,
            error : false,
            success : true
        })


    } catch (error) {
        response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}