'use strict';

var Item = require('../../models/item');
var User = require('../../models/user');
var async = require('async');
var mandrill = require('node-mandrill')(process.env.MANDRILL_ACCESS_KEY);
var sender;
var receiver;

module.exports = {
  handler: function(request, reply) {

    async.each(request.payload, function(o, callback) {
    // request.payload.forEach(function(o){
      Item.findById(o.yourItem, function(err, item) {
        item.pending.push(o.otherItem);
        console.log(o.otherItem);
        console.log(item.pending);
        console.log('item', item);

        item.save(function(err) {
          if(err){
            console.log('err', err)
          } else {
            console.log('WORKED I THINK');
          }
        });

        User.findById(item.userId, function(err, user) {
          console.log('sender', user);
          sender = user;
        });
      });

      Item.findById(o.otherItem, function(err, item) {
        item.pending.push(o.yourItem);
        console.log(o.yourItem);
        console.log(item.pending);
        item.save(function(err){
          if(err){
            console.log('ERR')
          } else {
            console.log('WORKED 2 I THINK');
          }
        });

        User.findById(item.userId, function(err, user) {
          console.log('receiver', user);
          receiver = user;
        });
      });


      // console.log('receiver.email', receiver.email);
      // console.log('receiver.name', receiver.name);
      // console.log('sender.email', sender.email);
      //send an e-mail to user about the pending request
      // mandrill('/messages/send', {
      //     message: {
      //         to: [{email: receiver.email, name: receiver.name}],
      //         from_email: sender.email,
      //         subject: "Swapping Time!",
      //         text: "Check your account to approve swamp!"
      //     }
      // }, function(error, response)
      // {
      //     //uh oh, there was an error
      //     if (error) console.log( JSON.stringify(error) );
      //
      //     //everything's good, lets see what mandrill said
      //     else console.log(response);
      // });
      callback();
  },
  function(err) {
    if (err) {
      console.log('THE ASYNC FAILED');
    } else {
      console.log('ASYNC FINISHED');
      reply();
    }
  });
  }

};
