const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    font_family: {
      type: String,
      default: "Montserrat",
      required: false,
    },
    primary_color: {
      type: String,
      default: "#006B54",
      required: false,
    },
    secondary_color: {
      type: String,
      default: "#FFFFFF",
      required: false,
    },
    currency: {
      type: String,
      default: "euro",
      required: true,
    },
    language: {
      type: String,
      default: "English",
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

const Setting = mongoose.model("Setting", settingSchema);

module.exports = Setting;
