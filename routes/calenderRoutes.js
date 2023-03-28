const express = require("express");
const router=express.Router();

const {calenderController} = require("../controllers/calenderController.js");

router.get("/calender",calenderController);

module.exports = router;