'use strict';

angular.module('eddie', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/dashboard/list');

  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'views/users/users.html',
    controller: 'UserCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'views/users/users.html',
    controller: 'UserCtrl'
  })

  .state('dashboard', {
    url:'/dashboard',
    templateUrl: 'views/dashboard/dashboard.html',
    abstract: true
  })

  .state('dashboard.new', {
    url: '/new',
    views: {
      'main': {
        templateUrl: 'views/dashboard/dashboard_new.html',
        controller: 'DashCtrl'
      },
      'user': {
        templateUrl: 'views/dashboard/dashboard_user.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('dashboard.list', {
    url: '/list',
    views: {
      'main': {
        templateUrl: 'views/dashboard/dashboard_list.html',
        controller: 'DashCtrl'
      },
      'user': {
        templateUrl: 'views/dashboard/dashboard_user.html',
        controller: 'DashCtrl'
      }
    }
  });

}])

.run(['$rootScope', 'User', function($rootScope, User) {
  User.status().then(function(response) {
    $rootScope.user = response.data.user;
    $rootScope.email = response.data.email;
  });
}]);
