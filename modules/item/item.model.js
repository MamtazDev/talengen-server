const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    parent_menu: {
      type: String,
      ref: "Menu",
      required: true,
    },
    sub_menu: {
      type: String,
      ref: "SubMenu",
      required: false,
    },
    item_name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    publish: {
      type: Boolean,
      enum: [true, false],
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
