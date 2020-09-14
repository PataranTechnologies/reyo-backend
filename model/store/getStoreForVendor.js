const StoreModel = require("../../schemas/Store");
const sendError = (status, msg) => ({
  status,
  msg,
});

module.exports = ({ vendorId }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!vendorId) {
        return reject(sendError(0, "Vendor Id Required"));
      }

      const stores = await StoreModel.find({ vendor: vendorId });

      resolve({ status: 1, data: stores });
    } catch (error) {
      console.log(error);
      return reject(sendError(0, "Something Went Wrong"));
    }
  });
