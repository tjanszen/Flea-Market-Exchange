'use strict';

module.exports = [
  {method: 'get', path: '/{param*}', config: require('../routes/general/static')},
  {method: 'post', path: '/user', config: require('../routes/users/create')},
  {method: 'post', path: '/login', config: require('../routes/users/login')},
  {method: 'get', path: '/status', config: require('../routes/users/status')},
  {method: 'get', path: '/logout', config: require('../routes/users/logout')},

  {method: 'post', path: '/items', config: require('../routes/items/create')},
  {method: 'get', path: '/items', config: require('../routes/items/index')},
  {method: 'post', path: '/swaps', config: require('../routes/items/swaps')},
  {method: 'post', path: '/trade', config: require('../routes/items/trade')}
];
