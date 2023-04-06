const express = require("express");
const { handleLogin } = require("../middlewares/authMiddlewares");
const router = express.Router();
const {renderController, postMessage, getNameOfUser} = require('../controllers/sensation.controller')
router.get("/", handleLogin, renderController)


router.post("/", handleLogin, postMessage)

router.get("/name-of-user", getNameOfUser)
module.exports = router;