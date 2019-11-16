// var assert     = require('assert')
// var challenges = require('/../challenges');

// module.exports = {

//     'test blabla2': function(beforeExit, assert) {
//       assert.equal(6, 'foobar'.length);
//     }
// };



var assert = require('assert')

exports['test String#length'] = function(){
    assert.equal(6, 'foobar'.length);
};