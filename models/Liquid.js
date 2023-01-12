const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Liquids = mongoose.model("liquids", schema);
module.exports = Liquids;
