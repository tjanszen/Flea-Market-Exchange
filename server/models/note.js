'use strict';

var mongoose = require('mongoose');
var Note;

var noteSchema = mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    tags: [String],
    urls: [String],
    createdAt: {type: Date, default: Date.now, required: true},
    userId: {type: mongoose.Schema.ObjectId, ref: 'User', required: true}
});

noteSchema.pre('save', function(next){
  if(this.isNew && this.tags.length){
    this.tags = this.tags[0].split(',').map(function(s){return s.trim().toLowerCase();});
  }

  next();
});

Note = mongoose.model('Note', noteSchema);
module.exports = Note;
