let router = require("express").Router();
const schema = require("../schemas/liquid");
let {
  create,
  read,
  readOne,
  destroyOne,
  update,
} = require("../controllers/liquid");
const validator = require("../middleware/validator");

router.get("/", read);
router.post("/", validator(schema), create);
router.get("/:id", readOne);
router.delete("/:id", destroyOne);
router.put("/:id", update);

module.exports = router;
