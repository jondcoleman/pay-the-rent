'use strict'

const stripeFactory = require('stripe')
const hooks = require('./hooks')

module.exports = function() {
  const app = this

  const stripeConfig = app.get('stripe')
  const stripe = stripeFactory(stripeConfig.secret)

  const service = {
    find: function(params) {
      return stripe.customers.list(params.query)
    },
    get: function(id) {
      return stripe.customers.retrieve(id)
    },
    create: function(data) {
      return stripe.customers.create(data)
    },
    update: function(id, data) {
      return stripe.customers.update(id, data)
    },
    remove: function(id) {
      return stripe.customers.del(id)
    }
  }

  // Initialize our service with any options it requires
  app.use('/stripe/customers', service)

  // Get our initialize service to that we can bind hooks
  const customerService = app.service('/stripe/customers')

  // Set up our before hooks
  // customerService.before(hooks.before)

  // Set up our after hooks
  // customerService.after(hooks.after)
}

// return this.stripe.customers.list(params).catch(errorHandler)

    // find(params [, callback]) {},
    // get(id, params [, callback]) {},
    // create(data, params [, callback]) {},
    // update(id, data, params [, callback]) {},
    // patch(id, data, params [, callback]) {},
    // remove(id, params [, callback]) {}
