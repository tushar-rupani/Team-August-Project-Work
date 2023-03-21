const { handleLogin } = require("../middlewares/authMiddlewares");
const express = require("express");
const router = express.Router();

const {saveData,renderForm}=require('../controllers/employee-dataController')

const multer  = require('multer');
const path = require('path');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'upload_uncompressed');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage});


router.get("/employee-form", handleLogin, renderForm);

router.post("/employee-form", handleLogin, saveData);



module.exports = router;