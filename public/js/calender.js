var current_date = new Date(); 

function renderCalender() {
    
                current_date.setDate(1);
                var month_start = current_date.getDay();
                // console.log(month_start);
                var month_name = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
                let month = month_name[current_date.getMonth()];
                let year = current_date.getFullYear();
                let month_end = new Date(
                    current_date.getFullYear(),
                    current_date.getMonth() +1,
                    0
                ).getDate();

                document.getElementById("month").innerHTML = month + " " + year;

                var cells = "";
                for(let i=month_start;i>0;i--) {
                    cells += `<div class="day-two">` + " " + `</div>`
                };

                for (let i=1;i<=month_end;i++) {
                    cells += `<div class="day-two" id=""weekend>` + i + `</div>`    
                }
                document.getElementsByClassName("day")[0].innerHTML = cells;
}

function moveDate(para) {
   
    if(para == "prev") {
        current_date.setMonth(current_date.getMonth() - 1);
    }
    else {
        current_date.setMonth(current_date.getMonth() + 1);
    }
    renderCalender();

}