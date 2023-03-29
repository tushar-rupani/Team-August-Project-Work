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
}

getUserInfo();

