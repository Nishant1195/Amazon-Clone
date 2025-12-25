import {Schema, model, models} from "mongoose"

const productSchema = new Schema ({
    title:String,
    price:String,
    description:String,
    image:String,
    stock:Number,
    category:String,
}, {timestamps:true});

const Product = models.Product || model("Product", productSchema)

export default Product;