const mongoose = require("mongoose");
const database = require("../db");

const offerSchema = new mongoose.Schema(
  {
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    offerImage: {
      type: String,
    },
    terms: [
      {
        type: String,
        required: true,
      },
    ],
    validity: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = database.model("Offer", offerSchema);
