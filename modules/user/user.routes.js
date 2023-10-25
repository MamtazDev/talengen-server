const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  emailVerification,
  getUser,
  getUserInfo,
  forgetPassword,
  changePassword,
  deleteUserAndCollections,
  checkIsExistEmail,
  updateUserInfo,
} = require("./user.controller");
const { isAuth } = require("../../utils/middleware");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/verifyEmail", emailVerification);
router.patch("/:id", updateUserInfo);
router.get("/", isAuth, getAllUsers);
router.delete("/delete/:id", deleteUser);
router.get("/:id", getUser);
router.get("/user-info/me", isAuth, getUserInfo);
router.post("/forgot-password", forgetPassword);
router.post("/password/change-password/:email",  changePassword);
router.post("/remove/all-data", isAuth, deleteUserAndCollections);
router.post("/check-email", checkIsExistEmail);

module.exports = router;
