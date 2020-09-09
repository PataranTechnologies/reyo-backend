const mongoose = require("mongoose");
const database = require("../db");

const reusePointsSchema = new mongoose.Schema(
  {
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },
    resusePoints: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = database.model("ResusePoint", reusePontsSchema);
