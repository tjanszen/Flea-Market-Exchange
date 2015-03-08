'use strict';

var Joi = require('joi');
var User = require('../../models/user');


module.exports = {
  validate: {
    payload: {
      name: Joi.string().required(),
      email: Joi.string().email(),
      password: Joi.string().min(3),
      picture: Joi.string().required()
    }
  },
  auth: false,
  handler: function(request, reply) {
    User.register(request.payload, function(err) {
      if (err) {
        reply().code(400);
      } else {
        reply();
      }
    });
  }
};
