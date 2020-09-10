const UserModel = require("../../schemas/User");
const VendorModel = require("../../schemas/Vendor");
const { HOST } = require("../../constants");

const sendError = (status, msg) => ({
  status,
  msg,
});

module.exports = ({ id, token, password, confirmpassword, role }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!id || !token || !password || !confirmpassword || !role) {
        return reject(
          await sendError(0, "Please fill all the required fields")
        );
      }

      // Check if passwords are not eqaul
      if (!(password === confirmpassword)) {
        return reject(sendError(0, "Password doesn't match"));
      }

      let Model = role === "user" ? UserModel : VendorModel;

      let user = await Model.findOne({
        _id: id,
        resetPasswordToken: token,
      });

      if (!user) {
        return reject(sendError(0, "Reset Password Token is Invalid"));
      }
      // Check if user's email is already registered
      user.password = password;
      user.resetPasswordToken = undefined;

      await user.save({ validateBeforeSave: false });

      return resolve({ status: 1, msg: "Password Updated Successfully" });
    } catch (error) {
      console.log(error);
      return reject(await sendError(0, "Something Went Wrong"));
    }
  });
