if(/Mobi/.test(navigator.userAgent)) {
  document.querySelector(".mobile-message").classList.remove("hidden");
  document.querySelector(".container").classList.add("hidden");
} 

const MenuBtn = document.querySelector("#menu-btn");
const SideMenu = document.querySelector("#sidebar");
const CloseBtn = document.querySelector("#close-btn");
const ThemeToggler = document.querySelector(".theme-toggler");
const date = new Date().toLocaleDateString();


const dateLabel = document.getElementById("current-date");
const timeLabel = document.getElementById("current-time");

const checkIn = document.getElementById("check-in")
const checkOut = document.getElementById("check-out");
const breakIn = document.getElementById("break-in");
const breakOut = document.getElementById("break-out");

const buttons = document.getElementById("buttons");
const time = new Date().toLocaleTimeString();
const recent = document.getElementById("recents");
timeLabel.innerHTML = time;


dateLabel.innerHTML = date;

const renew = document.getElementById("renew");





setInterval(() => {
    const time = new Date().toLocaleTimeString();
    timeLabel.innerHTML = time;
}, 1000);

if(checkOut){


checkOut.addEventListener("click", async(e) => {
    swal("Are you sure you want to Check Out?", {
        buttons: {
          cancel: "Cancel!",
          catch: {
            text: "Yes Do it!",
            value: "Yes",
          },
        },
      })
      .then(async (value) => {
        switch (value) {
          case "Yes":
            await checkOutData();
            await gettingLogData();
            break;
        }
      });
})
}
if(checkIn){

checkIn.addEventListener("click", async (e) => {
    let ans = await fetch("/activity/check-in");
    let data = await ans.json();
    console.log(data);

    if(data["leave"]){
      swal("You applied leave for today, but you are still present at office. So we are removing that leave.")
    }
    if (data["status"] == "DONE") {
        let checkInSpan = document.getElementById("backlog");
        checkInSpan.innerHTML = ` <div class="check_in" id="check-in-span">
        <span>Checked In : ${convertUTCTime(data["checkInTime"])}</span>
        </div> `
        checkIn.classList.add("disabling");
        checkIn.disabled = true;

        breakIn.classList.remove("disabling")
        breakIn.disabled = false;

        checkOut.classList.remove("disabling")
        checkOut.disabled = false;

        gettingLogData();

    }
    else if(data["status"] == "ERROR"){
        swal(data.message)
    }

})
}

if(breakIn){

breakIn.addEventListener("click", async(e) => {
    swal("Are you sure you want to Break In?", {
        buttons: {
          cancel: "Cancel!",
          catch: {
            text: "Yes Do it!",
            value: "Yes",
          },
        },
      })
      .then(async (value) => {
        switch (value) {
          case "Yes":
            await breakInData();
            await gettingLogData();
            break;
        }
      });
})
}


if(breakOut){


breakOut.addEventListener("click", async(e) => {

    swal("Are you sure you want to Break Out?", {
        buttons: {
          cancel: "Cancel!",
          catch: {
            text: "Yes Do it!",
            value: "Yes",
          },
        },
      })
      .then(async (value) => {
        switch (value) {
          case "Yes":
            await breakOutData();
            await gettingLogData();
            break;
        }
      });
   
})

}


async function checkOutData() {
    let ans = await fetch("/activity/check-out");
    let data = await ans.json();

    if (data["status"] == "DONE") {
        let checkInSpan = document.getElementById("backlog");
        checkInSpan.innerHTML += ` <div class="check_out">
        <span>Checked Out : ${convertUTCTime(data["checkOutTime"])}</span>
    </div> `
      
    buttons.innerHTML = ``;
    recent.innerHTML += `<div class="final_message"><i class="fa-solid fa-face-smile" style="color: #ffffff;"></i> Thank you for your presence</div> `;
    }
    else if(data["status"] == "ERROR"){
        swal(data.message)
    }
}
async function breakOutData(){
    let ans = await fetch("/activity/break-out");
    let data = await ans.json();
    if(data["status"] == "DONE"){
        let checkInSpan = document.getElementById("backlog");
        checkInSpan.innerHTML += ` <div class="break_out">
        <span>Breaked Out : ${convertUTCTime(data["breakOutTime"])}</span>
    </div>`;
    checkOut.classList.remove("disabling");
    checkOut.disabled = false;
    breakIn.classList.remove("disabling")
    breakIn.disabled = false;
    breakOut.classList.add("disabling")
    breakOut.disabled = true;
    }
    else if(data["status"] == "ERROR"){
        swal(data.message)
    }
}

