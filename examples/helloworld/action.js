var Promise = require('es6-promise').Promise;

module.exports = {
  fetchData: function() {
    return Promise.resolve({ message: 'hello qiu' });
  }
};
