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


document.getElementById('date').valueAsDate = new Date();

async function getData(e){
    let startDate = e.value;
    let endDate = document.getElementById("date").value;
    const resp = await fetch(`/self/filter-data/${startDate}/${endDate}`);
    const data = await resp.json();
    console.log(data);

    if(data){
        document.querySelector("#table").innerHTML = `<table class="tab">
                        <tr>
                            <div class="column">
                                <div class="col">
                                    <h4>Date</h4>
                                </div>
                                <div class="col">
                                    <h4>Entry-Time</h4>
                                </div>
                                <div class="col">
                                    <h4>Exit-Time</h4>
                                </div>
                                <div class="col">
                                    <h4>Break-time</h4>
                                </div>
                               
                                <div class="col">
                                    <h4>Working-hours</h4>
                                </div>
                        </tr>`;
        data["data"].forEach(element => {
            document.querySelector("#table").innerHTML += `
            <tr>
                            <div class="column2">
                                <div class="col">
                                    <p> ${element.date.substr(0,10)} </p>
                                </div>
                                <div class="col">
                                    <p> ${element.check_in} </p>
                                </div>
                                <div class="col">
                                    <p>${element.check_out}</p>
                                   
                                </div>
                                <div class="col">
                                    <p>${element.break_taken}</p>
                                </div>
                                
                                <div class="col">
                                    <p>${element.hours_worked}</p>
                                </div>
                            </div>
                        </tr>
            `; 
        });
    }
}


getUserInfo();

