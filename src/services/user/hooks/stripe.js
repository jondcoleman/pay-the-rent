'use strict';
const stripeFactory = require('stripe')
const plaid = require('plaid')

module.exports = function(app) {
  return function(req, res, next) {
    console.log(req.feathers)
    const stripeConfig = app.get('stripe')
    const stripe = stripeFactory(stripeConfig.secret)
    const plaidConfig = app.get('plaid')
    const params = [
      plaidConfig.client_id,
      plaidConfig.secret,
      plaid.environments[plaidConfig.plaid_env]
    ]
    const plaidClient = new plaid.Client(...params)

    plaidClient.exchangeToken(req.body.public_token, (err, response) => {
      console.log(req.body.metadata)
      if (err)
        next()
      else {
        const source = response.access_token
        const description = res.locals.user.email
        const email = res.locals.user.email

        // stripe.customers.create({source, description, email})
        res.json({response})
        next()
      }
    })
  };
};
