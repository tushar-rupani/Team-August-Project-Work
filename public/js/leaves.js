async function addleaves() {
    let showcase = document.getElementsByClassName("show")[0];
    //console.log(showcase);
      showcase.style.display = "none";

    let date = document.getElementById("date").value;
    let type = document.getElementById("type").value;
    let reason = document.getElementById("reason").value;
    let day = document.getElementById("day").value;
    //console.log(date,type,reason);


    const ans = await fetch(`http://localhost:8000/leaves/addleaves`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
             date,type,reason,day
        })
        
    })
    
    .then(function(res) {
        return res.json()
    })
   
    
}

async function cancelleaves() {
    let showcase = document.getElementsByClassName("show")[0];
    //console.log(showcase);
    showcase.style.display = "none";
}