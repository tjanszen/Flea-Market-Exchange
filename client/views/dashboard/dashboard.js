'use strict';

angular.module('eddie')
  .controller('DashCtrl', ['$scope', '$rootScope', 'User', 'Item', '$state', '$location', '$http', function($scope, $rootScope, User, Item, $state, $location, $http) {
    // console.log($rootScope);

    $scope.swapArray = [];

    $http.get('/items').success(function(data) {
      // _.filter(data.items, )
      // $scope.nonUserItems =
      $scope.userItems = data.items;    // USER ITEMS ARE ALL ITEMS IN THE DATABASE
      console.log('userItems', $scope.userItems);
    }).error(function(data) {
      console.log('USER ID GET FUCKED', data);
    });

    // $http.get('/')

    $scope.addItem = function() {
      $state.go('dashboard.new');
    };

    $scope.swapItems = function() {
      Item.offerSwap($scope.swapArray).then(function(data) {
        console.log('swap data', data);
      }, function() {
        console.log('ERROR OFFERING SWAP');
      });
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

    $scope.swapChosen = function(yourItemId, otherItemId) {
      var edited = false;
      // if user choses default 'Swap Item' option then remove that swap from the array
      if (yourItemId === '') {
        $scope.swapArray.forEach(function(pair, index) {
          if (otherItemId === pair.otherItem)
            $scope.swapArray.splice(index, 1);
        });
      } else {
        // check if user just changed a swapping item to one of his other items
        $scope.swapArray.forEach(function(pair) {
          if (pair.otherItem === otherItemId) {
            pair.yourItem = yourItemId;
            edited = true;
          }
        });
        // if changing from no-swap on an item to offering a swap, add it to the array
        if (!edited)
          $scope.swapArray.push({yourItem: yourItemId, otherItem: otherItemId});
      }
    };

}]);
