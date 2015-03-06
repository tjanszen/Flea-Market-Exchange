'use strict';

angular.module('eddie')
  .controller('NavCtrl', ['$rootScope', '$scope', 'User', '$state', function($rootScope, $scope, User, $state){
    $scope.logout = function(){
      User.logout().then(function(){
        delete $rootScope.email;
        $state.go('login');
      },
      function() {
        console.log('ERROR WITH LOGOUT');
      });
    };

  }]);
