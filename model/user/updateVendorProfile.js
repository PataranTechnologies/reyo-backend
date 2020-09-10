const VendorModel = require("../../schemas/Vendor");
const { HOST } = require("../../constants");

// Send Error Response to user
const sendError = (status, errors) => ({
  status,
  errors,
});

module.exports = ({
  id,
  firstname,
  surname,
  email,
  phone,
  vendorId,
  companyname,
  logo,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      // Check if any required field is not present in req
      if ((!email, !id, !firstname || !vendorId || !companyname)) {
        return reject(sendError(0, "Please fill all the required fields"));
      }

      let updateVendor = {
        companyname,
        firstname,
        email,
        vendorId,
      };

      if (!!surname) updateVendor["surname"] = surname;

      if (!!phone) updateVendor["phone"] = phone;

      if (!!logo) updateVendor["logo"] = logo;

      user = await VendorModel.findByIdAndUpdate(id, updateVendor, {
        new: true,
        runValidators: true,
      });

      // Check is user could not be created
      if (!user) {
        return reject(sendError(0, "Vendor could not be updated"));
      }

      resolve({ status: 1, msg: "Vendor updated successfully" });
    } catch (error) {
      console.log(error);
      return reject({ msg: "Something went wrong", status: 0 });
    }
  });
