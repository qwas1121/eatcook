const { Schema, model } = require("mongoose");

const FoodSchema = new Schema(
  {
    name: { type: String, required: true },
    like: Number,
    //ip: { type: [String], unique: true,},
    likeOn: { type: [String], unique: true },
    likeOff: { type: [String], unique: true },
    isLike: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Food = model("food", FoodSchema);
module.exports = { Food };
