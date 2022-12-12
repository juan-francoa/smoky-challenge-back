let router = require("express").Router()

/* GET home page. */
let user = require("./users")


router.use("/auth", user)



module.exports = router;
