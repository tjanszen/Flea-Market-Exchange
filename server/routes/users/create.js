'use strict';

var Joi = require('joi');
var User = require('../../models/user');

module.exports = {
  auth: {
    mode: 'try'
  },
  validate: {
    payload: {
      name: Joi.string().required(),
      email: Joi.string().email(),
      password: Joi.string().min(3),
      picture: Joi.string().required()
    }
  },
  handler: function(request, reply) {
    // var user = new User(request.payload);
    console.log(request);
    User.register(request.payload, function(err) {
      if (err) {
        reply().code(400);
      } else {
        reply().code(200);
      }
    });
  }
};
