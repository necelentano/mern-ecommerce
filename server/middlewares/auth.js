const admin = require('../firebase');

exports.authCheck = (req, res, next) => {
  console.log('authCheck middleware', req.headers);
  next();
};
