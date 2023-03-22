const express = require("express");
const router=express.Router();

const {leavesController, addleavesController,cancelleavesController} = require("../controllers/leavesController.js");

router.get("/leaves",leavesController);
router.post("/addleaves",addleavesController);
router.get("/cancelleaves",cancelleavesController);


module.exports = router;