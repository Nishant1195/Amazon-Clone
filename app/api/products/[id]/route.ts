import {connect} from "@/lib/db";
import Product from "@/models/Product";

export async function GET(
    req:Request,
    {params}:{params:{id:string}}
) {
    const {id} = await params;
    
    await connect();


    const product = await Product.findById(id);

    if(!product){
        return Response.json({
            error:"Product not found"
        }, {
            status:404
        });
    }

    return Response.json({product})
}