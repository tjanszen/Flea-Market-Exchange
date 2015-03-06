'use strict';

angular.module('eddie')
  .factory('Item', ['$http', function($http){

    function create(item){
      return $http.post('/items', item);
    }

    return {create: create};
  }]);
