'use strict';

angular.module('eddie')
  .controller('DashCtrl', ['$scope', '$rootScope', 'User', 'Item', '$state', '$location', function($scope, $rootScope, User, Item, $state, $location) {

    $scope.addItem = function() {
      alert('yo');
      $state.go('dashboard.new');
      // $location.path('/new');
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
