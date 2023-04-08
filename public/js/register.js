let form = document.getElementById("my-form");
// form.addEventListener("submit", (e) => {
//     e.preventDefault();
// })

const loginFrom = document.querySelector('#login-form');
let emailExists;

let submitBtn = document.getElementById("submit-btn");
function disableButton() {
    submitBtn.disabled = true;
    submitBtn.style.opacity = 0.5;
    submitBtn.addEventListener("mouseenter", (e) => {
        e.target.style.cursor = "not-allowed"
    })
}

function activateButton() {
    submitBtn.disabled = false;
    submitBtn.style.opacity = 1;
    submitBtn.addEventListener("mouseenter", (e) => {
        e.target.style.cursor = "pointer"
    })
}
disableButton();

let success = false;
let repass_success = false;
let email_success = false;


let password = document.getElementById("password");
let errorSpan, pval, passwordValidationRegex, isPasswordCorrect;
password.addEventListener("keyup", (e) => {
    errorSpan = document.getElementById("perror");
    pval = e.target.value;
    passwordValidationRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/
    isPasswordCorrect = passwordValidationRegex.test(pval);

    if (isPasswordCorrect) {
        globalPassword = e.target.value
        success = true;
        errorSpan.innerText = "";
        errorSpan.classList.add("hidden")
        activateSubmitButton();
    } else {
        errorSpan.style.color = "red"
        errorSpan.innerText = `Password must contain One Capital Letter, One Special Character and Should have a length of more than 8 digits`;
        errorSpan.classList.remove("hidden")
        success = false
        activateSubmitButton();
    }

})
let repassword = document.getElementById("repassword");
repassword.addEventListener("keyup", (e) => {
    let errorSpan = document.getElementById("reerror");
    let pval = e.target.value;
    if (pval != globalPassword) {
        errorSpan.style.color = "red"
        errorSpan.innerText = `The password you entered earlier and this does not match`
        errorSpan.classList.remove("hidden")
        repass_success = false
        activateSubmitButton();
    }
    else if (pval == globalPassword) {
        errorSpan.innerText = ""
        errorSpan.classList.add("hidden")
        repass_success = true
        activateSubmitButton();
    }

})


async function checkIfExistsEmail(e, event) {
    let userEntered = e.value;

    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Regular expression pattern for email validation

    let isValidEmail = emailRegex.test(userEntered); // Test if the userEntered value matches the emailRegex pattern
    console.log();
    if (isValidEmail) {
        email_success = true;
        document.getElementById("correct").innerHTML = ""
        activateSubmitButton();
    } else {
        email_success = false;
        document.getElementById("correct").innerHTML = "This is not a valid email"
        activateSubmitButton();
    }

    let ans = await fetch("/check-user-email", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: userEntered
        })
    })
    let data = await ans.json();
    if (data["status"] == "not" && userEntered != "") {
        document.getElementById("email_unavailable").classList.add("hidden")
        emailExists = true;
        activateSubmitButton();
    } else if (data["status"] == "exist" && userEntered != "") {
        document.getElementById("email_available").classList.add("hidden")
        document.getElementById("email_unavailable").classList.remove("hidden")
        emailExists = false;
        activateSubmitButton();
    } else {
        emailExists = false;
        document.getElementById("email_available").classList.add("hidden")
        document.getElementById("email_unavailable").classList.add("hidden")
        activateSubmitButton();
    }
}

function activateSubmitButton() {
    if (success && emailExists && repass_success && email_success) {
        // submitBtn.disabled = false;  
        activateButton();
    } else {
        disableButton();
        // submitBtn.disabled = true;
    }
}


loginFrom.addEventListener('submit', async function (e) {
    e.preventDefault();
    const Toast2 = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    let email = document.querySelector('#lg-email').value;
    let password = document.querySelector('#lg-password').value;
    let ip_field = document.querySelector("#user-ip");
    if(ip_field == null){
        Toast2.fire({
            icon: 'warning',
            title: `Wait for a minute. We are trying to get your IP.`
        })
    }
    let ip = document.querySelector("#user-ip").value;
    console.log(ip_field);
   

    try {
        const response = await fetch(`/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({ email, password, ip })
        });

        let res = await response.json();

        if (res.ans == "error") {
            Toast2.fire({
                icon: 'warning',
                title: `${res.msg}`
            })
        }
        if (res.msg == "redirected") {
            location.assign(`/${res.ans}`);
        }
        if (res.msg == "success") {
            location.assign(`/self/home`);
        }



    } catch (err) {
        console.log(err);
    }

});
async function getIP() {
    let ipDetails = await fetch("https://api.ipify.org/?format=json")
    let resp = await ipDetails.json();
    console.log(resp);
    let userIp = resp.ip;
    document.getElementById("ip").innerHTML = `
    <input type="hidden" value="${userIp}" name="userIP" id="user-ip"/>
    `
}

getIP();
