
async function addleaves() {
    let showcase = document.getElementsByClassName("show")[0];
    //console.log(showcase);
      showcase.style.display = "none";

    let date = document.getElementById("date").value;
    let type = document.getElementById("type").value;
    let reason = document.getElementById("reason").value;
    let day = document.getElementById("day").value;

    const ans = await fetch(`/leaves/addleaves`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
             date,type,reason,day
        })
        
    })
    
    const data = await ans.json();
   if(data){
    swal("Your leave has been added, we will let you know shortly.");
    location.reload();
   }
    
}

function cancelleaves() {
  document.querySelector(".show").classList.add("hidden")
}

async function getData(e){
  let valueToSearch = e.value;
  const resp = await fetch(`/leaves/leave-status/${valueToSearch}`);
  const data = await resp.json();
  let tab = document.querySelector(".tab");
  document.querySelector('.showdata').innerHTML= `
                  <table class="tab">
                            <tr>
                                <div class="column-entry">
                                    <div class="coll">
                                        <h4>Leave Type</h4>
                                    </div>
                                    <div class="coll">
                                        <h4>Date</h4>
                                    </div>
                                    <div class="coll">
                                        <h4>Half Day</h4>
                                    </div>
                                    <div class="coll">
                                        <h4>Reason</h4>
                                    </div>
                                    <div class="coll">
                                        <h4>Status</h4>
                                    </div>
                                </div>
                            </tr>`;

    data["data"].forEach(element => {
      document.querySelector('.showdata').innerHTML += `
      <tr class="row">
                                    <div class="column2">
                                        <div class="col">
                                            <p>
                                              ${element.leave_type}
                                            </p>
                                        </div>
                                        <div class="col">
                                            <p>
                                            ${element.leave_date.substr(0, 10)} 
                                            </p>
                                        </div>
                                        <div class="col">
                                          <p>
                                          ${element.half_day}
                                          </p>
                                        </div>
                                        <div class="col">
                                            <p>
                                                ${element.leave_reason.substr(0,20)}...
                                            </p>
                                        </div>
                                        <div class="col">
                                            <p>
                                            ${element.leave_status}
                                            </p>
                                        </div>

                                    </div>
                                </tr>
      
      `
    });
  
  
  
} 

//showing employee profile and name

async function getUserInfo() {
    try {
        let res = await fetch(`/self/get-user`);
    
        let {user_data} = await res.json();
    
        

        document.querySelector('.user-name').innerHTML = user_data.full_name;
        document.querySelector('.text-muted').innerHTML = user_data.designation;
        if(!(user_data.profile_pic=="undefined")){
            document.querySelector('.profile__photo').setAttribute('src',`/upload_compressed/${user_data.profile_pic}`)
        }
        
    
    } catch (err) {
        console.log(err);
    
    }
}

getUserInfo();
