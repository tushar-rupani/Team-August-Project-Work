const nodemailer = require("nodemailer");
var mailer = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILPASS,
    },
  });

module.exports = {mailer};