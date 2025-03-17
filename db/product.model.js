import mongoose from "mongoose";

const productschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    }
}, { timestamps: true });

// Check if the model is already declared before defining it again
export const Product = mongoose.models.Product || mongoose.model("Product", productschema);
