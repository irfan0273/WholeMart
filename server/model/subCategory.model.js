import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image:{
        type :String,
        default: ''
    },
    category:[{
        type:mongoose.Schema.ObjectId,
        ref:"Category"
    }]
}, {
    timestamps: true
})
 const subCategoryModel = mongoose.model("SubCategory" , subCategorySchema)
 export default subCategoryModel