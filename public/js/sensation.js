const socket = io();

const form = document.getElementById('send-button');
const inputMessage = document.getElementById('input-message');
const messages = document.getElementById('messages');

var userName, profile_pic;

form.addEventListener('click', async (e) => {
    e.preventDefault();
    const message = inputMessage.value;
    inputMessage.value = '';
    let input = document.querySelector('input[type="file"]');


    var formItems = new FormData();
    formItems.append('file', input.files[0]);
    formItems.append('message', message);


    let res = await fetch("/sensation/name-of-user");
    let data = await res.json();
    userName = data["fireUser"][0].full_name;
    profile_pic = data["fireUser"][0].profile_pic;

    console.log(formItems);
    const ans = await fetch(`/sensation`, {
        method: "POST",
        body: formItems
    })
    const fetchData = await ans.json();
    let postImage = fetchData[0].image; 
    socket.emit('chat', { userName, message, profile_pic, postImage });
    document.getElementById("selectedFile").value = "";

});

socket.on("chat", async (data) => {
    const { message, userName, profile_pic, postImage } = data

    document.querySelector(".card").innerHTML += `
    <div class="message">
            <div class="message-header">
                <div class="msg-img">
                    <img src="../upload_compressed/${profile_pic}" alt="">
                </div>
                <div class="msg-owner">
                    ${userName}
                </div>
            </div>
            <div class="msg-content">${message}</div>
            `;
    if(postImage){
        document.querySelector('.card').innerHTML += `<div class="image-wrapper">
        <img src="/upload_uncompressed/${postImage}" alt="">
    </div>`
    }else{
        document.querySelector(".card").innerHTML += "</div>"
    }
    document.querySelector('.card').innerHTML += `<div class="msg-time">${new Date().toLocaleDateString()}</div></div>`


window.scrollTo(0, document.body.scrollHeight);


})

document.querySelectorAll(".span-time").forEach(time => {
    let userTime = convertUTCTime(time.innerText);
    time.innerHTML = userTime
})

function convertUTCTime(time) {
    let userTime = moment.utc(time, "YYYY-MM-DD hh:mm:ss").local().format("YYYY-MM-DD hh:mm:ss A");
    return userTime;
}


async function getUserInfo() {
    try {
        let res = await fetch(`/self/get-user`);

        let { user_data } = await res.json();
        document.querySelector('.user-name').innerHTML = user_data.full_name;
        document.querySelector('.text-muted').innerHTML = user_data.designation;
        if (!(user_data.profile_pic == "undefined")) {
            document.querySelector('.profile__photo').setAttribute('src', `/upload_compressed/${user_data.profile_pic}`)
        }


    } catch (err) {
        console.log(err);

    }
}

getUserInfo();
window.scrollTo(0, document.body.scrollHeight);