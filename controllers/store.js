const { StoreModel } = require("../model");

module.exports = {
  createStore: (req, res) => {
    StoreModel.StoresCreateStoreService(req)
      .then((success) => {
        res.json(success);
      })
      .catch((err) => res.json(err));
  },
};
