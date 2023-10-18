const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    banner: {
      type: [String],
      required: false,
    },
    media: {
      type: [String],
      required: false,
    },
    address: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    short_description: {
      type: String,
      required: false,
    },
    about: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: false,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
