//back-end logic for the pingpong portion
//this is where the flow starts and get's pulled into the front end

//this is the constructor
function Calculator(skinName) {
  this.skin = skinName;
}

//this is the method
Calculator.prototype.pingPong = function(goal) {
  var output = [];
  for (var i = 1; i <= goal; i++) {
    if (i % 15 === 0) {
      output.push("ping-pong");
    } else if (i % 3 === 0) {
      output.push("ping");
    } else if (i % 5 === 0) {
      output.push("pong");
    } else  {
      output.push(i);
    }
  }
  return output;
};

//the exports function activates the node: exports is provided by Node and lets us export things from one file and bring them into another. Technically, our constructor function and our pingPong method have now become part of a module. A module is a group of JavaScript functions and data that comprises some sort of functionality.
exports.calculatorModule = Calculator;
