const express = require("express");
const router=express.Router();

const {leavesController, addleavesController, getLeaveByStatus, getLeaveById} = require("../controllers/leaves.controller.js");
const { handleLogin } = require("../middlewares/authMiddlewares.js");

router.get("/", handleLogin, leavesController);
router.post("/addleaves", handleLogin, addleavesController);
router.get("/leave-status/:status", handleLogin, getLeaveByStatus);
router.get("/get-leave-id/:id", handleLogin, getLeaveById);

module.exports = router;