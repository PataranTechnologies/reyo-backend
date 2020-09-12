const UserModel = require("../../schemas/User");

// Send Error Response to user
const sendError = (status, msg) => ({
  status,
  msg,
});

module.exports = ({ id }) =>
  new Promise(async (resolve, reject) => {
    try {
      let user = await UserModel.findOne({ _id: id }).select(
        "email isVerified"
      );

      if (!user) {
        return reject(sendError(0, "User is not registered"));
      }

      return resolve(user);
    } catch (error) {
      return reject(sendError(0, "Something Went Wrong"));
    }
  });
