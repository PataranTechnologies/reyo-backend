const mongoose = require("mongoose");
const database = require("../db");

const campaignSchema = new mongoose.Schema(
  {
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },
    description: {
      type: String,
      required: true,
    },
    numberOfAdvertisements: {
      type: Number,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    distance: {
      type: String,
      rquired: true,
    },
    paymentTransactionId: {
      type: String,
      rquired: true,
    },
  },
  { timestamps: true }
);

module.exports = database.model("Invitation", invitationSchema);
