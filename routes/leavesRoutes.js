const express = require("express");
const router=express.Router();

const {leavesController, addleavesController} = require("../controllers/leavesController.js");
const { handleLogin } = require("../middlewares/authMiddlewares");

router.get("/", handleLogin, leavesController);
router.post("/addleaves", handleLogin, addleavesController);



module.exports = router;