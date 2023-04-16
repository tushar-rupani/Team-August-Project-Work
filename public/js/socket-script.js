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
    const {message, userName} = data;
<<<<<<< HEAD
    
=======
    console.log(message, userName);
>>>>>>> babb9e362e7a045e9ecc268baa34bb5636799915
    let notificationSoundUrl = `../assets/notification-sound.mp3`;
    Toast2.fire({
      icon: 'info',
      title: `${userName}`, 
      html: `<audio src="${notificationSoundUrl}" autoplay></audio>`,
      text: `${message.substr(0, 20)}...`

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
  