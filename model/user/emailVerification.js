const UserModel = require("../../schemas/User");
const VendorModel = require("../../schemas/Vendor");
const { HOST } = require("../../constants");
const { send } = require("process");

const sendError = (status, msg) => ({
  status,
  msg,
});

module.exports = ({ id, token, role }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!id || !token || !role) {
        return reject(sendError(0, "Something went wrong"));
      }

      let Model = role === "vendor" ? VendorModel : UserModel;

      let user = await Model.findOne({ _id: id, verificationToken: token });

      if (!user) {
        return reject(sendError(0, "Invalid Token"));
      }

      console.log(user);

      user.verificationToken = undefined;
      user.isVerified = true;

      await user.save({ validateBeforeSave: false });

      return resolve({
        status: 1,
        msg: "Your email has been verified",
      });
    } catch (error) {
      console.log(error);
      reject(sendError(0, "Something went wrong"));
    }
  });
