const express = require("express");
const router=express.Router();

const {leavesController, addleavesController} = require("../controllers/leavesController.js");

router.get("/leaves",leavesController);
router.post("/addleaves",addleavesController);



module.exports = router;