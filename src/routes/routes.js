const express = require("express");
const routes_app = express.Router();
const authRoutes = require("../routes/register.routes")
const homeRoutes = require("../routes/home.routes");
const hotlineRoutes = require("../routes/hotline.routes");
const SensationRoutes = require("../routes/sensation.routes");
const activityRoutes = require("../routes/activity.routes");
const employeeFormRoutes = require("../routes/employee-form.routes");
const leavesRoutes = require("../routes/leaves.routes");
const leaveAdminRoutes = require("../routes/leave-admin.routes")
const sensationRoutes = require("../routes/sensation.routes")


routes_app.use("/", authRoutes);
routes_app.use("/self", homeRoutes);
routes_app.use("/self", hotlineRoutes);
routes_app.use("/self", SensationRoutes);
routes_app.use("/activity", activityRoutes);
routes_app.use("/leaves",leavesRoutes);
routes_app.use("/leaveadmin", leaveAdminRoutes);
routes_app.use("/sensation", sensationRoutes)
routes_app.use("/",employeeFormRoutes);


module.exports = routes_app;