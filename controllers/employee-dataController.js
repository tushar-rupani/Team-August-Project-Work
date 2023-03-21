var connection = require("../connection/connection");

const saveData = async(req, res) => {
    console.log(req.files);
    console.log("done");
    
    
}

const renderForm=async(req, res) => {
    res.render("employee_form");
}

module.exports = {saveData,renderForm};