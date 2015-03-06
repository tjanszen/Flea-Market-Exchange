'use strict';

angular.module('eddie')
  .controller('DashCtrl', ['$scope', '$rootScope', 'User', 'Item', '$state', '$location', '$http', function($scope, $rootScope, User, Item, $state, $location, $http) {
    // console.log($rootScope);
    $http.get('/items').success(function(data) {
      // _.filter(data.items, )
      // $scope.nonUserItems =
      $scope.userItems = data.items;
    }).error(function(data) {
      console.log('USER ID GET FUCKED', data);
    });

    // $http.get('/')

    $scope.addItem = function() {
      $state.go('dashboard.new');
    };

    $scope.submit = function(item) {
      console.log(item);
      Item.create({name: item.name, cost: item.cost, year: item.year, image:item.image, tags: item.tags}).then(function(data){
        console.log(data);
        $state.go('dashboard.list');
      },
      function() {
        console.log('CREATE ITEM ERROR');
      });
    };
}]);
