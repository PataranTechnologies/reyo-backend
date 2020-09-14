const { StoreModel } = require("../model");

module.exports = {
  createStore: (req, res) => {
    const { vendor } = req.params;
    StoreModel.StoresCreateStoreService(req, vendor)
      .then((success) => {
        res.json(success);
      })
      .catch((err) => res.json(err));
  },

  deleteStore: (req, res) => {
    StoreModel.StoresDeleteStoreService(req.params, req)
      .then((success) => {
        res.json(success);
      })
      .catch((err) => res.json(err));
  },

  updateStore: (req, res) => {
    StoreModel.StoresUpdateStoreService(req, req.params)
      .then((success) => {
        res.json(success);
      })
      .catch((err) => res.json(err));
  },

  getStoresforVendor: (req, res) => {
    StoreModel.StoresGetStoreForVendorService(req.params)
      .then((success) => {
        res.json(success);
      })
      .catch((err) => res.json(err));
  },
};
