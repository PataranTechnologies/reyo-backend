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
