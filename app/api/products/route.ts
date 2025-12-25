import {connect} from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req: Request){
    await connect();

    const {searchParams} = new URL(req.url);
    const category = searchParams.get("category");

    const filter = category?{category}:{};


    const products = await Product.find(filter);
    return Response.json({products});
}