function addleave() {
    let data = "";
    data += `
    <div class="heading">
            <h3>Add leave</h3>
            </div>
            <div class="leavecontent">
                <div class="ldata">
                    <label for="ld">Leave Date
                </div>
                <div class="ldata">
                    <label for="lt">Leave Type
                </div>
                <div class="ldata">
                    <label for="hd">Half day
                </div>
            </div>
            <div class="leavecontent">
                <div class="ld">
                     <input type="date" id="date" name="date" placeholder="Leave Date">
                </div>
                <div class="lt">
                     <select name="type" id="type">
                        <option value="SL">Sick Leave</option>
                        <option value="CL">Casual Leave</option>
                        <option value="PL">Planned Leave</option>
                        <option value="UPL">Unplanned Leave</option>
                        </select>
                </div>
                <div class="hdin">  
                <select name="day" id="day">
                <option value="0">yes</option>
                <option value="1">no</option>
                
                </select> 
                </div>
            </div>
            <div class="reason">
                <label for="reason">Reason<br>
                <input type="textarea" id="reason" name="reason">
            </div>
            <div class="apply">
                <input type="button" onclick="cancelleaves()" class="applied" id="two" value="Cancel">
                <input type="button" onclick="addleaves()" class="applied" id="one" value="Apply">
                
            </div>`;

    let showleaves = document.createElement("div");
    showleaves.classList.add("show");
    showleaves.innerHTML = data;
    document.getElementById("leaves").appendChild(showleaves);
    $(function(){
        var dtToday = new Date();
     
        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if(month < 10)
            month = '0' + month.toString();
        if(day < 10)
            day = '0' + day.toString();
        
        var maxDate = year + '-' + month + '-' + day;
        
        $('#date').attr('min', maxDate);
    });
}

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

