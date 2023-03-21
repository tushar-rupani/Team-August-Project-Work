var connection = require("../connection/connection");
let path=require('path');
let fs=require('fs');
let sharp=require('sharp');

const saveData = async (req, res) => {
    let data = JSON.parse(req.body.data);
    let photos = req.files;

    let uncompressed_files=photos.map((f)=>f.filename);
    

    let upload_uncompressed_path=path.join(__dirname+"/../public/upload_uncompressed");
    let upload_compressed_path=path.join(__dirname+"/../public/upload_compressed");

    //upload compressed files =======
    try {
    
        uncompressed_files.forEach(async function(file){
            let file_path = path.join(upload_uncompressed_path,"/"+file);
            let new_file_path = path.join(upload_compressed_path,"/"+file);
            await sharp(file_path).resize().jpeg({quality:50}).toFile(new_file_path);
        });
        
    } catch (err) {
        console.log(err);
        
    }
    //================================

    res.json({ data: "uploaded" });


}

const renderForm = async (req, res) => {
    res.render("employee_form");
}

module.exports = { saveData, renderForm };