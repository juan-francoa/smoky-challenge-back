let router = require("express").Router()

/* GET home page. */
let user = require("./user")
let liquid = require("./liquids")
let equipment = require("./equipment")

router.use("/auth", user)
router.use("/liquids", liquid)
router.use("/equiments", equipment)


module.exports = router;
