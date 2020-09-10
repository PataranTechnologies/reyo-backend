const UserModel = require("../../schemas/User");
const VendorModel = require("../../schemas/Vendor");
const { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS } = require("../../constants");

const nodemailer = require("nodemailer");

// Send Error Response to user
const sendError = (status, msg) => ({
  status,
  msg,
});

module.exports = ({ email, role }) =>
  new Promise(async (resolve, reject) => {
    try {
      let Model = role === "user" ? UserModel : VendorModel;

      let user = await Model.findOne({ email });

      if (!user) {
        return reject(sendError(0, "User not found"));
      }

      const token = user.getResetPasswordToken();

      await user.save({ validateBeforeSave: false });

      let transporter = nodemailer.createTransport({
        service: EMAIL_SERVICE,
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS,
        },
      });

      let mailOptions = {
        from: `"Reset Password ${process.env.EMAIL_USER}`,
        to: email,
        subject: "RESET PASSWORD",
        text: "",
        html: `<p>Your reset password token is : ${token}</p>`,
      };

      let info = await transporter.sendMail(mailOptions);
      console.log(info);

      return resolve({
        status: 1,
        msg: "Reset Password token is sent",
      });
    } catch (error) {
      console.log(error);
      return reject(sendError(0, "Email could not be sent"));
    }
  });
