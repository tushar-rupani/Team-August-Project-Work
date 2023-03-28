var connection = require("../connection/connection");
const moment = require("moment");


const attendanceGenerate = async (req, res) => {
    let user_id = req.session.user;
    let getAllRecords = `SELECT * from attendence_manager where employee_id = ${user_id} order by id desc`;
    let [executeGetRecords] = await connection.execute(getAllRecords);
    var array_of_break = [];
    var array_of_passedTime = [];


    let getWorkingDaysOfUser = `SELECT count(*) as days from attendence_manager where employee_id = ${user_id}`;
    let [executeGetWorkingDays] = await connection.execute(getWorkingDaysOfUser);
    if(executeGetWorkingDays){
      var totalWorkingDays = executeGetWorkingDays[0]?.days;
    }
    let getTotalOfficeHours = totalWorkingDays * 10;

    let lateDays = `SELECT count(id) as late from attendence_manager WHERE employee_id = ${user_id} and is_late = 1`;
    let [executeLateDays] = await connection.execute(lateDays);
    let array_of_worked_hours = [];
    var lateDaysCount = executeLateDays[0].late;
    
    // Use for...of loop to iterate through the array
    for (const record of executeGetRecords) {

    let worked_hours = record.hours_worked;
    array_of_worked_hours.push(worked_hours);
    // console.log(worked_hours);
    let [hours, minutes] = worked_hours.split(":");
    let passedMinutes = parseInt(hours) * 60 + parseInt(minutes);
    let percentage = (passedMinutes / 600) * 100;
    array_of_passedTime.push(percentage.toFixed(2))
    
      let dateToSearch = record.date.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');
      let timeForThatDay = `SELECT duration from break_manager where created_date = '${dateToSearch}' and employee_id = ${user_id}`;
      let [getTimeForThatDay] = await connection.execute(timeForThatDay);
      let initial_time = 0;
      getTimeForThatDay.forEach(data => {
        initial_time += parseInt(data.duration);
      });
      array_of_break.push(initial_time);
    }
    let finalMinutes = 0;
    for(const work of array_of_worked_hours){
      const time = moment.duration(work);
      const mins = time.asMinutes();
      finalMinutes += mins;
    }
    finalMinutes = finalMinutes.toFixed(0);
    // console.log(finalMinutes);

    const duration = moment.duration(finalMinutes, "minutes");
    const hoursWorked = duration.asHours().toFixed(0);

    const workingRatio = (hoursWorked / getTotalOfficeHours) * 100;
    let formattedTimes = array_of_break.map(sec => moment.utc(sec * 1000).format('H:mm'));
    res.render("attendance", { activatePage: "attendance", getTotalOfficeHours, workingRatio, hoursWorked, totalWorkingDays, lateDaysCount, executeGetRecords, formattedTimes, array_of_passedTime });
  }
  

const returnSearchData = async (req, res) => {
  let currentDate = moment().format("YYYY-MM-DD");
  let searchString = req.params.search;
  let sqlQuery = `SELECT b.full_name, activity, time from basic_information b 
  INNER JOIN daily_logs d
  ON d.employee_id = b.employee_id
  where date = '${currentDate}' and b.full_name LIKE '${searchString}%';`

  let [executeLog] = await connection.execute(sqlQuery);
  
  return res.json({ans: executeLog});
}


const filterDataByDate = async (req, res) => {
  let start = req.params.startDate;
  let end = req.params.endDate;
  let user_id = req.session.user;
  let getAllRecords = `SELECT * from attendence_manager where employee_id = ${user_id} and date between '${end}' and '${start}' order by id desc`;
  let [executeGetRecords] = await connection.execute(getAllRecords);
  
}

module.exports = {attendanceGenerate, returnSearchData, filterDataByDate};