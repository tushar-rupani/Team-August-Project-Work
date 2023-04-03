const express = require("express");
const router = express.Router();

const { handleLogin } = require("../middlewares/authMiddlewares");
const {renderHotline, showStatusData, showStatusCount, searchHotline} = require("../controllers/hotline.controller");

router.get("/hotline", handleLogin, renderHotline);

router.get("/hotline/user/:status", handleLogin, showStatusData);

router.get("/hotline/user-count/:status", handleLogin, showStatusCount);

router.get("/hotline/search", handleLogin, searchHotline);



module.exports = router;