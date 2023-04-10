let newform = document.getElementById("form");
let textField = document.getElementById("f-email");
let btn = document.getElementById("signin-btn");
textField.addEventListener("keyup", (e) => {
    let value = e.target.value;
    if(!value.length){
        btn.disabled = true;
        btn.classList.add("disabling")
    }else{
        btn.disabled = false;
        btn.classList.remove("disabling")
    }
})
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
newform.addEventListener("submit", async(e) => {
    e.preventDefault()
    let email = document.getElementById("f-email").value;
    btn.innerText = "Please wait..."
    btn.disabled = true;
    btn.classList.add("disabling");
    let ans = await fetch(`/forgot-pass`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            email
        })
    })

    let data = await ans.json();
    if(data.ans == "error"){
        btn.disabled = false;
        btn.innerText = "Process"
        btn.classList.remove("disabling");
        Toast2.fire({
            icon: 'warning',
            title: `${data.msg}`
        })
    }else if(data.ans == "success"){
        btn.innerText = "Check your email"
        Toast2.fire({
            icon: 'success',
            title: `${data.msg}`
        })
    }

})