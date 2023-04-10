//showing employee profile and name

async function getUserInfo() {
    try {
        let res = await fetch(`/self/get-user`);

        let { user_data } = await res.json();

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