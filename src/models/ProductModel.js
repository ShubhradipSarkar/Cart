import mongoose from "mongoose";
mongoose.Promise = global.Promise;
const ProductSchema = new mongoose.Schema({
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
    }
})
const Product = mongoose.models.product || mongoose.model("product", ProductSchema);
export default Product;