'use strict';

var Item = require('../../models/item');

module.exports = {
  handler: function(request, reply) {
    Item.remove({_id: request.params.itemId}, function(err) {
      if (err) {
        reply.code(500);
      } else {
        reply();
      }
    });
  }
};