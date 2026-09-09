const mongoose = require("mongoose");

const leadSchema = mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    productInterest: { type: String },
    message: { type: String },
    status: { type: String, enum: ['new', 'processed'], default: 'new' },
}, { timestamps: true });

module.exports = mongoose.model("Lead", leadSchema);