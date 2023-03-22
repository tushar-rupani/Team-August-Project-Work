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

dateLabel.innerHTML = date;

setInterval(() => {
    const time = new Date().toLocaleTimeString();
    timeLabel.innerHTML = time;
}, 1000);


checkOut.addEventListener("click", async (e) => {
    swal("Are you sure you want to Check Out?", {
        buttons: {
            cancel: "Cancel!",
            catch: {
                text: "Yes Do it!",
                value: "Yes",
            },
        },
    })
        .then((value) => {
            switch (value) {
                case "Yes":
                    checkOutData();
                    break;
            }
        });
})

checkIn.addEventListener("click", async (e) => {
    let ans = await fetch("http://localhost:3000/activity/check-in");
    let data = await ans.json();

    if (data["status"] == "DONE") {
        let checkInSpan = document.getElementById("backlog");
        checkInSpan.innerHTML = ` <div class="check_in" id="check-in-span">
        <span>Checked In : ${data["checkInTime"]}</span>
        </div> `
        checkIn.classList.add("disabling");
        checkIn.disabled = true;
    }
    else if (data["status"] == "ERROR") {
        swal(data.message)
    }

})

breakIn.addEventListener("click", async (e) => {
    swal("Are you sure you want to Break In?", {
        buttons: {
            cancel: "Cancel!",
            catch: {
                text: "Yes Do it!",
                value: "Yes",
            },
        },
    })
        .then((value) => {
            switch (value) {
                case "Yes":
                    breakInData();
                    break;
            }
        });
})

breakOut.addEventListener("click", async (e) => {

    swal("Are you sure you want to Break Out?", {
        buttons: {
            cancel: "Cancel!",
            catch: {
                text: "Yes Do it!",
                value: "Yes",
            },
        },
    })
        .then((value) => {
            switch (value) {
                case "Yes":
                    breakOutData();
                    break;
            }
        });

})

async function checkOutData() {
    let ans = await fetch("http://localhost:3000/activity/check-out");
    let data = await ans.json();

    if (data["status"] == "DONE") {
        let checkInSpan = document.getElementById("backlog");
        checkInSpan.innerHTML += ` <div class="check_out">
        <span>Checked Out : ${data["checkOutTime"]}</span>
    </div> `
    }
    else if (data["status"] == "ERROR") {
        swal(data.message)
    }
}
async function breakOutData() {
    let ans = await fetch("http://localhost:3000/activity/break-out");
    let data = await ans.json();
    if (data["status"] == "DONE") {
        let checkInSpan = document.getElementById("backlog");
        checkInSpan.innerHTML += ` <div class="break_out">
        <span>Breaked Out : ${data["breakOutTime"]}</span>
    </div>`;
        checkOut.classList.remove("disabling");
        checkOut.disabled = false;
        breakIn.classList.remove("disabling")
        breakIn.disabled = false;
        breakOut.classList.add("disabling")
        breakOut.disabled = true;
    }
    else if (data["status"] == "ERROR") {
        swal(data.message)
    }
}

async function breakInData() {
    let ans = await fetch("http://localhost:3000/activity/break-in");
    let data = await ans.json();
    if (data["status"] == "DONE") {
        let checkInSpan = document.getElementById("backlog");
        checkInSpan.innerHTML += ` <div class="break_in">
        <span>Breaked In : ${data["breakInTime"]}</span>
    </div>`
        addingClass();
    }
    else if (data["status"] == "ERROR") {
        swal(data.message)
    }
}



function addingClass() {
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




function preventBack() { window.history.forward(); }
setTimeout("preventBack()", 0);
window.onunload = function () { null };


ThemeToggler.addEventListener("click", () => {
    document.body.classList.toggle('dark-theme-variables')

    ThemeToggler.querySelector('.theme-toggler__button--light').classList.toggle('theme-toggler__button--active')
    ThemeToggler.querySelector('.theme-toggler__button--dark').classList.toggle('theme-toggler__button--active')
})

/*const dropdownTrigger = document.querySelector('#dropdown-trigger');
const dropdownMenu = document.querySelector('#dropdown-menu');

dropdownTrigger.addEventListener('click', () => {
    console.log("test");
  dropdownMenu.classList.toggle('show');
});*/

function addcomment() {

    let comment = document.getElementById("text").value;
    console.log("comment");


    const ans = fetch(`http://localhost:3000/comments`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: comment
        })

    })

        .then(function (res) {
            return res.json()
        })
    location.reload();
}
function validate_comment() {
    var value=document.getElementById("text").value;
    if (value == "") {
        document.getElementById("submit").disabled = false;
        return false;
    }


    else {
        document.getElementById("submit").disabled = false;
        return true;
    }

}