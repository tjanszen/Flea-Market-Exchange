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
    console.log('==========IN CREATE.JS===========');
    console.log('payload', request.payload);
    console.log('_id', request.auth.credentials._id);
    request.payload.userId = request.auth.credentials._id;
    request.payload
    var item = new Item(request.payload);
    item.save(function(){
      console.log('item', item);
      reply({item:item}).code(200);
    });
  }
};
