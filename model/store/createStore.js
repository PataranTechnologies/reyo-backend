const StoreModel = require("../../schemas/Store");
const sendError = (status, msg) => ({
  status,
  msg,
});

module.exports = ({ user, body }, vendorId) =>
  new Promise(async (resolve, reject) => {
    try {
      let {
        storeName,
        location,
        description,
        storeFrontImage,
        openingDays,
        openingTime,
        closingTime,
        website,
        instaLink,
        fbLink,
        twitterLink,
      } = body;

      if (
        (!storeName,
        !location,
        !description,
        !storeFrontImage,
        !openingDays,
        !openingTime,
        !closingTime)
      ) {
        return reject(sendError(0, "Please fill all the required details"));
      }

      if (vendorId.toString() !== user._id.toString()) {
        return reject(
          sendError(0, "You are not allowed to perform this action")
        );
      }

      let data = {
        storeName,
        location,
        description,
        storeFrontImage,
        openingDays,
        openingTime,
        closingTime,
      };

      if (!!website) data["website"] = website;
      if (!!instaLink) data["instaLink"] = instaLink;
      if (!!fbLink) data["fbLink"] = fbLink;
      if (!!twitterLink) data["twitterLink"] = twitterLink;

      data["vendor"] = vendorId;

      const store = await StoreModel.create(data);

      if (!store) {
        reject(sendError(0, "Store could not be created"));
      }

      resolve({ status: 1, msg: "Store Created" });
    } catch (error) {
      console.log(error);
      return reject(sendError(0, "Something Went Wrong"));
    }
  });
