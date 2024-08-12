import mongoose from "mongoose";
mongoose.Promise = global.Promise;
const CartItemSchema = new mongoose.Schema({
    productImageURL: {
        type: String,
    },
    productPrice : {
        type: String,
        required: true
    },
    productTitle:{
        type: String,
        required: true
    },
    customerId:{
        type: String,
        required: true
    }
})
const CartItems = mongoose.models.cart || mongoose.model("cart", CartItemSchema);
export default CartItems;