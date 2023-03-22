const express = require("express");
const router=express.Router();

const {attendanceController} = require("../controllers/attendanceController.js");

router.get("/attendance",attendanceController);

module.exports = router;