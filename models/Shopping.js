const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, ref: "users", required: true },
    products: [{ type: Object, required: true }],
});

const Shopping = mongoose.model('shopping', schema);
module.exports = Shopping;