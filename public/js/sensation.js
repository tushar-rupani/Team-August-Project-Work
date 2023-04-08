const socket = io();

const form = document.getElementById('send-button');
const inputMessage = document.getElementById('input-message');
const messages = document.getElementById('messages');
var userName, profile_pic;

async function getUserName() {
    let res = await fetch("/sensation/name-of-user");
    let data = await res.json();
    userName = data["fireUser"][0].full_name;
    profile_pic = data["fireUser"][0].profile_pic;
} 
getUserName();
form.addEventListener('click', async(e) => {
    e.preventDefault();
    const message = inputMessage.value;
    inputMessage.value = '';
    socket.emit('chat', message);
    const ans = await fetch(`/sensation`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
             message
        })
        
    })
});

socket.on("chat", async(message) => {
    const div = document.createElement("div");

    const p = document.createElement("p");
    p.innerText = userName;

    const li = document.createElement('li');
    li.textContent = message;

    const span = document.createElement("span");
    span.classList.add("span-time");
    span.innerText = new Date().toLocaleTimeString();

    const img = document.createElement('img');
    img.src = `../upload_compressed/${profile_pic}`;

    div.appendChild(p);
    div.appendChild(li);
    div.appendChild(span);
    div.appendChild(img);
    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;
    console.log(messages.scrollTop);
    
})

document.querySelectorAll(".span-time").forEach(time => {
    console.log(time.innerText);
    let userTime = convertUTCTime(time.innerText);
    time.innerHTML = userTime
  })
  
  function convertUTCTime(time){
    console.log("i am executing");
    console.log(time);
    let userTime = moment.utc(time, "YYYY-MM-DD hh:mm:ss").local().format("YYYY-MM-DD hh:mm:ss A");
    console.log(userTime);
    return userTime;
  }
  