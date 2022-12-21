let router = require("express").Router()

let {addShop, delet, read, pay} = require("../controllers/shopping")
const validator = require("../middleware/validator")


router.post("/", addShop)
router.patch("/", delet)
router.get("/:id", read)
router.post("/pay", pay)



module.exports = router;