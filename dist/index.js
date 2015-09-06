'use strict';

var express = require('express');
var methods = require('methods');
var Rx = require('rx');

var slice = Array.prototype.slice;

var appProto = express.application;
var routerProto = express.Router;

methods.forEach(function (method) {
  var rxName = 'rx' + capitalize(method);
  appProto[rxName] = routerProto[rxName] = function () {
    var args = slice.call(arguments);
    var subject = new Rx.Subject();

    args.push(function (req, res, next) {
      var route = { req: req, res: res, params: req.params, query: req.query, next: next };
      subject.onNext(route);
    });

    this[method].apply(this, args);

    return subject;
  };
});

function capitalize(str) {
  if (!str) return '';
  return str[0].toUpperCase() + str.substr(1, str.length - 1);
}
