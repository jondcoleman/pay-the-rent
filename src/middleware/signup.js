'use strict';

module.exports = function(app) {
  return function(req, res, next) {
    const body = req.body
    console.log(req.body)

    app.service('users').create({
      email: body.email,
      password: body.password
    })
      .then(user => res.json({message: 'success'}))
      .catch(next)
  };
};
