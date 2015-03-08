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

    return {create: create, offerSwap: offerSwap, makeTrade: makeTrade};
  }]);
