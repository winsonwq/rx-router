# Rx Router

## Installation

```bash
// the name "rx-router" has been taken
$ npm i rxrouter -d
```

## demo

```javascript
//
// routes.js
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

//
// app.js
var express = require('express');
var rrouter = require('../../');
var action = require('./action');
var routes = require('./routes');

var app = express();
app.use(routes.router);

routes.root
  .filter(function(route) {
    return !!route.req.profile;
  })
  .flatMapLatest(function(route) {
    return action.fetchData().then(function(messageData) {
      return { messageData: messageData, route: route };
    });
  })
  .subscribe(function(data) {
    var res = data.route.res;
    res.end(data.messageData.message);
  });

app.listen(9999);
```
