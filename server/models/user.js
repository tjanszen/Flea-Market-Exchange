'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User;

var userSchema = mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  picture: {type: String, required: true},
  items: [{type: mongoose.Schema.ObjectId, ref: 'Item'}],
  createdAt: {type: Date, default: Date.now, required: true}
});

userSchema.statics.register = function(o, cb) {
  User.findOne({email: o.email}, function(err, user) {
    if(user) { return cb(true); }
    user = new User(o);
    user.password = bcrypt.hashSync(o.password, 8);
    user.save(cb);
  });
};

userSchema.statics.login = function(o, cb) {
  User.findOne({email:o.email}, function(err, user) {
    if(err) { return cb(true); }

    var isGood = bcrypt.compareSync(o.password, user.password);
    if (!isGood) { return cb(true); }
    cb(null, user);
  });
};

User = mongoose.model('User', userSchema);
module.exports = User;
