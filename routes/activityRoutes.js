const express = require("express");
const router=express.Router();
const { handleLogin } = require("../middlewares/authMiddlewares");

router.get("/check-in", (req, res) => {

})

module.exports = router;