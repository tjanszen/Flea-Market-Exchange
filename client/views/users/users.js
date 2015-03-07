'use strict';

angular.module('eddie')
  .controller('UserCtrl', ['$scope', '$rootScope', '$state', 'User', function($scope, $rootScope, $state, User) {
    $scope.url = _.capitalize($state.current.name);


    $scope.submit = function(user) {
      if ($scope.url === "Register") {
        console.log('controller user: ', user);
        User.register({name: user.name, email: user.email, password: user.password1, picture: user.picture}).then(function(data) {
          // user.name = user.email = user.password1 = user.password2 = user.picture = "";
          $state.go('login');
        },
        function() {
          user.name = user.email = user.password1 = user.password2 = user.picture = "";
        });
      } else {
        User.login({email: user.email, password: user.password}).then(function(data) {
          $rootScope.user = data.data.user;
          // console.log($rootScope.user);
          $rootScope.email = user.email;
          // user.email = user.password = "";
          $state.go('dashboard.list');
        },
        function() {
          user.email = user.password = "";
        });
      }
    };
  }]);
