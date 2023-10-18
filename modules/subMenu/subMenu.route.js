const express = require("express");
const { isAuth } = require("../../utils/middleware");
const {
  getSubMenusByParentMenu,
  getSubMenuById,
  createSubMenu,
  createSubMenus,
  getSubMenus,
  updateSubMenu,
  deleteSubMenuById,
} = require("./subMenu.controller");

const router = express.Router();

router.post("/single", createSubMenu);
router.post("/multiple", createSubMenus);
router.get("/parent-menu/:parentMenuId", getSubMenusByParentMenu);
router.get("/:id", getSubMenuById);
router.get("/", getSubMenus);
router.patch("/:id", updateSubMenu);
router.delete("/:id", deleteSubMenuById);

module.exports = router;
