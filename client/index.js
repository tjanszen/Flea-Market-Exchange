'use strict';

angular.module('eddie', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url:'/',
    templateUrl: 'views/general/home.html',
    controller: 'HomeCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'views/users/users.html',
    controller: 'UserCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'views/users/users.html',
    controller: 'UserCtrl'
  });
}])

.run(['$rootScope', 'User', function($rootScope, User) {
  User.status().then(function(response) {
    $rootScope.user = response.data.user;
    $rootScope.email = response.data.email;
  });
}]);
