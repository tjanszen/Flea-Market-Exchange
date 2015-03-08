'use strict';

var Item = require('../../models/item');

module.exports = {
  handler: function(request, reply) {
    Item.find({}, function(err, items) {
      if (err) { return reply().code(400); }
      reply({items:items}).code(200);
    });
  }
};
