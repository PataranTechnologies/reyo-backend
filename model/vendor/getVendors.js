const VendorModel = require("../../schemas/Vendor");
const sendError = (status, msg) => ({
  status,
  msg,
});

module.exports = () =>
  new Promise(async (resolve, reject) => {
    try {
      const vendors = await VendorModel.find({});

      return resolve({
        status: 1,
        data: vendors,
      });
    } catch (error) {
      console.log(error);
      return reject(sendError(0, "Something Went Wrong"));
    }
  });
