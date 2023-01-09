const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const accountVerificationEmail = require("../middleware/accountVerificationEmail");
const {
  userSignedUpResponse,
  userNotFoundResponse,
  invalidCredentialsResponse,
  userSignedOutResponse,
} = require("../config/responses");
const jwt = require("jsonwebtoken");

const controller = {
  create: async (req, res, next) => {
    let { name, lastName, photo, age, email, password } = req.body;
    let role = "user";
    let verified = false;
    let logged = false;
    let code = crypto.randomBytes(10).toString("hex");
    password = bcryptjs.hashSync(password, 10);
    console.log(password);
    try {
      await User.create({
        name,
        lastName,
        photo,
        age,
        email,
        password,
        role,
        verified,
        logged,
        code,
      });
      await accountVerificationEmail(email, code);
      return userSignedUpResponse(req, res);
    } catch (error) {
      next(error);
    }
  },

  userVerification: async (req, res, next) => {
    let { code } = req.params;

    try {
      let user = await User.findOneAndUpdate(
        { code: code },
        { verified: true },
        { new: true }
      );
      if (user) {
        return res.redirect("http://localhost:3000");
      } else {
        return userNotFoundResponse(req, res);
      }
    } catch (error) {
      next(error);
    }
  },
  logIn: async (req, res, next) => {
    let { password } = req.body;
    let { user } = req;
    try {
      const verifyPassword = bcryptjs.compareSync(password, user.password);
      if (verifyPassword) {
        await User.findOneAndUpdate(
          { mail: user.email },
          { online: true },
          { new: true }
        );
        let token = jwt.sign({ id: user.id }, process.env.KEY_JWT, {
          expiresIn: 60 * 60 * 365,
        });
        user = {
          id: user.id,
          name: user.name,
          email: user.email,
          photo: user.photo,
          role: user.role,
        };
        return res.status(200).json({
          response: { user, token },
          success: true,
          message: "Hi " + user.name + ", we are happy to see you again",
        });
      }
      return invalidCredentialsResponse(req, res);
    } catch (error) {
      next(error);
    }
  },
  loginWithToken: async (req, res, next) => {
    let { user } = req;
    try {
      return res.json({
        response: {
          user,
        },
        success: true,
        message: `Welcome ${user.name}`,
      });
    } catch (error) {
      next(error);
    }
  },
  signoff: async (req, res, next) => {
    let { email } = req.user;
    try {
      await User.findOneAndUpdate({ email }, { logged: false }, { new: true });
      return userSignedOutResponse(req, res);
    } catch (error) {
      next(error);
    }
  },
  readOne: async (req, res, next) => {
    let id = req.params.id;
    try {
      let user = await User.findById({ _id: id });
      if (user) {
        res.status(200).json({
          success: true,
          message: "the user was found successfully!.",
          data: user,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "the user was not found.",
        });
      }
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    let id = req.params.id;
    if (req.body.password) {
      let { password } = req.body;
      password = bcryptjs.hashSync(password, 10);
      req.body.password = password;
    }

    try {
      let user = await User.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });

      if (user) {
        res.status(200).json({
          success: true,
          message: "The user was successfully modified!",
          data: user,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "The user was not found",
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
module.exports = controller;
