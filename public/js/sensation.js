const socket = io();

const form = document.getElementById('send-button');
const inputMessage = document.getElementById('input-message');
const messages = document.getElementById('messages');
var userName, profile_pic;

form.addEventListener('click', async (e) => {
    e.preventDefault();
    const message = inputMessage.value;
    inputMessage.value = '';

    let res = await fetch("/sensation/name-of-user");
    let data = await res.json();
    userName = data["fireUser"][0].full_name;
    profile_pic = data["fireUser"][0].profile_pic;

    socket.emit('chat', { userName, message, profile_pic });
    const ans = await fetch(`/sensation`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message
        })
    })
});

socket.on("chat", async (data) => {
    const { message, userName, profile_pic } = data
    // console.log(message);

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
            <div class="msg-time">${new Date().toLocaleDateString()}</div>
    </div>
    `;
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