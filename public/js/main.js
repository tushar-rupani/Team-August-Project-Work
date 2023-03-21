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


const time = new Date().toLocaleTimeString();
timeLabel.innerHTML = time;

setInterval(() => {
    const time = new Date().toLocaleTimeString();
    timeLabel.innerHTML = time;
}, 1000);


checkOut.addEventListener("click", async(e) => {
    let ans = await fetch("http://localhost:3000/activity/check-out");
    let data = await ans.json();

    if (data["status"] == "DONE") {
        let checkInSpan = document.getElementById("backlog");
        checkInSpan.innerHTML += ` <div class="check_out">
        <span>Checked Out : ${data["checkOutTime"]}</span>
    </div> `
    } 

})


checkIn.addEventListener("click", async (e) => {
    let ans = await fetch("http://localhost:3000/activity/check-in");
    let data = await ans.json();

    if (data["status"] == "DONE") {
        let checkInSpan = document.getElementById("backlog");
        checkInSpan.innerHTML = ` <div class="check_in" id="check-in-span">
        <span>Checked In : ${data["checkInTime"]}</span>
    </div> `
    }
})

breakIn.addEventListener("click", async(e) => {
    let ans = await fetch("http://localhost:3000/activity/break-in");
    let data = await ans.json();
    if(data["status"] == "DONE"){
        let checkInSpan = document.getElementById("backlog");
        checkInSpan.innerHTML += ` <div class="break_in">
        <span>Breaked In : ${data["breakInTime"]}</span>
    </div>`
    }
})

breakOut.addEventListener("click", async(e) => {
    let ans = await fetch("http://localhost:3000/activity/break-out");
    let data = await ans.json();
})

dateLabel.innerHTML = date;
/**
 * Show sidebar
 */
MenuBtn.addEventListener('click', () => {
    SideMenu.style.display = 'block'
})

/**
 * Close sidebar
 */
CloseBtn.addEventListener('click', () => {
    SideMenu.style.display = 'none'
})


/*const dropdownTrigger = document.querySelector('#dropdown-trigger');
const dropdownMenu = document.querySelector('#dropdown-menu');

dropdownTrigger.addEventListener('click', () => {
    console.log("test");
  dropdownMenu.classList.toggle('show');
});*/

function preventBack() { window.history.forward(); }
setTimeout("preventBack()", 0);
window.onunload = function () { null };


ThemeToggler.addEventListener("click", () => {
    document.body.classList.toggle('dark-theme-variables')

    ThemeToggler.querySelector('.theme-toggler__button--light').classList.toggle('theme-toggler__button--active')
    ThemeToggler.querySelector('.theme-toggler__button--dark').classList.toggle('theme-toggler__button--active')
})
