'use strict';

angular.module('eddie')

.controller('DashCtrl', ['$scope', '$rootScope', 'User', 'Item', '$state', '$location', '$http', function($scope, $rootScope, User, Item, $state, $location, $http) {


  User.status().then(function(response) {},
  function(response) {
    $state.go('login');
  });

  $scope.swapArray = [];

  $http.get('/items').success(function(data) {
    $scope.userItems = data.items;    // USER ITEMS ARE ALL ITEMS IN THE DATABASE
  }).error(function(data) {
    console.log("COULDN'T GET USER ID", data);
  });


  $scope.addItem = function() {
    $state.go('dashboard.new');
  };

  $scope.offerTrade = function() {
    Item.offerSwap($scope.swapArray).then(function(data) {
      console.log('swap data', data);
      alert('Trade is pending');
      window.location.reload(true);
    }, function() {
      console.log('ERROR OFFERING SWAP');
    });
  };

  $scope.submit = function(item) {
    Item.create({name: item.name, cost: item.cost, year: item.year, image:item.image, tags: item.tags}).then(function(data) {
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
        if (otherItemId === pair.otherItem) {
          $scope.swapArray.splice(index, 1);
        }
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
      if (!edited) {
        $scope.swapArray.push({yourItem: yourItemId, otherItem: otherItemId});
      }
    }
  };

  $scope.showPendingTrades = function(item) {
    $rootScope.pendingArray = [];
    item.pending.forEach(function(pendingItemId) {
        $scope.userItems.forEach(function(dbItem) {
          if (pendingItemId === dbItem._id) {
            $rootScope.pendingArray.push(dbItem);
          }
        });
    });

    $state.go('dashboard.approve');
    $rootScope.userPendingItem = item;
  };

  $scope.confirmTrade = function(item) {
    Item.makeTrade({requestersItem: item, confirmersItem: $rootScope.userPendingItem}).then(function(data) {
      console.log(data);
      $state.go('dashboard.list');
    },
    function() {
      console.log('ERROR CONFRIMING TRADE');
    });
  };

  $scope.canSwap = function(item) {
    Item.switchSwap({item: item}).then(function(data) {
      item.canSwap = !item.canSwap;
    },
    function() {
      console.log('canSwap switched failed');
    });
  };

  $scope.deleteItem = function(item) {
    Item.destroy(item).then(function(data) {
      $http.get('/items').success(function(data) {    // hmm, do I need this, maybe if you delete an item then try to offer a trade with it
        $('#'+item._id).hide('0.5');
      }).error(function(data) {
        console.log('page update failed', data);
      });
    },
    function() {
      console.log('Deletion of item failed');
    });
  };

}]);
