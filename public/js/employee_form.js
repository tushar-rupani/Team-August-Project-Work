
let uploadBtn = document.getElementById("upload-button");
let chosenImg = document.getElementById("chosen-image");
let uploadImg = document.getElementById("upload-image");
var removeImg = document.getElementById('remove-image');


uploadBtn.onchange = () => {
    let reader = new FileReader();
    reader.readAsDataURL(uploadBtn.files[0]);
    reader.onload = () => {
        chosenImg.setAttribute("src", reader.result);

    }
}

uploadImg.onclick = () => {
    removeImg.style.display = "block";
    uploadImg.style.display = "none";

}


if (uploadImg.id == "remove_image") {
    console.log('green');
    uploadImg.style.backgroundColor = "green";
}

removeImg.onclick = () => {

    removeImg.style.display = "none";
    uploadImg.style.display = "block"

    uploadImg.style.backgroundColor = "#002f4b";
    uploadImg.innerHTML = 'Upload Image';
    chosenImg.setAttribute("src", "https://hrms.appdemoserver.com/assets/img/avatars/profile_image.jpg ");


}


function uploadImage() {
    console.log("upload");
    fetch(`http://127.0.0.1:3000/employee-data/upload`);
}






// ------------------validation---------------------
var name = document.getElementById("fullname").value;

var dob = document.getElementById("dob").value;
var nameErr = document.getElementById("name_msg");
var emailErr = document.getElementById("email_msg");
var dobErr = document.getElementById("dobErr");


function require_validate(element, valid) {
    var data = element.value;


    if (data == "") {
        document.getElementById(valid).innerHTML = "Kindly add the information";
        return false;
    }
}



function validateFullName() {
    var name = document.getElementById("fullname").value;
    // const fullName = name.split(" ");
    // let isValid = false;
    // var regex = /^[a-zA-Z\s]*$/;



    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (!regName.test(name)) {
        nameErr.innerHTML = "please enter valid full name"
        document.getElementById("basicnextBtn").disabled = true;
        name.focus();
        return false;
    }



    else {

        nameErr.innerHTML = "";

        return true;

    }

}


function validateEmail() {
    var email = document.getElementById('email').value;
    var email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email_regex.test(email)) {
        emailErr.innerHTML = "invalid email";
        document.getElementById("basicnextBtn").disabled = true;

        return false;
    }

    else {

        emailErr.innerHTML = "";

        return true;
    }



}




document.querySelector('form').addEventListener('submit', function (e) {
    if (!validateFullName()) {
        e.preventDefault();
    }
});
