var connection = require("../connection/connection");
const dateformat = require('date-fns');

const hotline = async (req, res) => {
    // let query = `select basic_information.employee_id , basic_information.full_name, company_relation.designation, company_relation.department,company_relation.join_date,contact_information.contact_no,register.email from basic_information INNER JOIN company_relation ON basic_information.employee_id = company_relation.employee_id INNER JOIN contact_information ON basic_information.employee_id = contact_information.employee_id INNER JOIN register ON basic_information.employee_id = register.id`;

    // let query1=`select id from daily_logs where employee_id = 23 ORDER BY id DESC LIMIT 1 ; `;
    // let result = await connection.execute(query);
    // let result1 = await connection.execute(query1);
    // console.log(result1[0][0])
    // let query2=`select activity from daily_logs where employee_id = 23 and id=${result1[0][0].id}  `;
    // let [result2] = await connection.execute(query2);
    //     console.log(result2[0].activity)
    //     var status = result2[0].activity;
    //     var user_status;

    //     if(status == "Checked In" || status == "Breaked Out"){
    //         user_status = "Online"
    //     }else if(status == "Breaked In"){
    //         user_status = "On Break";

    //     }else if(status == "Checked Out"){
    //         user_status = "Offline";

    //     }
    //     let dob = dateformat.format(new Date(result[0][0].join_date ), 'dd-MM-yyyy');
    //     console.log("hbk",result[0][0]);
    //      res.render('hotline', {
    //          activatePage: "hotline",
    //          data : result[0][0] ,
    //          dob:dob,
    //          status: user_status

    //     });


    let query = `select basic_information.employee_id , basic_information.full_name, company_relation.designation, company_relation.department,company_relation.join_date,contact_information.contact_no,register.email from basic_information INNER JOIN company_relation ON basic_information.employee_id = company_relation.employee_id INNER JOIN contact_information ON basic_information.employee_id = contact_information.employee_id INNER JOIN register ON basic_information.employee_id = register.id`;
    let result = await connection.execute(query);

    let ts = Date.now();

    let date_time = new Date(ts);
    let date_new = date_time.getDate();
    let month = date_time.getMonth() + 1;
    let year = date_time.getFullYear();

 
   
    var date_ob=year + "-" + month + "-" + date_new;
    console.log(date_ob)
    let logs =[];
    let date=[]
    for (var i = 0; i < result[0].length; i++) {
        console.log("result", result[0][i].employee_id);
        var id = result[0][i].employee_id;


        let query1 = `select id from daily_logs where employee_id ='${id}'   ORDER BY id DESC LIMIT 1 ; `;

        let [result1] = await connection.execute(query1);
        let query2 = `select activity from daily_logs where employee_id ='${id}' and id=${result1[0].id}  `;
        let [result2] = await connection.execute(query2);
        console.log("result1", result1[0].id)
        console.log(result2[0])
        var status = result2[0];
        date[i] = dateformat.format(new Date(result[0][i].join_date), 'dd-MM-yyyy');
        logs[i]=status.activity;

    }
    console.log(logs )
    console.log(date);

    // console.log("hbk",result[0][0]);
    res.render('hotline', {
        activatePage: "hotline",
        data: result[0],
        dob: date,
        status: logs
    });

}
const status_data = async (req, res) => {

  

}
module.exports = { hotline, status_data };