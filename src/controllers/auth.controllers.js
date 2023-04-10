var connection = require("../connection/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const {getUserData, checkUserIp, getFinalBlockTime, resetUserAttempts, hasEmpData, whenAttemptsAreZero} = require('../services/auth.services.js');
const {mailer:transporter} = require("../helpers/node-mailer");

const loginController = async (req, res) => {
  const { email, password, ip } = req.body;
  try {
    var results = await getUserData(email);
    if (results.length == 0) {
      return res.status(404).json({ msg: "There are no users with this credentials",ans:"error" });
    }

    let executeIpQuery = await checkUserIp(ip);
    if (!executeIpQuery[0].length) {
      return res.status(401).json({ msg: "The device you're trying is not acceptable in our case",ans:"error" });
    }

  } catch (err) {
    console.log(err);
  }

  if (results[0]?.isActivated == "0") {
    return res.status(200).json({ msg: "redirected",ans:"activate" });
  }

  let dbPass = results[0].password;

  if (results[0].status == "B") {
    let executeQuery = await getFinalBlockTime(email);
    let final_time = executeQuery[0][0].final_attempt_time;
    if (final_time) {
      let dbTime = new Date(final_time);
      const currentTime = moment();
      const diffInMilliseconds = currentTime.diff(dbTime);
      if (diffInMilliseconds >= 86400000) {
        resetUserAttempts(email);
      }
    }
  }


  const isMatch = await bcrypt.compare(password, dbPass);
  if (!isMatch) {
    let query = `SELECT attempts_remaining FROM register where email = '${email}'`;
    try {
      [results] = await connection.execute(query);
      let attempts_remaining = results[0].attempts_remaining;

      if (attempts_remaining <= 0) {
        let ans = whenAttemptsAreZero(attempts_remaining, email);
        if(ans){
          return res.status(200).json({ msg: "redirected",ans:"suspend" });
        }
        
      } else {
        attempts_remaining = attempts_remaining - 1;
        let update_attempts = `UPDATE register SET attempts_remaining = ${attempts_remaining} WHERE email = '${email}'`;
        try {
          let execute_update_query = await connection.execute(update_attempts);
        } catch (err) {
          console.log(err);
        }
      }

    }
    catch (e) {
      console.log(e);
    }
    return res.status(401).json({ msg: "Oops your password is wrong",ans:"error" });
  }

  let final_time_checking = `SELECT * FROM register where email = '${email}'`;
  try {
    let [results] = await connection.execute(final_time_checking);

    if (results[0].status == "B") {
      return res.status(200).json({ msg: "redirected",ans:"suspend" });
      // return res.redirect("/suspend");
    }

  }
  catch (e) {
    console.log(e);
  }

  req.session.user = results[0].id;
  let upadting_attempts = `UPDATE register set attempts_remaining = 3 where email = '${email}'`;
  try{
    let execute_attempts = await connection.execute(upadting_attempts);
  }catch(e){  
    console.log(e);
  }


  //check whether the user entered their details or not

  let emp_id=results[0].id;
    let hasData = await hasEmpData(emp_id);
    if(hasData.length===0){
      return res.status(200).json({ msg: "redirected",ans:"employee-form" });
    }
    
  const user = jwt.sign(emp_id, "JWT_SECRET");
  res.cookie("user", user);
  
  return res.status(200).json({ msg: "success",ans:"home" });
  // return res.redirect("/self/home");
};

const registerController = async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();
  console.log(email);
  password = await bcrypt.hash(password, 10);
  const sqlQuery = `INSERT INTO register (email, password) VALUES('${email}', '${password}')`;
  try {
    const executeInsert = await connection.execute(sqlQuery);
    if (executeInsert[0]) {
      req.session.email = email;
      let sessionEmail = req.session.email;
      let payload = { email };
      const token = jwt.sign(payload, "JWT_SECRET");
      res.cookie("token", token);
      var mailOptions = {
        from: "tushar24081@gmail.com",
        to: `${email}`,
        subject: "Password Activation Link",
        html: `<h1>Welcome aboard!</h1><p>Click the below activation link to get started.</p><a href="https://august.appdemoserver.com/activate-account/${token}">${token}</a>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          // console.log("Email sent: " + info.response);
        }
      });
      return res.render("activation", { email: sessionEmail });
    }
  } catch (err) {
    console.log(err);
  }
};

const logoutController = async (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

const checkEmailExistController = async (req, res) => {
  let getEmail = req.body.email;
  getEmail = getEmail.toLowerCase();
  let sqlQuery = `SELECT * FROM register where email = '${getEmail}'`;
  try {
    let results = await connection.execute(sqlQuery);
    if (results[0].length) {
      return res.json({ status: "exist" });
    } else {
      return res.json({ status: "not" });
    }
  } catch (err) {
    console.log(err);
  }
};

const forgotPassRender = (req, res) => {
  res.render("forgot")
}

const forgotPassPost = async(req, res) =>{
    let {email} = req.body;
    email = email.toLowerCase();
    let sqlQuery = `SELECT * FROM register where email = '${email}'`;
    try {
      let [results] = await connection.execute(sqlQuery);
      if (!results.length) {
        return res.status(401).json({ ans: "error", msg: "This email is not registered with us." });
      }else if(results[0].isActivated == 0){
        return res.status(401).json({ ans: "error", msg: "This account has not been activated yet." });
      }

      let payload = { email };  
      const token = jwt.sign(payload, "JWT_SECRET");
      res.cookie("token", token);

      var mailOptions = {
        from: "tushar24081@gmail.com",
        to: `${email}`,
        subject: "Forgot Password Link",
        html: `<h1>Here is your forgot password link!</h1><p>Click the below password reset link to set a new password.</p><a href="https://august.appdemoserver.com/reset-password/${token}">${token}</a>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          // console.log("Email sent: " + info.response);
          req.session.forgot = true; 
          return res.status(200).json({ans: "success", msg: "We have sent you an email with password reset link."})
        }
      });
    } catch (err) {
      console.log(err);
    }
}

const newPasswordPage = (req, res) => {
  if(req.session.email){
    return res.render("newpass")
  }
  res.redirect("/")
}

const resetPassword = (req, res) => {
    let token = req.params.token;
    try{
      let decode = jwt.verify(token, "JWT_SECRET");
      let email = decode.email;
      req.session.email = email;
      console.log("session set", req.session.email);
      res.redirect("/new-pass")
    }catch(e){
      console.log(e);
    }
}

const updatePassword = async(req, res) => {
  let password = req.body.pass;
  try{
    let getUserPassword = `SELECT password from register where email = '${req.session.email}'`;
    let [executeGetPassword] = await connection.execute(getUserPassword);
    let dbPass = executeGetPassword[0].password;
    const isMatch = await bcrypt.compare(password, dbPass);

    if(isMatch){
      return res.json({ans: "error", msg: "New password can not be same as previous one!"})
    }
    password = await bcrypt.hash(password, 10);

    let updateQuery = `UPDATE register SET password = '${password}'`;
    let [executeUpdateQuery] = await connection.execute(updateQuery);

    if(executeUpdateQuery.length != 0){
      return res.json({ans: "success", msg: "We have updated your password try logging in now."})
    }

  }catch(e){
    console.log(e);
    return res.json({ans: "error", msg: "Something went wrong! We're sorry!"})
  }

}
module.exports = {
  loginController,
  registerController,
  checkEmailExistController,
  logoutController,
  forgotPassRender,
  forgotPassPost,
  newPasswordPage,
  resetPassword,
  updatePassword
};
