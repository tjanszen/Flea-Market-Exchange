'use strict';

module.exports = {
  handler: function(request, reply) {
    if (request.auth.credentials)
      reply({email: request.auth.credentials.email, user: request.auth.credentials});
    else 
      reply();
  }
};