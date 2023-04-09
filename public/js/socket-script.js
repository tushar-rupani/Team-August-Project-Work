const Toast2 = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });
  

const socket = io();
socket.on("chat", (data) => {
    // Trigger a pop-up notification when a new message is received
    const {message, userName} = data;
    // window.alert("New message: " + message + userName );
  
    Toast2.fire({
      icon: 'info', // Set the icon to null
      title: `${userName}`, // Set the title of the toast notification
      text: `${message.substr(0, 20)}...` // Set the text of the toast notification
    });
  
    Notification.requestPermission().then((permission) => {
      console.log(permission);
      if(permission == "granted"){
        var title = `${userName}`;
        var text = `${message.substr(0, 25)}...`;
        var notification = new Notification(title, {
          body: text,
          icon: '../assets/favicon.ico'
        })
  
        notification.addEventListener("click", () => {
        //   console.log("Hey");
        // We can add an event listener on notification as well.
        })
      }
    }).catch((err) => {
      console.log(`Notification failed to fetch`);
    })
  });
  