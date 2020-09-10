const UserModel = require("../../schemas/User");
const nodemailer = require("nodemailer");

const { EMAIL_PASS, EMAIL_USER, EMAIL_SERVICE } = require("../../constants");

// Send Error Response to user
const sendError = (status, msg) => ({
  status,
  msg,
});

module.exports = ({ email, link, msg, subject, ackMsg }) =>
  new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        service: EMAIL_SERVICE,
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS,
        },
      });

      let mailOptions = {
        from: `"${msg} ${process.env.EMAIL_USER}`,
        to: email,
        subject: subject,
        text: "",
        html: `${link}`,
      };

      let info = await transporter.sendMail(mailOptions);
      console.log(info);

      return resolve({
        success: true,
        message: ackMsg,
      });
    } catch (error) {
      console.log(error);
      return reject(sendError(0, "Email could not be sent"));
    }
  });
