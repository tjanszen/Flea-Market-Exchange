'use strict';

var Item = require('../../models/item');
var User = require('../../models/user');
var async = require('async');
var mandrill = require('node-mandrill')(process.env.MANDRILL_ACCESS_KEY);


module.exports = {
  handler: function(request, reply) {


    var confirmersItem = request.payload.confirmersItem;
    var requestersItem = request.payload.requestersItem;
    var index;


    Item.findById(requestersItem._id, function(err, requestersItem) {
      Item.findById(confirmersItem._id, function(err, confirmersItem) {

        async.each(requestersItem.pending, function(pendingId, callback) {
          Item.findById(pendingId, function(err, item) {
            if(pendingId !== confirmersItem._id) {
                index = item.pending.indexOf(requestersItem._id);
                item.pending.splice(index, 1);
                item.save(function(err) {
                  if (err) {
                    console.log('ERROR SAVING item from requestersItems pending array');
                  } else {
                    console.log('SAVED NON-TRADING ITEM FROM CONFIRMER PENDING ARRAY');
                  }
                });
            } else {
              index = requestersItem.pending.indexOf(item._id);
              requestersItem.pending.splice(index, 1);
              requestersItem.save(function(err) {
                if(err) {
                  console.log('ERROR SAVING requestersItem item');
                } else {
                  console.log('SAVED THE REQUESTER ITEM');
                }
              });
            }
          });
          callback();
        },
        function(err) {
          if (err) {
            console.log('TRADE GOT ALL MESSED UP 2');
          } else {
            console.log('ASYNCED THE REQUESTERITEM');

            async.each(confirmersItem.pending, function(confirmersPendingId, callback2) {
              Item.findById(confirmersPendingId, function(err, item2) {
                if(confirmersPendingId !== requestersItem._id) {
                    index = item2.pending.indexOf(confirmersItem._id);
                    item2.pending.splice(index, 1);
                    item2.save(function(err) {
                      if (err) {
                        console.log('ERROR SAVING item2 from confirmersItems pending array');
                      } else {
                        console.log('SAVED NON-TRADING ITEM FROM CONFIRMER PENDING ARRAY');
                      }
                    });
                } else {
                  index = confirmersItem.pending.indexOf(item2._id);
                  confirmersItem.pending.splice(index, 1);
                  confirmersItem.save(function(err) {
                    if (err) {
                      console.log('ERROR SAVING confirmersItem item');
                    } else {
                      console.log('SAVED THE CONFIMERITEM');
                    }
                  });
                }
              });
              callback2();
            },
            function(err) {
              if (err) {
                console.log('TRADE GOT ALL MESSED UP 2');
              } else {
                console.log('ASYNCED THE REQUESTERITEM');

                var tempId = confirmersItem.userId;
                confirmersItem.userId = requestersItem.userId;
                requestersItem.userId = tempId;
                confirmersItem.save(function(err) {
                  if(err) {
                    console.log('ERR SAVING CONFIRMERS-ITEM USERID');
                  } else {
                    requestersItem.save(function(err) {
                      if(err) {
                        console.log('ERR SAVING REQUESTERS-ITEM USERID');
                      } else {
                        console.log('HIT THE DEEP END OF THE WELL');

                        User.findById(confirmersItem.userId, function(err, confirmer) {
                          User.findById(requestersItem.userId, function(err, requester) {
                            sendEmail(confirmer, requester);
                            sendEmail(requester, confirmer);
                          });
                        });
                        reply();
                      }
                    });
                  }
                });
              }
            });
          }
        });
      });
    });
  }
};


function sendEmail(sender, receiver) {
  //send an e-mail to user about the pending request
  mandrill('/messages/send', {
      message: {
          to: [{email: receiver.email, name: receiver.name}],
          from_email: sender.email,
          subject: 'Congrats on your new trade!',
          text: 'Congrats on your new trade. Keep on trading!'
      }
  },
  function(error, response) {
      //uh oh, there was an error
      if (error) {
        console.log( JSON.stringify(error) );
      } else{   //everything's good, lets see what mandrill said
        console.log(response);
      }
  });
}
