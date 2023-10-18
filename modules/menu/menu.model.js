const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    menu_name: {
      type: String,
      required: true,
    },
    describe: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
