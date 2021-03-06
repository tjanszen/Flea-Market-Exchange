/* jshint expr:true */

'use strict';

var expect = require('chai').expect;
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
var server = require('../../server/index');
var cp = require('child_process');
var dbname = process.env.MONGO_URL.split('/')[3];

var cookie;

describe('items', function() {
  beforeEach(function(done) {
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [dbname], {cwd:__dirname + '/../scripts'}, function(){
      var options = {
        method:'post',
        url:'/users/authenticate',
        payload:{
          email:'tommy.janszen@gmail.com',
          password:'123'
        }
      };
      server.inject(options, function(response){
        cookie = response.headers['set-cookie'][0].match(/hapi-cookie=[^;]+/)[0];
        done();
      });
    });
  });
  describe('get /items', function() {
     it('should display all items', function(done) {
       var options = {
         method: 'get',
         url:'/items',
         headers: {
           cookie: cookie
         }
       };
       server.inject(options, function(response) {
         expect(response.statusCode).to.equal(200);
         done();
       });
     });
   });
});
