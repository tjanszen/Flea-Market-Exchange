'use strict';

var Note = require('../../models/note');

module.exports = {
  handler: function(request, reply){
    Note.findOne({_id:request.params.noteId}, function(err, note){
      reply({note:note});
    });
  }
};
