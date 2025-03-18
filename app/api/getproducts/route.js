import { connectdb } from "@/db/connect";
import { Product } from "@/db/product.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export const GET = async()=>{
    try {
        await connectdb();
        const products = await Product.find({});
        return NextResponse.json({products})
    } catch (error) {
        return NextResponse.json({error:error},{status:500})
    }

}