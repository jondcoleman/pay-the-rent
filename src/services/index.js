'use strict';
const authentication = require('./authentication');
const user = require('./user');
const mongoose = require('mongoose');
const stripe = require('./stripe')
module.exports = function() {
  const app = this;
  
  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;
  
  app.configure(authentication);
  app.configure(user);
  app.configure(stripe.customer);
  
};
