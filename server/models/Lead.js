const mongoose = require("mongoose");
const { normalizePhone } = require("../utils/phone");

const leadSchema = mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\+380\d{9}$/.test(v); // validate AFTER normalization, so only E.164 is valid at this point
        },
        message: (props) =>
          `${props.value} не є коректним номером телефону`,
      },
    },
    productInterest: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['new', 'processed'],
      default: 'new',
    },
}, { timestamps: true });

leadSchema.pre('validate', function () {
  if (this.phone) {
    this.phone = normalizePhone(this.phone);
  }
});

module.exports = mongoose.model("Lead", leadSchema);