const mongoose = require("mongoose");
const { mongoConnectionString } = require("../constants");

const useNewUrlParser = true;
const useUnifiedTopology = false;

mongoose.connect(
  mongoConnectionString,
  { useNewUrlParser, useUnifiedTopology },
  (err) => {
    if (err) {
      console.log("mongo connection err", err);
    } else {
      console.log("database connected");
    }
  }
);
mongoose.set("useFindAndModify", false);

module.exports = mongoose;
