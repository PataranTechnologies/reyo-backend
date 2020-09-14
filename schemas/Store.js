const mongoose = require("mongoose");
const database = require("../db");

const storeSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
    storeName: {
      type: String,
      required: [true, "Please add store name"],
      trim: true,
      unique: true,
    },
    slug: String,
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [500, "Description can not be more than 500 characters"],
    },
    address: {
      type: String,
    },
    qrCode: {
      type: String,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    storeFrontImage: {
      type: String,
      required: true,
    },
    storeMenu: {
      type: String,
    },
    openingDays: {
      type: [Number],
      required: true,
      enum: [1, 2, 3, 4, 5, 6, 7],
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "Please use a valid URL with HTTP or HTTPS",
      ],
    },
    instaLink: {
      type: String,
    },
    fbLink: {
      type: String,
    },
    twitterLink: {
      type: String,
    },
    openingTime: {
      type: String,
      required: true,
    },
    closingTime: {
      type: String,
      required: true,
    },
    reuses: {
      type: mongoose.Schema.Types.ObjectId,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = database.model("Store", storeSchema);
