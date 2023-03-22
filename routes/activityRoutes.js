const express = require("express");
const router=express.Router();
const { handleLogin } = require("../middlewares/authMiddlewares");
const {checkInHandler, checkOutHandler, breakInHandler, breakOutHander} = require("../controllers/activityController");


router.get("/check-in", handleLogin, checkInHandler);
router.get("/check-out", handleLogin, checkOutHandler);
router.get("/break-in", handleLogin, breakInHandler);
router.get("/break-out", handleLogin, breakOutHander);


module.exports = router;