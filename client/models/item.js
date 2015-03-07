'use strict';

angular.module('eddie')
  .factory('Item', ['$http', function($http){

    function create(item){
      return $http.post('/items', item);
    }

    function offerSwap(swapArray) {
      return $http.post('/swaps', swapArray);
    }

    return {create: create, offerSwap: offerSwap};
  }]);
