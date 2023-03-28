var connection = require("../connection/connection");

const calenderController = async(req,res) => {
    res.render('calender.ejs');
}
module.exports = {calenderController}