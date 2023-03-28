var $x = jQuery.noConflict();
//    alert("Versionx: "+$x.fn.jquery);
$x('.btnNext').click(function () {
    $x('.nav-pills .active').parent().next('li').find('a').trigger('click');
});

$x('.btnPrevious').click(function () {
    $x('.nav-pills .active').parent().prev('li').find('a').trigger('click');
});





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
    fetch(`http://127.0.0.1:3000/employee-data/upload`);
}






// ------------------validation---------------------
var name = document.getElementById("fullname").value;
var nameErr = document.getElementById("nameErr");

// validateFullName = (name) => {
//     const fullName = name.split(" ");
//     let isValid = false;

//     fullName.length <=2 ? (
//         isValid = validator.isAlpha(fullName[0]) && validator.isLength(fullName[0],{min:3,max:30}),
//         fullName[1] ? isValid = validator.isAlpha(fullName[1]) : ''
//     ) : '';

//     return isValid;
// }





function validateFullName() {
    var name = document.getElementById("fullname").value;
    const fullName = name.split(" ");
    let isValid = false;
    var regex = /^[a-zA-Z\s]*$/;
    var pattern = /^(?:((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-.\s])){1,}(['’,\-\.]){0,1}){2,}(([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-. ]))*(([ ]+){0,1}(((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){1,})(['’\-,\.]){0,1}){2,}((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){2,})?)*)$/;
    if (!regex.test(name)) {
        nameErr.innerHTML = "name should not contain numbers"
        return false;
    }
    else if (name == " ") {
        nameErr.innerHTML = "name is required"
        return false;
    }

    else if (!pattern.test(name)) {
        nameErr.innerHTML = "please enter your full name";
        return false;
    }
    else if (name.maxLength >= 40) {
        nameErr.innerHTML = "name should contain upto 40 chars";
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
        return false;
    } else {
        emailErr.innerHTML = "";
        return true;

    }

}

// function validateBasicInfo(){
//     if(!validateFullName() || !validateEmail()){
//         // document.getElementById(nextBtn).disabled = true;
//         return false;
//     }else{
//         // document.getElementById(nextBtn).disabled = false;
//         return true;

//     }
// }


var $y = jQuery.noConflict();
//    alert("Versiony: "+$y.fn.jquery);
$y(function () {
    var date = new Date();
    var currentMonth = date.getMonth();
    var currentDate = date.getDate();
    var currentYear = date.getFullYear();
    $y('#dob').datepicker({
        maxDate: new Date(currentYear, currentMonth, currentDate)
    });
});




async function sendData(data){

    let profile=document.querySelector('#upload-button').files[0];
    let aadhar=document.querySelector('#aadhar_doc').files[0];
    let pan=document.querySelector('#pan_doc').files[0];
    let cheque=document.querySelector('#cheque_doc').files[0];
    let resume=document.querySelector('#resume_doc').files[0];

    let myForm=new FormData();

    data=JSON.stringify(data);

    myForm.append("file",profile);
    myForm.append("file",aadhar);
    myForm.append("file",pan);
    myForm.append("file",cheque);
    myForm.append("file",resume);
    myForm.append("data",data);
    

    try {
        const response = await fetch(`/employee-form`, {
            method: 'POST',
            body:myForm
        });

        let res = await response.json();

        if(res.status==200){
            location.assign('/self/home')
        }else{
            alert(res.msg);
            
        }
        


    } catch (err) {
        console.log(err);

    }
}


document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    let data={};

    let basic_details={};

    basic_details.fullname=document.querySelector('#fullname').value;

    let raw_dob=document.querySelector('#dob').value;
    let dob=raw_dob.split('/');

    basic_details.dob=`${dob[2]}-${dob[0]}-${dob[1]}`;

    basic_details.email=document.querySelector('#email').value;
    basic_details.gender=document.querySelector('#gender').value;
    basic_details.m_status=document.querySelector('#m_status').value;
    if(document.querySelector('#wfh_yes').checked){
        basic_details.wfh=document.querySelector('#wfh_yes').value;
    }else{
        basic_details.wfh=document.querySelector('#wfh_no').value;
    }
    
    data.basic_details=basic_details;
    
    let contact_info={};

    contact_info.current_address=document.querySelector('#current_address').value;
    contact_info.permanent_address=document.querySelector('#permanent_address').value;
    contact_info.contact=document.querySelector('#contact').value;
    contact_info.emergency_contact=document.querySelector('#emergency_contact').value;
    contact_info.emergency_person=document.querySelector('#emergency_person').value;

    data.contact_info=contact_info;

    let document_info={};

    document_info.aadhar_number=document.querySelector('#aadhar_num').value;
    document_info.pan_num=document.querySelector('#pan_num').value;
    document_info.cheque_num=document.querySelector('#cheque_num').value;

    data.document_info=document_info;

    let social={};

    social.twitter=document.querySelector('#twitter').value;
    social.linkedin=document.querySelector('#linkedin').value;
    social.github=document.querySelector('#github').value;
    social.facebook=document.querySelector('#facebook').value;

    data.social=social;
    
    sendData(data);

    let submit_btn=document.querySelector('.update');

    submit_btn.classList.add('disabled-submit');
    submit_btn.disabled=true;

});

