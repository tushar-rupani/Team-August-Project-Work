
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

// console.log(document.querySelectorAll(".btnNext"));

function require_validate(element, valid) {
    var data = element.value;

    if (data == "") {
        document.getElementById(valid).innerHTML = "Kindly add the information";
        document.querySelector(".btn").disabled=true;
        return false;
    }

    else{
        document.getElementById(valid).innerHTML = " ";
        document.querySelector(".btn").disabled=false;
        // console.log(document.querySelectorAll(".btnNext"));
        // return true;
        return true;
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

function num_validate(ele, id){
    console.log(id);
     var num =/^[0-9]*$/;
    var alphabet =/^[a-zA-Z]+$/
    var sp_char =/[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g;
    var contact = ele.value;
    console.log(contact);
    
    // console.log(contact);
    if(contact.length<10 || contact.match(sp_char) || contact.match(alphabet) || !contact.match(num)){
        document.getElementById(id).innerHTML ='please enter valid contact number';
        document.getElementById("contactnextbtn").disabled = true;
        return false;
    }
    else {
        document.getElementById(id).innerHTML ="";
        document.getElementById("contactnextbtn").disabled = false;
        return true;
    }
    
    
}
function person_validate(){
    // var num =/^[0-9]*$/;
    var alphabet =/^[a-zA-Z]+$/

    var person = document.getElementById("emergency_person").value;

    if(!person.match(alphabet) ){
        document.getElementById("emergency_person_msg").innerHTML ="Input data should be alphabet only!";
        document.getElementById("contactnextbtn").disabled = true;
        return false;
    }
    else{
        document.getElementById('emergency_person_msg').innerHTML ="";
        document.getElementById("contactnextbtn").disabled = false;
        return true;
    }

}

function aadhar_validate(){
     var num =/^[0-9]*$/;
    var alphabet =/^[a-zA-Z]+$/
    var sp_char =/[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g;

    var aadhar_num = document.getElementById("aadhar_num").value;
    if(aadhar_num.length <12 ||  aadhar_num.match(sp_char) || aadhar_num.match(alphabet) || !aadhar_num.match(num)){
        document.getElementById("aadhar_num_msg").innerHTML = "Please enter valid aadhar number";
        document.getElementById("docnextBtn").disabled = true;
        return false;
    }
    else{
        document.getElementById("aadhar_num_msg").innerHTML = "";
        document.getElementById("docnextBtn").disabled = false;
        return true;
    }
}

function pan_validate(){
    var regex = "[A-Z]{5}[0-9]{4}[A-Z]{1}";
    var pan_num =document.getElementById("pan_num").value;

   if(!pan_num.match(regex) || pan_num.length<10){
       document.getElementById("pan_msg").innerHTML = "Enter valid PAN Number";
       document.getElementById("docnextBtn").disabled = true;
       return false;
   }
   else{
       document.getElementById("pan_msg").innerHTML = "";
       document.getElementById("docnextBtn").disabled = false;
       return true;
   }
}

function cheque_validate(){
    var num =/^[0-9]*$/;
    // var alphabet =/^[a-zA-Z]+$/
    // var sp_char =/[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g;
    var cheque_num = document.getElementById("cheque_num").value;

    if(!cheque_num.match(num) ){
        document.getElementById("cheque_msg").innerHTML = "Please enter valid cheque number";
        document.getElementById("docnextBtn").disabled = true;
        return false;
    }
    else{
        document.getElementById("cheque_msg").innerHTML = "";
        document.getElementById("docnextBtn").disabled = false;
        return true;
    }
    
}



document.querySelector('form').addEventListener('submit', function (e) {
    if (!validateFullName()) {
        e.preventDefault();
    }
});
