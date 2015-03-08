'use strict';

var mongoose = require('mongoose');
var Item;

var itemSchema = mongoose.Schema({
  name: {type: String, required: true},
  year: {type: String, required: true},
  cost: {type: Number, required: true},
  image: {type: String, required: true},
  tags: {type: [String], required: true},
  canSwap: {type: Boolean, default: true},
  pending: {type: [mongoose.Schema.ObjectId], ref: 'Item', default: [] },
  swapped: {type: Boolean, default: false},
  userId: {type: mongoose.Schema.ObjectId, ref: 'User', required: true}
});

itemSchema.pre('save', function(next){
  if(this.isNew) {
    this.tags = this.tags[0].split(',').map(function(s) {
      return s.trim().toLowerCase();
    });
  }
  next();
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
