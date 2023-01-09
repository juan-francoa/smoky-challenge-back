const router = require("express").Router();
const schema = require("../schemas/user");
const schemaSingIn = require("../schemas/signIn");
const validator = require("../middleware/validator");
const { accountExists } = require("../middleware/accountExistsSignUp");
const accountExistsSingIn = require("../middleware/accountExistsSignIn");
const {
  accountHasBeenVerified,
} = require("../middleware/accountHasBeenVerified");
const haveSignIn = require("../middleware/haveSignIn");
let {
  create,
  userVerification,
  logIn,
  loginWithToken,
  signoff,
  readOne,
  update,
} = require("../controllers/user");
const passport = require("../config/passport");

router.post("/sign-up", validator(schema), accountExists, create);
router.post(
  "/sign-in",
  validator(schemaSingIn),
  accountExistsSingIn,
  accountHasBeenVerified,
  logIn
);
router.post(
  "/sign-out",
  passport.authenticate("jwt", { session: false }),
  signoff
);

router.get("/verify/:code", userVerification);
router.post(
  "/token",
  passport.authenticate("jwt", { session: false }),
  haveSignIn,
  loginWithToken
);

router.get("/me/:id", readOne);
router.patch("/me/:id", update);

module.exports = router;
