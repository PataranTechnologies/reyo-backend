const VendorModel = require("../../schemas/Vendor");
const sendError = (status, msg) => ({
  status,
  msg,
});

module.exports = ({ user }) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(user);
      return resolve({
        status: 1,
        data: "works",
      });
    } catch (error) {
      console.log(error);
      return reject(sendError(0, "Something Went Wrong"));
    }
  });
