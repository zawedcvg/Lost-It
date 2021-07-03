const express = require("express");
const userController = require("../controllers/userController.js");
const auth = require("../middleware/auth.js");
const authAdmin = require("../middleware/authAdmin.js");

const router = express.Router();

router.post("/register", userController.register);
router.post("/activation", userController.activateEmail);
router.post("/login", userController.login);
router.post("/refresh_token", userController.getAccessToken);
router.post("/forgot", userController.forgotPassword);
router.post("/reset", auth, userController.resetPassword);
router.get("/info", auth, userController.getUserInfo);
router.get("/completeinfo", auth, authAdmin, userController.getCompleteInfo);
router.post("/logout", userController.logout);
router.patch("/update", auth, userController.updateUser);
router.patch(
    "/update_role/:id",
    auth,
    authAdmin,
    userController.updateUserRole
);
router.delete("/delete/:id", auth, authAdmin, userController.deleteUser);

module.exports = router;
