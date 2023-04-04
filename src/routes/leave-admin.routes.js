const express = require("express");
const router=express.Router();

const {leaveAdminController,showleaveAdminController,acceptLeaveController,rejectLeaveController} = require("../controllers/leave-admin.controllers");

router.get("/leaveAdmin",leaveAdminController);
router.get("/showleaveAdmin",showleaveAdminController);
router.get("/acceptLeave",acceptLeaveController);
router.get("/rejectLeave",rejectLeaveController);



module.exports = router;