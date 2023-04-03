const multer = require('multer');
const {v4 : uuidv4} = require('uuid');

const path = require('path');
let pathForImages = path.join(__dirname + "../../../public/upload_uncompressed");

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,pathForImages);
    },
    filename:(req,file,cb)=>{
        const imgID = uuidv4()
        cb(null,Date.now()+imgID+path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage});

module.exports = {upload}