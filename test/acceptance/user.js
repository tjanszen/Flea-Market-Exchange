/* jshint expr:true */

'use strict';

var expect = require('chai').expect;
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
var server = require('../../server/index');

// describe('users', function() {
//   describe('post /user', function() {
//     it('should create a new user', function(done) {
//       var options = {
//         method:'post',
//         url:'/user',
//         payload:{
//           name: 'bob2',
//           email:'bob2@aol.com',
//           password:'123',
//           picture:'x.jpg'
//         }
//       };
//       server.inject(options, function(response) {
//         expect(response.statusCode).to.equal(200);
//         done();
//       });
//     });
//   });
// });
