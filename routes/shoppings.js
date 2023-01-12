let router = require("express").Router();

let { addShop, delet, read, pay } = require("../controllers/shopping");
const validator = require("../middleware/validator");
const passport = require("../config/passport");

router.post("/", addShop);
router.patch("/", delet);
router.get("/:id", read);
router.post("/pay", passport.authenticate("jwt", { session: false }), pay);

module.exports = router;
