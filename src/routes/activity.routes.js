const express = require("express");
const router=express.Router();
const { handleLogin } = require("../middlewares/authMiddlewares");
const {checkInHandler, checkOutHandler, addLeaveControllers, breakInHandler, breakOutHander, addcommentControllers} = require("../controllers/activity.controller");


router.get("/check-in", handleLogin, checkInHandler);
router.get("/check-out", handleLogin, checkOutHandler);
router.get("/break-in", handleLogin, breakInHandler);
router.get("/break-out", handleLogin, breakOutHander);
router.post("/add-comment", handleLogin, addcommentControllers);
router.get("/add-leave", handleLogin, addLeaveControllers);

module.exports = router;