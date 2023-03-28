const jwt = require("jsonwebtoken");
var connection = require("../connection/connection");

function checkIfTokenExists(req, res, next){
    let token = req.cookies.token;
    if(!token){
        next();
    }else{
        return res.redirect("/activate");
    }
}

function handleLogin(req, res, next){
    if(!req.session.user){
        return res.redirect("/")
    }
    next();
}

async function checkIfLoggedIn(req, res, next){
    
    if(req.session.user){
        let emp_id=req.session.id;
        let check_emp_details = `select * from basic_information where employee_id = '${emp_id}'`;
        try {
            let [hasData] = await connection.execute(check_emp_details);

            if (hasData.length === 0) {
                return res.redirect("/employee-form");
            }


        } catch (e) {
            console.log(e);
        }
        return res.redirect("/self/home")
    }
    next();
}

module.exports = {checkIfTokenExists, handleLogin, checkIfLoggedIn};