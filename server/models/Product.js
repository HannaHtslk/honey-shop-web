import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
    unit: { type: String, required: true },   
    price: { type: Number, required: true, min: 0 },
}, { _id: false });

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String },
    variants: {
        type: [variantSchema],
        required: true,
        validate: {
            validator: (arr) => arr.length > 0,
            message: 'Товар повинен мати хоча б один варіант об\'єму/ціни',
        },
    },
}, { timestamps: true });

export default mongoose.model("Product", productSchema)