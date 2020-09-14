const StoreModel = require("../../schemas/Store");
const sendError = (status, msg) => ({
  status,
  msg,
});

module.exports = ({ user, body }, { vendorId, storeId }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (vendorId.toString() !== user._id.toString()) {
        return reject(
          sendError(0, "You are not allowed to perform this action")
        );
      }

      await StoreModel.findByIdAndUpdate(storeId, body, {
        runValidators: true,
      });

      resolve({ status: 1, msg: "Store Updated Successfuly" });
    } catch (error) {
      console.log(error);
      return reject(sendError(0, "Something Went Wrong"));
    }
  });
