var express = require('express');
var router = express.Router();

module.exports = {
  root: router.rxGet('/', middleware),
  router: router
};

function middleware(req, res, next) {
  req.profile = { name: 'qiu' };
  req.message = 'hello';
  next();
}
