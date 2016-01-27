var vm = require('vm');
var util = require('util');

var solutionGood = "function nFib(n) { if ( n <= 1 ) { return n; } else { return nFib(n-1) + nFib(n-2); }}";
var solutionBad = "function nFib(n) { if ( n <= 1 ) { var a = \'hi\'; return n; } else { return nFib(n-1); }}";

var test = "assert.equal(nFib(1), 1);" + 
    "assert.equal(nFib(2), 1);" + 
    "assert.equal(nFib(4), 3);" + 
    "assert.equal(nFib(6), 8);" + 
    "assert.equal(nFib(10), 55);"

var setIsValidTrue = "isValid = true;"

var context = new vm.createContext({
  chai: require('chai'),
  assert: require('chai').assert,
  isValid: false
});

var solutionGoodScript = new vm.Script(solutionGood);
var solutionBadScript = new vm.Script(solutionBad);
var testScript = new vm.Script(test + setIsValidTrue);

try {
  // solutionGoodScript.runInContext(context);
  solutionBadScript.runInContext(context);
  testScript.runInContext(context);
}
catch (e) {
  console.log(e);
}
console.log(util.inspect(context.isValid));
