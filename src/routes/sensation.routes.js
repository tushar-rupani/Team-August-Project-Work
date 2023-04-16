const express = require("express");
const { handleLogin } = require("../middlewares/authMiddlewares");
const router = express.Router();
const {upload} = require("../helpers/multer-storage");
const {renderController, postMessage, getNameOfUser, renderVideoChat} = require('../controllers/sensation.controller')
router.get("/", handleLogin, renderController)
router.post("/", handleLogin, upload.array('file',1), postMessage)
router.get("/name-of-user", getNameOfUser);
router.get("/video-call", handleLogin, renderVideoChat);

module.exports = router;