let router = require("express").Router()

let {addShop, delet, read} = require("../controllers/shopping")
const validator = require("../middleware/validator")


router.post("/", addShop)
router.patch("/", delet)
router.get("/:id", read)


module.exports = router;