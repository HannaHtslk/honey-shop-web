const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    excerpt: {type: String, required: true},
    content: {type: String, required: true},
    thumbnail: {type: String},
}, {timestamps: true});

module.exports = mongoose.model("Post", postSchema)