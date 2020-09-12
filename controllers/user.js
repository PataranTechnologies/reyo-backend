const { UserModel } = require("../model");
const { ModelResolver } = require("./resolvers");
const expressJwt = require("express-jwt");

module.exports = {
  register: (req, res) => {
    UserModel.UsersUserRegisterService(req.body)
      .then((emailData) => {
        //Sending Verification email
        UserModel.UsersSendEmailService(emailData)
          .then((success) => res.status(200).json(success))
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err));
  },

  isSignedIn: expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  }),

  // Load User Data in the req object
  loadUser: (req, res, next) => {
    if (!req.user) {
      res.json({
        success: false,
        message: "User is not logged in",
      });
    }

    UserModel.UsersLoadUserService(req.user)
      .then((data) => {
        req.user = data;
        next();
      })
      .catch((err) => res.json(err));
  },

  loadVendor: (req, res, next) => {
    if (!req.user) {
      res.json({
        success: false,
        message: "User is not logged in",
      });
    }

    UserModel.UsersLoadVendorService(req.user)
      .then((data) => {
        req.user = data;
        next();
      })
      .catch((err) => res.json(err));
  },

  login: (req, res) => {
    UserModel.UsersLoginService(req.body)
      .then((success) => res.json(success))
      .catch((error) => res.json(error));
  },

  vendorRegister: (req, res) => {
    UserModel.UsersVendorRegisterService(req.body)
      .then((emailData) => {
        //Sending Verification email
        UserModel.UsersSendEmailService(emailData)
          .then((success) => res.status(200).json(success))
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err));
  },

  emailVerification: (req, res) => {
    const {
      query: { id, token, role },
    } = req;
    UserModel.UsersEmailVerificationService({ id, token, role })
      .then((sucess) => {
        res.json(sucess);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  updateUser: (req, res) => {
    UserModel.UsersUpdateUserProfileService(req.body)
      .then((sucess) => {
        res.json(sucess);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  updateVendor: (req, res) => {
    UserModel.UsersUpdateVendorProfileService(req.body)
      .then((sucess) => {
        res.json(sucess);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  getResetPasswordToken: (req, res) => {
    UserModel.UsersResetPasswordTokenService(req.body)
      .then((success) => {
        res.json(success);
      })
      .catch((error) => {
        res.json(error);
      });
  },

  forgotPassword: (req, res) => {
    UserModel.UsersForgotPasswordService(req.body)
      .then((success) => {
        res.json(success);
      })
      .catch((error) => {
        res.json(error);
      });
  },
};
