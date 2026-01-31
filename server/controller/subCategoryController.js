
import subCategoryModel from "../model/subCategory.model.js"

export const AddSubCategoryController = async(request,response)=>{
    try {
        const {name , image , category} = request.body

        if(!name && !image && !category[0]){
            return response.status(400).json({
                message : "Enter required fields",
                error : true,
                success : false
            })
        }

        const payload ={
            name,
            image,
            category

        }

        const createSubCategory = new subCategoryModel(payload)
        const save = await createSubCategory.save()

        return response.json({
            message : "SubCategory Created",
            data : save,
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

export const getSubCategoryController =async(request,response)=>{
    try {
        const subCategory = await subCategoryModel.find().sort({createdAt: -1}).populate("category")
        return response.json({
            message : " SubCategory Data",
            data : subCategory,
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

export const updateSubCategoryController  = async(request,response)=>{
    try {
        const {_id, name, image, category} =request.body

        const checkSub = await subCategoryModel.findById(_id)

        if(!checkSub){
            return response.status(400).json({
                message : "SubCategory not found",
                error : true,
                success : false
            })
        }

        const updateSubCategory = await subCategoryModel.findByIdAndUpdate(_id,{
            name,
            image,
            category
        })
        return response.json({
            message : "SubCategory Updated",
            data : updateSubCategory,
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

export const deleteSubCategoryCOntroller =async(request,response)=>{
    try {
        const {_id} = request.body

        const deleteSubCategory = await subCategoryModel.findByIdAndDelete(_id)

        return response.json({
            message : "SubCategory Deleted",
            data : deleteSubCategory,
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