var connection = require("../connection/connection");


const addcommentControllers = async (req,res) => {
   let id = req.session.user;
   //console.log(id);
   let comment = req.body;
   let comments = comment.data;
   //console.log(comments);
   let query = `INSERT INTO comments (employee_id,comment) VALUES (${id},"${comments}"); `;
    try {
        let insertQuery = await connection.execute(query);
        
    } catch (err) {
        return console.log(err);
    }
  
   
}
module.exports = {addcommentControllers}