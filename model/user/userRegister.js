const UserModel = require("../../schemas/User");
const { HOST } = require("../../constants");

// Send Error Response to user
const sendError = (status, msg) => ({
  status,
  msg,
});

module.exports = ({
  firstname,
  surname,
  password,
  confirmPassword,
  age,
  email,
  phone,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      // Check if any required field is not present in req
      if (!firstname || !email || !password || !confirmPassword || !age) {
        return reject(
          sendError(0, { msg: "Please fill all the required fields" })
        );
      }

      // Check if passwords are not eqaul
      if (!(password === confirmPassword)) {
        return reject(sendError(0, { msg: "Password doesn't match" }));
      }

      let user = await UserModel.findOne({ email });

      // Check if user's email is already registered
      if (user) {
        return reject(sendError(0, { msg: "Email already registered" }));
      }

      let newUser = {
        firstname,
        email,
        password,
        age,
      };

      if (!!surname) newUser["surname"] = surname;

      if (!!phone) newUser["phone"] = phone;

      user = new UserModel(newUser);

      // Check is user could not be created
      if (!user) {
        return reject(sendError(0, { msg: "User could not be created" }));
      }

      let verificationToken = user.getVerificationToken();

      await user.save({ validateBeforeSave: false });

      const tokenVerificationLink = `<a href="${HOST}/api/user/email/verify?token=${verificationToken}&id=${user._id}&role=user">Click Here To Verify Your account</a>`;

      let emailData = {
        email,
        link: tokenVerificationLink,
        msg: "Please visit this link to verify your email",
        subject: "Reyo - Email Verification",
        ackMsg: "Email verification link has been send to your email",
      };

      resolve(emailData);
    } catch (error) {
      console.log(error);
      return reject(sendError(0, "Something went wrong"));
    }
  });
