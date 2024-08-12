import { connect } from "@/DBConfig/DBConfig";
// import Product from "@/models/CartModel";
import Product from "@/models/ProductModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request){
    const existingItem = await Product.find({ });
    return NextResponse.json({
        existingItem,
    })
}

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { productImageURL, productPrice, productTitle} = reqBody;
        

        // Check if the item already exists in the cart
        const existingItem = await Product.findOne({ productTitle });

        if (existingItem) {
            return NextResponse.json({
                message: "Item already exists in cart",
                success: false,
            });
        }

        // If the item does not exist and delete is not true, insert the new item
        const newItem = new Product({
            productImageURL,
            productPrice,
            productTitle,
            
        });

        await newItem.save();

        return NextResponse.json({
            message: "Item inserted in App",
            success: true,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
