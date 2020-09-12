const { VendorControllers } = require("../controllers");

const prefix = "/api/vendor/";

module.exports = (app) => {
  app.get(`${prefix}getallvendors`, VendorControllers.getVendors);
};
