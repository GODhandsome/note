//add.spec.js
var add = require("./add.js");
var expect = require("chai").expect;
describe('test demo', function () {
  it('1+1=2', function () {
    expect(add(1, 1)).to.be.equal(2);
  })
})
