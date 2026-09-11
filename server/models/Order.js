const mongoose = require('mongoose');
const { normalizePhone } = require('../utils/phone');

const orderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    unit: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        validate: {
            validator: Number.isInteger,
            message: 'Кількість має бути цілим числом',
        },
    },
}, { _id: false });

const orderSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    phone: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^\+380\d{9}$/.test(v);
            },
            message: (props) => `${props.value} не є коректним номером телефону`,
        },
    },
    items: {
        type: [orderItemSchema],
        required: true,
        validate: {
            validator: (arr) => arr.length > 0,
            message: 'Замовлення повинно містити хоча б один товар',
        },
    },
    totalPrice: { type: Number, required: true, min: 0 },
    status: {
        type: String,
        enum: ['new', 'processed'],
        default: 'new',
    },
}, { timestamps: true });

orderSchema.pre('validate', function () {
    if (this.phone) {
        this.phone = normalizePhone(this.phone);
    }
});

module.exports = mongoose.model("Order", orderSchema);