async function breakInData(){
    let ans = await fetch("/activity/break-in");
    let data = await ans.json();
    if(data["status"] == "DONE"){
        let checkInSpan = document.getElementById("backlog");
        checkInSpan.innerHTML += ` <div class="break_in">
        <span>Breaked In : ${convertUTCTime(data["breakInTime"])}</span>
    </div>`
    addingClass();
    }
    else if(data["status"] == "ERROR"){
        swal(data.message)
    }
}



function addingClass(){
  checkOut.classList.add("disabling");
  checkOut.disabled = true
  breakIn.classList.add("disabling");
  breakIn.disabled = true
  checkIn.classList.add("disabling");
  checkIn.disabled = true
  breakOut.classList.remove("disabling");
  breakOut.disabled = false;

}
MenuBtn.addEventListener('click', () => {
    SideMenu.style.display = 'block'
})

CloseBtn.addEventListener('click', () => {
    SideMenu.style.display = 'none'
})



ThemeToggler.addEventListener("click", () => {
    document.body.classList.toggle('dark-theme-variables')

    ThemeToggler.querySelector('.theme-toggler__button--light').classList.toggle('theme-toggler__button--active')
    ThemeToggler.querySelector('.theme-toggler__button--dark').classList.toggle('theme-toggler__button--active')
})




//showing employee profile and name

async function getUserInfo() {
    try {
        let res = await fetch(`/self/get-user`);
    
        let {user_data} = await res.json();
        

        document.querySelector('.user-name').innerHTML = user_data.full_name;
        document.querySelector('.text-muted').innerHTML = user_data.designation;
        if(!(user_data.profile_pic=="undefined")){
          document.querySelector('.profile__photo').setAttribute('src',`/upload_compressed/${user_data.profile_pic}`)
      }
        
    
    } catch (err) {
        console.log(err);
    
    }
}

getUserInfo();

var container = document.getElementById("logs-container");
async function gettingLogData(){
  let res = await fetch(`/self/logs`);
  let data = await res.json();
  let logs = data["logs"];
  if(data){
      container.innerHTML = ``;
      logs.forEach(log => {
          fillingLogs(log)
      });
  }
}
gettingLogData();

renew.addEventListener("click", (e) => {
  gettingLogData();
  console.log("Getting called");
})


let search = document.getElementById("search");

  async function debounceFuncForLogs(value){
    let res = await fetch(`/self/get-log-search/${value}`);
    let data = await res.json();
    let logs = data["ans"];
    container.innerHTML = ``;
    logs.forEach(log => {
      fillingLogs(log);
    })
  }

  let timer;
  search.addEventListener("keyup", async(e) => {
  container.innerHTML = `Loading...`;
  if(e.target.value == ""){
    gettingLogData();
    return;
  }
  clearTimeout(timer);
  timer = setTimeout(() => debounceFuncForLogs(e.target.value.trim()), 2000);
    
})

function validate_comment() {
  var value=document.getElementById("text").value;
  if (value == "") {
    document.getElementById("submit").disabled = true;
    document.getElementById("submit").classList.add("disabling");
    return false;
  }
  
  else {  
    document.getElementById("submit").disabled = false;
    document.getElementById("submit").classList.remove("disabling");
      return true;
  }

}

async function addcomment() {
  let comment = document.getElementById("text").value;
  const res = await fetch(`/activity/add-comment`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          data: comment
      })
  });

  const data = await res.json();
  if(data){
    document.getElementById("text").value = "";
    let commentWrapper = document.getElementById("comment-wrapper");
    let newDiv = document.createElement("div");
    newDiv.classList.add("see-comment");

    let p = document.createElement("p");
    p.innerText = data["comment"]["data"];

    newDiv.appendChild(p);

    commentWrapper.appendChild(newDiv);
    // newDiv.innerText = 
    // commentWrapper.innerHTML += ` <div class="see-comment" id="see-comment">
    // <p>${data["comment"]["data"]}</p>
    // </div>`
  swal("Comment has been added, we'll get back to you shortly.")
  }
}


