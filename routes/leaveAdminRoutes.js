const express = require("express");
const router=express.Router();

const {leaveAdminController,showleaveAdminController,acceptLeaveController,rejectLeaveController} = require("../controllers/leaveAdminController.js");

router.get("/leaveAdmin",leaveAdminController);
router.get("/showleaveAdmin",showleaveAdminController);
router.get("/acceptLeave",acceptLeaveController);
router.get("/rejectLeave",rejectLeaveController);



module.exports = router;