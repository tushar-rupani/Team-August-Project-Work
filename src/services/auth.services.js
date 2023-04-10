var connection = require("../connection/connection");
const moment = require("moment");
let getUserData = async (email) => {
  let query = `SELECT * FROM register where email = '${email}'`;
  let [results] = await connection.execute(query);
  return results;
};

let checkUserIp = async (ip) => {
  let ipCheckingQuery = `SELECT * FROM ip_handler where ip_address = '${ip}'`;
  let executeIpQuery = await connection.execute(ipCheckingQuery);
  return executeIpQuery;
};

let getFinalBlockTime = async (email) => {
  let getTimeOfBlock = `SELECT final_attempt_time from register where email = '${email}'`;
  let executeQuery = await connection.execute(getTimeOfBlock);
  return executeQuery;
};

let resetUserAttempts = async (email) => {
  let update_attempts = `UPDATE register SET attempts_remaining = 3, status = 'U' WHERE email = '${email}'`;
  try {
    let execute_update_query = await connection.execute(update_attempts);
  } catch (err) {
    console.log(err);
  }
};

let hasEmpData = async (emp_id) => {
  let check_emp_details = `select * from basic_information where employee_id = '${emp_id}'`;
  try {
    let [hasData] = await connection.execute(check_emp_details);
    return hasData;
  } catch (e) {
    console.log(e);
  }
};

let whenAttemptsAreZero = async (attempts_remaining, email) => {
  try {
    let checkIfAlreadyBlocked = `SELECT status from register where email = '${email}'`;
    let [getAns] = await connection.execute(checkIfAlreadyBlocked);

    if (getAns[0].status == "U") {
      let currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
      let update_attempts = `UPDATE register SET attempts_remaining = ${attempts_remaining}, final_attempt_time = '${currentDate}', status = 'B' WHERE email = '${email}'`;
      let execute_time = await connection.execute(update_attempts);
      return true;
    }
  } catch (e) {
    console.log(e);
  }
};
module.exports = {
  getUserData,
  checkUserIp,
  getFinalBlockTime,
  resetUserAttempts,
  hasEmpData,
  whenAttemptsAreZero,
};
