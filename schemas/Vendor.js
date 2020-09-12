const mongoose = require("mongoose");
const { v4 } = require("uuid");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const database = require("../db");
const { JWT_SECRET, JWT_EXPIRE } = require("../constants");

const vendorSchema = new mongoose.Schema(
  {
    companyname: {
      type: String,
      trim: true,
      required: [true, "Please add a company name"],
    },
    firstname: {
      type: String,
      required: [true, "Please add your first name"],
      trim: true,
    },
    surname: {
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
    resetPasswordToken: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    salt: {
      type: String,
    },
  },
  { timestamps: true }
);

vendorSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.salt = v4();
  this.password = this.securePassword(this.password);
  next();
});

vendorSchema.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.password;
  },
  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (error) {
      console.log(error);
      return "";
    }
  },
  getToken: function (user) {
    return jwt.sign({ id: this._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
      algorithm: "HS256",
    });
  },
  getResetPasswordToken: function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = resetToken;

    return resetToken;
  },

  getVerificationToken: function () {
    // Generate token
    const verificationToken = crypto.randomBytes(20).toString("hex");

    this.verificationToken = verificationToken;

    return verificationToken;
  },
};
module.exports = database.model("Vendor", vendorSchema);
