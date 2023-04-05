function createObject(){
    return {
        name: "tushar",
        pid: "MS21159"
    }
}
const obj = createObject();
// console.log(obj.constructor);

function Course(name){
    this.name = name;
    this.func = function() {
        console.log("This is a fucntion");
    }
}
const course = new Course("JS");
// console.log(course.constructor);


