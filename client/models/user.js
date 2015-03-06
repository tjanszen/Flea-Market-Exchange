'use strict';

angular.module('eddie')

.factory('User', ['$http', function($http) {

  function register(user) {
    console.log('factory user: ', user);
    return $http.post('/user', user);
  }

  function login(user) {
    return $http.post('/login', user);
  }

  function status() {
    return $http.get('/status');
  }

  function logout() {
    return $http.get('/logout');
  }

  return { register: register, login: login, status: status, logout: logout };

}]);
