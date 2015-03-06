/* jshint expr:true */
'use strict';

var expect = require('chai').expect;
var User = require('../../server/models/user');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
var server = require('../../server/index');

describe('post /user', function() {
  it('should send a 200 back to the client', function(done) {
    var options = {
      method: 'post',
      url: '/user',
      payload: {
        name: 'tommy',
        email: 't@mail.com',
        password: '123'
      }
    };
    server.inject(options, function(response) {
      console.log(response);
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});
