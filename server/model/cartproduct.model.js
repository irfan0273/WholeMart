import mongoose, { mongo } from "mongoose";

const cartProductSchema = new mongoose.Schema({
    priductId:{
        type:mongoose.Schema.ObjectId,
        ref :"Product"
    },
    quantity:{
        type:Number,
        default:1
    },
    userId:{
        typr:mongoode.Schema.ObjectId,
        ref:"User"
    },
},{
    timestamps: true
})
const cartProductModel = mongoose.model('cartProduct', cartProductSchema)
export default cartProductModel