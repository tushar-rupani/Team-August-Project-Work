const $ = (selector) => {
    return document.querySelector(selector);
}
var submitBtn = $("#signin-btn");
var password = $("#pass");
var success, repass_success;

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
let repassword = $("#pass2");
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

function activateSubmitButton() {
    if (success && repass_success) {
        // submitBtn.disabled = false;  
        activateButton();
    } else {
        disableButton();
        // submitBtn.disabled = true;
    }
}


function activateButton() {
    submitBtn.disabled = false;
    submitBtn.style.opacity = 1;
    submitBtn.addEventListener("mouseenter", (e) => {
        e.target.style.cursor = "pointer"
    })
}

function disableButton() {
    submitBtn.disabled = true;
    submitBtn.style.opacity = 0.5;
    submitBtn.addEventListener("mouseenter", (e) => {
        e.target.style.cursor = "not-allowed"
    })
}

// Fetch in post.

let form = $("#form");

form.addEventListener("submit", async(e) => {
    e.preventDefault();
    let pass = password.value
    console.log(pass);
    let res = await fetch(`/update-password`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            pass
        })
    })

    let data = await res.json();
    if(data.ans == "error"){
        Toast2.fire({
            icon: 'warning',
            title: `${data.msg}`
        })
    }else if(data.ans == "success"){
        swal({
            title: "Password has been changed",
            text: "We have changed your password.",
            button: "Okay, Login",
          }).then(function() {
           location.assign("/");
          });
    }
})