Function.prototype.funcl = function (fn) {
  return () => {
    fn.apply(this, arguments)
    return this.apply(this, arguments)
  }
}

Function.prototype.func2 = function (fn) {
  return () => {
    var ret = this.apply(this, arguments)
    fn.apply(this, arguments)
    return ret
  }
}

let func = function () {
  console.log('A')
}.funcl(function () {
  console.log('B')
}).func2(function () {
  console.log('C')
})

// func()

var mystring = 'I am a student'
var a = mystring.substring(9, 13)
// console.log(a);

// var name = "global";
// if (true) {
//   var name = "local"
//   console.log(name)
// }
// console.log(name)


function sum(a, b) {
  return a + b;
}
// console.log(sum(1,"2"));

function testFunction() {
  return Promise.resolve(123)
}
