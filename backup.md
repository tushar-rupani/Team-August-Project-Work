let attempts_remaining = results[0].attempts_remaining;
  

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
      if (diffInMilliseconds >= 86400000) {
        let update_attempts = `UPDATE register SET attempts_remaining = 3, status = 'U' WHERE email = '${email}'`;
        try {
          let execute_update_query = await connection.execute(update_attempts);
        } catch (err) {
          return console.log(err);
        }
      } else {
        console.log("false");
      }
      return res.render("suspend")
    }
    attempts_remaining -= 1;
    console.log(attempts_remaining);
    if (attempts_remaining == 0) {
      try {
        let currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
        let update_attempts = `UPDATE register SET final_attempt_time = '${currentDate}', status = 'B' WHERE email = '${email}'`;
        let execute_time = await connection.execute(update_attempts);
      } catch (err) {
        return console.log(err);
      }
    } else {
      let update_attempts = `UPDATE register SET attempts_remaining = ${attempts_remaining} WHERE email = '${email}'`;
      console.log(update_attempts);
      try {
        let execute_update_query = await connection.execute(update_attempts);
      } catch (err) {
        return console.log(err);
      }
    }
    if (results[0].status == "B") {
      return res.render("suspend")
    }
    loginErrors.message = "Oops your password is wrong";
    return res.json({ error: loginErrors });
  }
  req.session.user = results[0].id;
  return res.redirect("/self/home");