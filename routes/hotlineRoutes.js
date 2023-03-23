const hotlineController = require("../controllers/hotlineController");
const express = require("express");
const {hotline, status_data} = require("../controllers/hotlineController");
const router=express.Router();


router.get('/', hotline);

router.get('/online', status_data);


module.exports = router;