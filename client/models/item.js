'use strict';

angular.module('eddie')
.factory('Item', ['$http', function($http){

  function create(item){
    return $http.post('/items', item);
  }

  function offerSwap(swapArray) {
    return $http.post('/swaps', swapArray);
  }

  function makeTrade(trade) {
    return $http.post('/trade', trade);
  }

  function switchSwap(item) {
    return $http.post('/toggle-item', item);
  }

  function destroy(item) {
    return $http.delete('/delete/'+item._id);
  }

  return {create: create, offerSwap: offerSwap, makeTrade: makeTrade, switchSwap: switchSwap, destroy: destroy};
}]);
