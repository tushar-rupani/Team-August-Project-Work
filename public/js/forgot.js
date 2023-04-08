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
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
newform.addEventListener("submit", async(e) => {
    e.preventDefault()
    let email = document.getElementById("f-email").value;

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
    console.log(data);
    if(data.ans == "error"){
        Toast2.fire({
            icon: 'warning',
            title: `${data.msg}`
        })
    }else if(data.ans == "success"){
        Toast2.fire({
            icon: 'success',
            title: `${data.msg}`
        })
    }

})