function createObject(){
    return {
        name: "tushar",
        pid: "MS21159"
    }
}
const obj = createObject();
// console.log(obj.constructor);

console.log(JSON.stringify(obj));

function Course(name){
    this.name = name;
    this.func = function() {
        console.log("This is a fucntion");
    }
}
const course = new Course("JS");
// console.log(course.constructor);


// ! Checking Prototype of Object.

Object.prototype.tushar = function() {
    console.log("Tushar Created this");
}

const testObj = new Object({
    name: "tushar",
    rno: "50"
})
testObj.__proto__.tusharMethod = function(){
    console.log("Tushar and Raj created this");
}

testObj.tusharMethod();

const testObj2 = new Object({
    n: "jayesh",
    r: "50"
})

const clone = structuredClone(testObj2)
console.log("This is clone", clone);
for(const data of Object.entries(testObj)){
    console.log(data[0] , data[1]);
}

console.log(Object.assign(testObj, testObj2))
console.log(testObj);
// testObj.tushar();


// ! One of the difference between Array Function and Traditional Function.
function data(){
    // console.log(arguments);
}

data(1,2,2)



// ! Clousers
function data1(){
    let a = 10;
    let b = 20;
    let c = 30;
    return function data2(){
        let b = 30;
    }
}


let ans = data1()();


// ! Currying

let multiply = function(x,y){
    console.log(x);
    console.log(x * y);
}


let multiplyByTwo = multiply.bind(this, 2);
multiplyByTwo(23)


let multiplyByThree = multiply.bind(this,3);
multiplyByThree(5);


// ! Currying with clousers

let clo_multiply = function(x){
    return function(y){
        console.log("Ans with Clousers", x * y);
    }
}

clo_multiply(2)(10);

