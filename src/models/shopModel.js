const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShopSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  foods_in_shop: [
    {
      type: Schema.Types.ObjectId,
      ref: "Food",
    },
  ],
  food_checked: [
    {
      type: Schema.Types.ObjectId,
      ref: "Food",
    },
  ],
  nb_checked: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Shop = mongoose.model("Shop", ShopSchema);

module.exports = Shop;
