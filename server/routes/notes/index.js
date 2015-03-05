'use strict';

var Note = require('../../models/note');

module.exports = {
  handler: function(request, reply){
    Note.find({userId:request.auth.credentials._id}, function(err, notes){
      reply({notes:notes});
    });
  }
};
