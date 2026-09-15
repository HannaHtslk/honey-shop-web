import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    excerpt: {type: String, required: true},
    content: {type: String, required: true},
    thumbnail: {type: String},
}, {timestamps: true});

export default mongoose.model("Post", postSchema)