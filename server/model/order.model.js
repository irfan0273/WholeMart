import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId :{
        type :mongoose.Schema.ObjectId,
        ref:"User"
        },
        orderId :{
            type :String,
            required :[true,"provide order id"],
            unqiue :true
        },
        productId:{
            type: mongoose.Schema.ObjectId,
            ref:"Product"
        },
        product_datails :{
            name:String,
            Image:Array,
        },
        payment_id :{
            type :String,
            default:""
    },
    payment_Status:{
        type :String,
        default:""
    },
    delivery_Status:{
        type :mongoose.Schema.ObjectId,
        ref:"Address"
    },
    subTotalAmt:{
        type :Number,
        default:0
    },
    totalAmt:{
        type: Number,
        default:0
    },
    invoice_receipt:{
        typr: String,
        default:""
    }
},{
    timestamps: true
})
const orderModel = mongoose.model("Order" , orderSchema)
export default orderModel