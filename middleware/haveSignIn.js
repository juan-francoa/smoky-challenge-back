const { mustSignInResponse } = require("../config/responses");

function haveSignIn(req, res, next) {
  if (req.user) {
    return next();
  }
  return mustSignInResponse();
}

module.exports = haveSignIn;
