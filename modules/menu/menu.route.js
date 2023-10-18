const express = require("express");
const { isAuth } = require("../../utils/middleware");
const {
  createMenu,
  getMenusByUser,
  getMenuById,
  getMenus,
  updateMenu,
  deleteMenuById,
} = require("./menu.controller");

const router = express.Router();

router.post("/", createMenu);
router.get("/user/:userId", getMenusByUser);
router.get("/:id", getMenuById);
router.get("/", getMenus);
router.patch("/:id", updateMenu);
router.delete("/:id", deleteMenuById);

module.exports = router;
