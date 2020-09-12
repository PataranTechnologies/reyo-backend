const mongoose = require("mongoose");
const { v4 } = require("uuid");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const database = require("../db");
const { JWT_SECRET, JWT_EXPIRE } = require("../constants");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please add your first name"],
      trim: true,
    },
    surName: {
      type: String,
      trim: true,
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
    age: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      type: String,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    invited: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invitation",
      },
    ],
    resusePoints: [
      {
        type: mongoose.Schema.Types.ObjectId,
        Ref: "ReusePoints",
      },
    ],

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.salt = v4();
  this.password = this.securePassword(this.password);
  next();
});

userSchema.methods = {
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

module.exports = database.model("User", userSchema);
