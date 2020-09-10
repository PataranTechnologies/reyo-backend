const UserModel = require("../../schemas/User");
const { HOST } = require("../../constants");

// Send Error Response to user
const sendError = (status, errors) => ({
  status,
  errors,
});

module.exports = ({ id, firstname, surname, email, age, phone }) =>
  new Promise(async (resolve, reject) => {
    try {
      // Check if any required field is not present in req
      if ((!email, !id, !firstname || !age)) {
        return reject(sendError(0, "Please fill all the required fields"));
      }

      let updateUser = {
        firstname,
        email,
        age,
      };

      if (!!surname) updateUser["surname"] = surname;

      if (!!phone) updateUser["phone"] = phone;

      user = await UserModel.findByIdAndUpdate(id, updateUser, {
        new: true,
        runValidators: true,
      });

      // Check is user could not be created
      if (!user) {
        return reject(sendError(0, "User could not be updated"));
      }

      resolve({ status: 1, msg: "User updated successfully" });
    } catch (error) {
      console.log(error);
      return reject({ msg: "Something went wrong", status: 0 });
    }
  });
