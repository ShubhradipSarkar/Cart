import { connect } from "@/DBConfig/DBConfig";
import CartItems from "@/models/CartModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request){

}

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { productImageURL, productPrice, productTitle, customerId, shouldDelete } = reqBody;
        console.log(reqBody);

        // Check if the item already exists in the cart
        const existingItem = await CartItems.findOne({ customerId, productTitle });

        if (shouldDelete) {
            // If delete is true, remove the item from the cart
            if (existingItem) {
                await CartItems.deleteOne({ customerId, productTitle });
                return NextResponse.json({
                    message: "Item removed from cart",
                    success: true,
                });
            } else {
                return NextResponse.json({
                    message: "Item not found in cart",
                    success: false,
                });
            }
        }

        if (existingItem) {
            return NextResponse.json({
                message: "Item already exists in cart",
                success: false,
            });
        }

        // If the item does not exist and delete is not true, insert the new item
        const newItem = new CartItems({
            productImageURL,
            productPrice,
            productTitle,
            customerId,
        });

        await newItem.save();

        return NextResponse.json({
            message: "Item inserted in cart",
            success: true,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
export async function PUT(request) {
    try {
        const reqBody = await request.json();
        const {customerId} = reqBody;

        console.log("customer id = ", customerId);
        if (!customerId) {
            return NextResponse.json({ error: "Customer ID is required" }, { status: 400 });
        }

        const allItems = await CartItems.find({ customerId: customerId });
        return NextResponse.json({ allItems });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Example PUT method, if needed
// export async function PUT(request) {
//     try {
//         const reqBody = await request.json();
//         const { email } = reqBody;

//         const user = await Member.findOneAndDelete({ email });

//         if (!user) {
//             return NextResponse.json({ error: "User not found" }, { status: 404 });
//         }

//         return NextResponse.json({
//             message: "Application deleted",
//         });
//     } catch (error) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }
