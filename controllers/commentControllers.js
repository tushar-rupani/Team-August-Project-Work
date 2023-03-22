var connection = require("../connection/connection");


const addcommentControllers = async (req, res) => {
    let id = req.session.user;
    //console.log(id);
    let comment = req.body;
    let comments = comment.data;
    //console.log(comments);

    let ts = Date.now();

    let date_time = new Date(ts);
    let date = date_time.getDate();
    let month = date_time.getMonth() + 1;
    let year = date_time.getFullYear();

 
   
    var date_ob=year + "-" + month + "-" + date

    let query = `INSERT INTO comments (employee_id,comment,date) VALUES (${id},"${comments}","${date_ob}"); `;
    try {
        let insertQuery = await connection.execute(query);
        let qry_show = `SELECT * FROM HRMS.comments where employee_id = ${id} order by id DESC limit 1`;
        let selectQuery = await connection.execute(qry_show);
        res.json({comment: selectQuery[0][0].comment})

    } catch (err) {
        return console.log(err);
    }

  

}

module.exports = { addcommentControllers }


