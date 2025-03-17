import { connectdb } from "../../../db/connect.js";
import { Product } from "../../../db/product.model.js";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectdb();  // Ensure the database is connected

        const { name, price } = await req.json();  // Parse JSON body from the request
        const createdProduct = await Product.create({ name, price });

        if (createdProduct) {
            return NextResponse.json({ createdProduct }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Error occurred" }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
