import { connect } from "@/DBConfig/DBConfig";
import CartItems from "@/models/CartModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PUT(request) {
  const reqBody = await request.json();
  const { customerId } = reqBody;

  const Items = await CartItems.find({ customerId });
  const ItemsCount = Items.length;
  return NextResponse.json({
    ItemsCount,
  });
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
