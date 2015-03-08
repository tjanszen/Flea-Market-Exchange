'use strict';

var Item = require('../../models/item');

module.exports = {
  handler: function(request, reply) {
    Item.findById(request.payload.item._id, function(err, item) {
      if(err) {
        console.log('SWAPPING ERROR');
        reply().code(500);
      }else{
        item.canSwap = !item.canSwap;
        item.save(function(err) {
          if(err) {
            console.log('ERROR SAVING CANSWAP ITEM');
          } else {
            reply();
          }
        });
      }
    });
  }
};
