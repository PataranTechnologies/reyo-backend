const { UserControllers } = require("../controllers");
const { StoreControllers } = require("../controllers");

const prefix = "/api/store/";

module.exports = (app) => {
  app.post(
    `${prefix}create/`,
    UserControllers.isSignedIn,
    UserControllers.loadVendor,
    StoreControllers.createStore
  );
};
