const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["Student", "Employer", "University Counselors"],
      required: true,
      default: "Student",
    },
   
    username: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
    },
    currentPosition: {
      type: String,
    },
    contact : {
      type: String,
    },
    registrationNumber : {
      type: String,
    },
    graduation : {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  {
    timestamps: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
