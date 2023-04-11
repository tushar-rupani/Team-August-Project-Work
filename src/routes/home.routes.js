const express = require("express");
const router = express.Router();
const moment = require("moment");
const jwt = require("jsonwebtoken");

const { handleLogin } = require("../middlewares/authMiddlewares");
const {renderHome, renderLogs, editForm, forgotCheckout} = require("../controllers/home.controller")
const {checkIndividualEmp} = require("../controllers/employee-data.controller");
const {news} = require("../controllers/news.controller")
const {
  attendanceGenerate,
  returnSearchData,
  filterDataByDate,
  profileController
} = require("../controllers/attendance.controllers");

var connection = require("../connection/connection");



router.get("/home", handleLogin, renderHome);

router.get("/logs", handleLogin, renderLogs);

router.get("/attendance-report", handleLogin, attendanceGenerate);

router.get("/filter-data/:startDate/:endDate", handleLogin, filterDataByDate)

router.get("/get-log-search/:search", handleLogin, returnSearchData);

router.get("/get-user", handleLogin, async (req, res) => {
  let user = jwt.verify(req.cookies.user, "JWT_SECRET");

  try {
    let query = `select * from basic_information bi,company_relation cr where bi.employee_id=cr.employee_id and bi.employee_id=${user}`;

    let [[user_data]] = await connection.execute(query);

    return res.status(200).json({ msg: "done", user_data });
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
});

router.get("/edit-form", handleLogin, editForm);

router.get("/profile", handleLogin, profileController);

router.get("/emp-data/:id", handleLogin, checkIndividualEmp);

router.get("/news", handleLogin, news);

router.post("/add-forgot", handleLogin, forgotCheckout)

module.exports = router;
