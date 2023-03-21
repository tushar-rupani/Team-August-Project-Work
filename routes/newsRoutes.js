const newsController = require("../controllers/newsController");
const express = require("express");
const router=express.Router();


router.get('/',newsController);

module.exports = router;