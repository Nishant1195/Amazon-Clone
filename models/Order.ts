import mongoose, {Schema, model, models} from "mongoose";

const orderSchema = new Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    items:[
        {
            productId:{type: mongoose.Schema.Types.ObjectId, ref:"Product"},
            price: Number,
            quantity:Number,
        },
    ],
    totalAmount: Number,
    paymentStatus: String,
    paymentId: Number,
}, {timestamps:true});

const Order = models.Order || model("Order", orderSchema)

export default Order;