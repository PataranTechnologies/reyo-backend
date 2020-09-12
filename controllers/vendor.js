const { VendorModel } = require("../model");
const { ModelResolver } = require("./resolvers");
const expressJwt = require("express-jwt");

module.exports = {
  getVendors: (req, res) => {
    VendorModel.VendorsGetVendorsService()
      .then((success) => {
        res.json(success);
      })
      .catch((err) => res.json(err));
  },
};
