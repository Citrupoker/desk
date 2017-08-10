
var jwt = require('jsonwebtoken')

module.exports.middlewareToken = function (req, res, next) {
    // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token']

    // decode token
  if (token) {
        // verifies secret and checks exp
    jwt.verify(token, process.env.secret, function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' })
      } else {
                // if everything is good, save to request for use in other routes
        req.decoded = decoded
        next()
      }
    })
  } else {
        // if there is no token
        // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    })
  }
}

module.exports.middleware404 = function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
}

module.exports.middlewareError = function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
}
