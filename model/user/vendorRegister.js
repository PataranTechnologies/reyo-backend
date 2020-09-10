const VendorModel = require("../../schemas/Vendor");
const { HOST } = require("../../constants");

// Send Error Response to user
const sendError = (status, errors) => ({
  status,
  errors,
});

module.exports = ({
  companyname,
  firstname,
  surname,
  email,
  logo,
  password,
  confirmPassword,
  vendorId,
  phone,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      // Check if any required field is not present in req
      if (
        !companyname ||
        !firstname ||
        !email ||
        !password ||
        !confirmPassword ||
        !vendorId
      ) {
        return reject(
          sendError(0, { msg: "Please fill all the required fields" })
        );
      }

      // Check if passwords are not eqaul
      if (!(password === confirmPassword)) {
        return reject(sendError(0, { msg: "Password doesn't match" }));
      }

      let vendor = await VendorModel.findOne({ email });

      // Check if user's email is already registered
      if (vendor) {
        return reject(sendError(0, { msg: "Email already registered" }));
      }

      let newVendor = {
        companyname,
        firstname,
        email,
        password,
        vendorId,
      };

      if (!!surname) newVendor["surname"] = surname;

      if (!!phone) newVendor["phone"] = phone;

      if (!!logo) newVendor["logo"] = logo;

      vendor = new VendorModel(newVendor);

      // Check is user could not be created
      if (!vendor) {
        return reject(sendError(0, { msg: "User could not be created" }));
      }

      let verificationToken = vendor.getVerificationToken();

      await vendor.save({ validateBeforeSave: false });

      const tokenVerificationLink = `<a href="${HOST}/api/user/email/verify?token=${verificationToken}&id=${vendor._id}&role=vendor">Click Here To Verify Your account</a>`;

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
      return reject({ msg: "Something went wrong", status: 0 });
    }
  });
