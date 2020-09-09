const mongoose = require("mongoose");
const database = require("../db");

const invitationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      email: String,
      rqeuired: true,
    },
    role: {
      type: String,
      enum: ["friend", "vendor"],
    },
    networkPoints: {
      type: Number,
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = database.model("Invitation", invitationSchema);
