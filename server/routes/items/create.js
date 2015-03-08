'use strict';

var Item = require('../../models/item');
var joi = require('joi');

module.exports = {
  validate: {
    payload: {
      name: joi.string().required(),
      year: joi.string().required(),
      cost: joi.string().required(),
      image: joi.string().required(),
      tags: joi.string().required()
    }
  },
  handler: function(request, reply) {
    request.payload.userId = request.auth.credentials._id;
    var item = new Item(request.payload);
    item.save(function() {
      reply({item:item}).code(200);
    });
  }
};
