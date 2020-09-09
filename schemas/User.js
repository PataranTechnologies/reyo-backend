const mongoose = require("mongoose");
const database = require("../db");

const userSchema = new mongoose.Schema(
  {
    firstName: {
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
    ageGroup: {
      type: Number,
      required: true,
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
  },
  { timestamps: true }
);

module.exports = database.model("User", userSchema);
