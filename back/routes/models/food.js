const { Schema, model } = require("mongoose");

const FoodSchema = new Schema(
  {
    name: { type: String, required: true },
    like: Number,
  },
  { timestamps: true }
);

const Food = model("food", FoodSchema);
module.exports = { Food };
