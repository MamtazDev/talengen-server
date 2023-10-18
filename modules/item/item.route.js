const express = require("express");
const { isAuth } = require("../../utils/middleware");
const {
  createItem,
  getItemsByParentMenu,
  getItemsBySubMenu,
  getItemById,
  getItems,
  updateItem,
  deleteItemById,
  getItemsByUserId,
} = require("./item.controller");

const router = express.Router();

router.post("/", createItem);
router.get("/parent-menu/:parentMenuId", getItemsByParentMenu);
router.get("/sub-menu/:subMenuId", getItemsBySubMenu);
router.get("/user/:userId", getItemsByUserId);
router.get("/:id", getItemById);
router.get("/", getItems);
router.patch("/:id", updateItem);
router.delete("/:id", deleteItemById);

module.exports = router;
