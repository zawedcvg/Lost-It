const express = require("express");
const uploadImage = require("../middleware/uploadImage.js");
const uploadController = require("../controllers/uploadController.js");
const auth = require("../middleware/auth.js");

const router = express.Router();
router.post("/upload_avatar", uploadImage, auth, uploadController.uploadAvatar);

module.exports = router;
