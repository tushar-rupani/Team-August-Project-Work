let form = document.getElementById("my-form");
// form.addEventListener("submit", (e) => {
//     e.preventDefault();
// })


let submitBtn = document.getElementById("submit-btn");
function disableButton(){
    submitBtn.disabled = true;
    submitBtn.style.opacity = 0.5;
    submitBtn.addEventListener("mouseenter", (e) => {
        e.target.style.cursor = "not-allowed"
    })
}

function activateButton(){
    submitBtn.disabled = false;
    submitBtn.style.opacity = 1;
    submitBtn.addEventListener("mouseenter", (e) => {
        e.target.style.cursor = "pointer"
    })
}
disableButton();

let success = false;
let repass_success = false;


let password = document.getElementById("password");
let errorSpan, pval, passwordValidationRegex, isPasswordCorrect;
password.addEventListener("keyup", (e) => {
     errorSpan = document.getElementById("perror");
     pval = e.target.value;
     passwordValidationRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/
     isPasswordCorrect = passwordValidationRegex.test(pval);

    if(isPasswordCorrect){
        globalPassword = e.target.value
        success = true;
        errorSpan.innerText = "";
        errorSpan.classList.add("hidden")
        activateSubmitButton();
    }else{
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
    let ans = await fetch("http://localhost:3000/check-user-email", {
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

function activateSubmitButton(){
    if(success && emailExists && repass_success){
        // submitBtn.disabled = false;  
        activateButton();      
    }else{
        disableButton();
        // submitBtn.disabled = true;
    }
}




