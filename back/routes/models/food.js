const { Schema, model } = require("mongoose");

const FoodSchema = new Schema(
  {
    name: { type: String, required: true },
    like: Number,
    ip: {
      type: [String],
      unique: true,
    },
    likeOn: Boolean,
  },
  { timestamps: true }
);

const Food = model("food", FoodSchema);
module.exports = { Food };
