let router = require("express").Router()

/* GET home page. */
let user = require("./user")
let liquid = require("./liquids")
let equipment = require("./equipment")
let shopping = require("./shoppings")

router.use("/auth", user)
router.use("/liquids", liquid)
router.use("/equiments", equipment)
router.use("/shoppings", shopping)


module.exports = router;
