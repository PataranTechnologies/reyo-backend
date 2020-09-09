const mongoose = require("mongoose");
const database = require("../db");

const vendorSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      trim: true,
      required: [true, "Please add a company name"],
    },
    firstName: {
      type: String,
      required: [true, "Please add your first name"],
      trim: true,
    },
    surName: {
      type: String,
      trim: true,
    },
    logo: {
      type: String,
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
      required: [true, "Please add an email"],
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    vendorId: {
      type: String,
      unique: true,
      required: [true, "Please enter your vendor Id"],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    passResetToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = database.model("Vendor", vendorSchema);
