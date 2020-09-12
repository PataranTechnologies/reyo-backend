const UserModel = require("../../schemas/User");
const VendorModel = require("../../schemas/Vendor");

// Get Signed Token
const sendToken = (user, role) => {
  const token = user.getToken();
  return {
    status: 1,
    id: user._id,
    email: user.email,
    name: user.firstname,
    token,
    role,
  };
};

// Send Error Response to user
const sendError = (status, msg) => ({
  status,
  msg,
});

module.exports = ({ email, password, role }) =>
  new Promise(async (resolve, reject) => {
    try {
      // Check if any required field is not present in req
      if (!email || !password || !role) {
        return reject(sendError(0, "Please provide all required details"));
      }

      let Model = role === "vendor" ? VendorModel : UserModel;

      let user = await Model.findOne({ email }).select("+password");

      // Check if user's email is already registered
      if (!user) {
        return reject(sendError(0, "Email is not registered"));
      }

      if (!user.authenticate(password)) {
        return reject(sendError(0, "Password is not valid"));
      }

      // Send Success Response
      return resolve(sendToken(user, role));
    } catch (error) {
      console.log(error);
      return reject({ msg: "Something went wrong", status: 0 });
    }
  });
