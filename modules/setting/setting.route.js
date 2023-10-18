const express = require("express");
const { isAuth } = require("../../utils/middleware");
const {
  createSetting,
  getSettingByUser,
  getSettingById,
  getSettings,
  updateSetting,
  deleteSettingById,
} = require("./setting.controller");

const router = express.Router();

router.post("/", createSetting);
router.get("/user/:userId", getSettingByUser);
router.get("/:id", getSettingById);
router.get("/", getSettings);
router.patch("/:id", updateSetting);
router.delete("/:id", deleteSettingById);

module.exports = router;
