const { handleLogin } = require("../middlewares/authMiddlewares");
const express = require("express");
const router = express.Router();
const {saveData,renderForm, updateData}=require('../controllers/employee-data.controller')
const {upload} = require("../helpers/multer-storage");

router.get("/employee-form", handleLogin, renderForm);

router.post("/employee-form",handleLogin,upload.array('file',5),saveData);

router.post("/update-employee-form", handleLogin, upload.array('file',1), updateData);


module.exports = router;