const mongoose = require("mongoose");

const subMenuSchema = new mongoose.Schema(
  {
    parent_menu: {
      type: String,
      ref: "Menu",
      required: true,
    },
    sub_menu_name: {
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

const SubMenu = mongoose.model("SubMenu", subMenuSchema);

module.exports = SubMenu;
