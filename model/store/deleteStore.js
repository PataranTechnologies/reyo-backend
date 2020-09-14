const StoreModel = require("../../schemas/Store");
const sendError = (status, msg) => ({
  status,
  msg,
});

module.exports = ({ vendorId, storeId }, { user }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!vendorId || !storeId) {
        return reject(sendError(0, "Something Went Wrong"));
      }

      if (vendorId.toString() !== user._id.toString()) {
        return reject(
          sendError(0, "You are not allowed to perform this action")
        );
      }

      await StoreModel.findByIdAndDelete(storeId);

      resolve({ status: 1, msg: "Store Deleted Successfully" });
    } catch (error) {
      console.log(error);
      return reject(sendError(0, "Something Went Wrong"));
    }
  });
