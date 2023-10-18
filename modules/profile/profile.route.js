const express = require("express");
const { isAuth } = require("../../utils/middleware");
const {
  createProfile,
  getProfileByUser,
  getProfileById,
  getProfiles,
  updateProfile,
  deleteProfileById,
} = require("./profile.controller");

const router = express.Router();

router.post("/", createProfile);
router.get("/user/:userId", getProfileByUser);
router.get("/:id", getProfileById);
router.get("/", getProfiles);
router.patch("/:id", updateProfile);
router.delete("/:id", deleteProfileById);

module.exports = router;
