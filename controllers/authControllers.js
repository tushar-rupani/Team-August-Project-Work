var connection = require("../connection/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const moment = require("moment");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tushar24081@gmail.com",
    pass: "ixhxfutyajfpmprc",
  },
});

const loginController = async (req, res) => {
  const loginErrors = {};
  const { email, password } = req.body;
  let results;
  let query = `SELECT * FROM register where email = '${email}'`;
  try {
    results = await connection.execute(query);
    results = results[0];
  } catch (err) {
    console.log(err);
  }

  let attempts_remaining = results[0].attempts_remaining;
  if (results.length == 0) {
    loginErrors.message = "There are no users with this name";
    return res.render("error", { error: loginErrors });
  }
  if (results[0].isActivated == "0") {
    return res.render("activation", { email });
  }
  let dbPass = results[0].password;
  const isMatch = await bcrypt.compare(password, dbPass);
  if (!isMatch) {
    if (attempts_remaining == 0) {
      let getTimeOfBlock = `SELECT final_attempt_time from register where email = '${email}'`;
      let executeQuery = await connection.execute(getTimeOfBlock);
      let final_time = executeQuery[0][0].final_attempt_time;
      let dbTime = new Date(final_time);
      const currentTime = moment();
      const diffInMilliseconds = currentTime.diff(dbTime);
      if(diffInMilliseconds >= 86400000){
        let update_attempts = `UPDATE register SET attempts_remaining = 3 WHERE email = '${email}'`;
        try {
          let execute_update_query = await connection.execute(update_attempts);
        } catch (err) {
          console.log(err);
        }
      }else{
        console.log("false");
      }
      return res.render("suspend")
    }
    attempts_remaining -= 1;
    if (attempts_remaining == 0) {
      try {
        let currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
        let update_attempts = `UPDATE register SET final_attempt_time = '${currentDate}' WHERE email = '${email}'`;
        let execute_time = await connection.execute(update_attempts);
      } catch (err) {
        console.log(err);
      }
    }
    let update_attempts = `UPDATE register SET attempts_remaining = ${attempts_remaining} WHERE email = '${email}'`;
    try {
      let execute_update_query = await connection.execute(update_attempts);
    } catch (err) {
      console.log(err);
    }
    loginErrors.message = "Oops your password is wrong";
    return res.render("error", { error: loginErrors });
  }
  req.session.user = results[0].id;
  return res.redirect("/self/home");
};

const registerController = async (req, res) => {
  let { email, password } = req.body;

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
        html: `<h1>Welcome aboard!</h1><p>Click the below activation link to get started.</p><a href="http://localhost:3000/activate-account/${token}">${token}</a>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
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

module.exports = {
  loginController,
  registerController,
  checkEmailExistController,
  logoutController,
};