function fillingLogs(log){
  if(log.activity == "Checked In"){
    container.innerHTML += `<div class="activity-log">
    <div class="card-title-small">${log.full_name}</div>
    <div class="checkin-text activity-log-text">Checked In</div>
    <div class="log-time">${convertUTCTime(log.time)}</div>
</div>`}
else if(log.activity == "Checked Out"){
    container.innerHTML += `<div class="activity-log">
    <div class="card-title-small">${log.full_name}</div>
    <div class="checkout-text activity-log-text">Checked Out</div>
    <div class="log-time">${convertUTCTime(log.time)}</div>
</div>`}
else if(log.activity == "Breaked Out"){
    container.innerHTML += `<div class="activity-log">
    <div class="card-title-small">${log.full_name}</div>
    <div class="breakout-text activity-log-text">Breaked Out</div>
    <div class="log-time">${convertUTCTime(log.time)}</div>
</div>`
}
else if(log.activity == "Breaked In"){
    container.innerHTML += `<div class="activity-log">
    <div class="card-title-small">${log.full_name}</div>
    <div class="breakin-text activity-log-text">Breaked In</div>
    <div class="log-time">${convertUTCTime(log.time)}</div>
</div>`
}
}

gettingLogData();


document.querySelectorAll(".span-time").forEach(time => {
  console.log(time.innerText);
  let userTime = convertUTCTime(time.innerText);
  time.innerHTML = userTime
})

function convertUTCTime(time){
  let userTime = moment.utc(time, "hh:mm:ss").local().format("hh:mm:ss A");
  return userTime;
}

function changeTheme(preference) {
            
  if(preference == "dark"){
      localStorage.setItem("theme", "dark")
  }else{
      localStorage.setItem("theme", "light")
  }
}
if(!localStorage.getItem("theme")){
  localStorage.setItem("theme", "light")
}else{
  const ThemeToggler = document.querySelector(".theme-toggler");
  if(localStorage.getItem("theme") == "dark"){
      console.log("coming in dark");
      document.body.classList.add('dark-theme-variables')
      ThemeToggler.querySelector('.theme-toggler__button--dark').classList.add('theme-toggler__button--active')
      ThemeToggler.querySelector('.theme-toggler__button--light').classList.remove('theme-toggler__button--active')
  }else if(localStorage.getItem("theme") == "light"){
      console.log("coming in light");
      document.body.classList.remove('dark-theme-variables')
      ThemeToggler.querySelector('.theme-toggler__button--dark').classList.remove('theme-toggler__button--active')
      ThemeToggler.querySelector('.theme-toggler__button--light').classList.add('theme-toggler__button--active')
  }
}


if(document.getElementById("contact-admin")){

document.getElementById("contact-admin").addEventListener("click", () => {
  $('.ui.modal').modal('show');
})

document.querySelector(".deny").addEventListener("click", () => {
  $('.ui.modal').modal('hide');
})
}


document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  swal("This site is protected.")
})

document.addEventListener("keydown", (e) => {

  if (e.ctrlKey && e.shiftKey && e.keyCode == 67) {
    e.preventDefault();
  }
 
  if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
     e.preventDefault();
  }

  if(e.key == "F12"){
    e.preventDefault();
  }
 
})

document.getElementById("forget-form").addEventListener("submit", async(e) => {
  e.preventDefault();

  let checkOutTime = document.getElementById("checkout-time").value;
  let checkInTime = document.getElementById("checkin-time").value;


  const res = await fetch(`/self/add-forgot`, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        checkInTime, checkOutTime
    })
  });
  let data = await res.json();
  if(data.ans == "success"){
    swal({
      title: "Request has been sent!",
      text: `${data.msg}, Dont worry about today's time. We will update it.`,
      button: "Okay, Thanks!",
    }).then(function() {
      $('.ui.modal').modal('hide');
    });
  }else if(data.ans == "error"){
    swal(data.msg)  
  }
})

